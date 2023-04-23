import { Component, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Subject } from 'rxjs';
import * as $ from "jquery";
import 'jqueryui';
import {  FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/Services/Notification/toast.service';
import { CustomerManagementService } from 'src/app/Services/CustomerManagementService/customer-management.service';
import { SubscirpionManagementService } from 'src/app/Services/SubscriptionManagement/subscirpion-management.service';


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
  arrayCustomer: any;
  isValidSelectedCustomer: boolean = false;
  isValidSelectedSubscription: boolean = false;
  isClickedCustomer: boolean = false;
  isClickedSubscription: boolean = false;

  Typeabonement = new FormControl('', [Validators.required, Validators.maxLength(20)]);

  arrayTypeSubscription = [
    { id: 1, name: 'Abonnement basique' },
    { id: 2, name: 'Abonnement professionnel' },
    { id: 3, name: 'Abonnement Normal', },
    { id: 4, name: 'Disabled Abonnement' }
  ];

  constructor(private subscriptionManagementService:SubscirpionManagementService,private customerManagementService: CustomerManagementService, private modalService: NgbModal, private activeModal: NgbActiveModal, private toastService: ToastService) { }

  ngOnInit() {
    this.getAllCustomers();
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


  addSubscriptionToUser() {
    const subscription = {'typeSubcription':this.selectedTypeSubscription.name}
    const id = this.selectedCustomer.id;
    let resp = this.subscriptionManagementService.addSubscription(id,subscription);
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

}





