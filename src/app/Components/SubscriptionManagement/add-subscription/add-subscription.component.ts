import { Component, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, startWith } from 'rxjs';
import * as $ from "jquery";
import 'jqueryui';
import { FormBuilder, FormControl, NgModel, Validators } from '@angular/forms';
import { ToastService } from 'src/app/Services/Notification/toast.service';
import { Customer } from '../../CustomerManagement/customer-list/customer-list.component';
import { map } from 'rxjs/operators';
import { CustomerManagementService } from 'src/app/Services/CustomerManagementService/customer-management.service';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';


@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.css']
})

export class AddSubscriptionComponent implements OnInit {
  @Output() onSubmitSubject: Subject<boolean> = new Subject<boolean>();
  title: string = '';
  message: string = '';
  autoCompleteResult: Observable<Customer[]>;
  autoCompleteControl = new FormControl();
  selectedCustomer: any;
  arrayCustomer: any;
  isValidSelectedCustomer : boolean = false;
  isClicked : boolean = false;

  Typeabonement = new FormControl('', [Validators.required, Validators.maxLength(20)]);





  constructor(private customerManagementService: CustomerManagementService, private modalService: NgbModal, private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private toastService: ToastService) { }

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

  addForm = this.formBuilder.group(
    {
      Typeabonement: this.Typeabonement
    }
  );


  getAllCustomers() {
    let resp = this.customerManagementService.getListCustomers();
    resp.subscribe(
      response => {
        console.log(response);
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

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.firstname.toLocaleLowerCase().indexOf(term) > -1 || item.lastname.toLocaleLowerCase().indexOf(term) > -1;
  }


  addSubscriptionToUser(selectedCustomer) {
    console.log(selectedCustomer);

  }

  checkValidateButton() {    
    this.isValidSelectedCustomer = this.selectedCustomer ?  true : false;
    this.isClicked = true;
  }

}





