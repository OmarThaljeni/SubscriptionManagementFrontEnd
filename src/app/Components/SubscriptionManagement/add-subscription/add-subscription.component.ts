import { Component, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Subject } from 'rxjs';
import * as $ from "jquery";
import 'jqueryui';
import {  FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/Services/Notification/toast.service';
import { CustomerManagementService } from 'src/app/Services/CustomerManagementService/customer-management.service';
import { SubscirpionManagementService } from 'src/app/Services/SubscriptionManagement/subscirpion-management.service';
import { CniManagementService } from 'src/app/Services/ServiceCniManagement/cni-management.service';


@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.css']
})

export class AddSubscriptionComponent implements OnInit {
  
  @Output() onSubmitSubject: Subject<boolean> = new Subject<boolean>();
  title: string = '';
  message: string = '';
  selectedCustomer: any;
  selectedTypeSubscription: any;
  selectedService: any;
  arrayCustomer: any;
  arrayService: any;
  isValidSelectedCustomer: boolean = false;
  isValidSelectedSubscription: boolean = false;

  isClickedCustomer: boolean = false;
  isClickedSubscription: boolean = false;

  isValidService: boolean = false;
  isClickedService: boolean = false;


  Typeabonement = new FormControl('', [Validators.required, Validators.maxLength(20)]);

  arrayTypeSubscription = [
    { id: 1, name: 'Abonnement basique' },
    { id: 2, name: 'Abonnement professionnel' },
    { id: 3, name: 'Abonnement normal', }  ];

  constructor(private cniManagementService: CniManagementService,private subscriptionManagementService:SubscirpionManagementService,private customerManagementService: CustomerManagementService, private modalService: NgbModal, private activeModal: NgbActiveModal, private toastService: ToastService) { }

  ngOnInit() {
    this.getAllCustomers();
    this.getAllServices();
    $(document).ready(function () {
      let modalContent: any = $('.modal-content');
      let modalHeader = $('.modal-header');
      modalHeader.addClass('cursor-all-scroll');
      modalContent.draggable({
        handle: '.modal-header'
      });

    });
  }


  getAllCustomers() {
    let resp = this.customerManagementService.getListCustomers();
    resp.subscribe(
      response => {
        this.arrayCustomer = response;
      },
      error => {
        console.log(error);
      });


  }

  getAllServices() {
    let resp = this.cniManagementService.getListServices();
    resp.subscribe(
      response => {
        this.arrayService = response;
      },
      error => {
        console.log(error);
      });
  }

  showSuccess() {
    this.toastService.show('Inscription réussi !', { classname: 'bg-success text-light', delay: 4500, autohide: true });
  }

  close() {
    this.activeModal.close();
    this.onSubmitSubject.next(true);
  }

  customSearchFnCustomer(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.firstname.toLocaleLowerCase().indexOf(term) > -1 || item.lastname.toLocaleLowerCase().indexOf(term) > -1 || item.id.toString().indexOf(term) > -1;
  }

  customSearchFnSubscription(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.name.toLocaleLowerCase().indexOf(term) > -1 || item.id.toString().indexOf(term) > -1;
  }


  addSubscriptionToUserService() {
    const subscription = {'typeSubcription':this.selectedTypeSubscription.name}
    const idCustomer = this.selectedCustomer.id;
    const idService = this.selectedService.id;
    let resp = this.subscriptionManagementService.addSubscriptionToUser(idCustomer,idService,subscription);
    resp.subscribe( ()=> {
      this.toastService.showSuccess();
      this.modalService.dismissAll();
    },
      error => {
        console.log(error); 
      }
    )
  }

  checkValidateButtonCustomer() {
    this.isValidSelectedCustomer = this.selectedCustomer ? true : false;
    this.isClickedCustomer = true;
  }

  checkValidateButtonSubscription() {
    this.isValidSelectedSubscription = this.selectedTypeSubscription ? true : false;
    this.isClickedSubscription = true;
  }

  checkValidateService() {
    this.isValidService = this.selectedService ? true : false;
    this.isClickedService = true;
  }


}





