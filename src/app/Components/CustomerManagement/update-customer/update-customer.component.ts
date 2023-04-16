

  import { Component, Input, OnInit, Output } from '@angular/core';
  import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
  import { Subject } from 'rxjs';
  import * as $ from "jquery";
  import 'jqueryui';
  import { FormBuilder, FormControl, Validators } from '@angular/forms';
  import { ToastService } from 'src/app/Services/Notification/toast.service';
  
  @Component({
    selector: 'app-update-customer',
    templateUrl: './update-customer.component.html',
    styleUrls: ['./update-customer.component.css']
  })
  export class UpdateCustomerComponent implements OnInit {
    @Output() onSubmitSubject: Subject<boolean> = new Subject<boolean>();
    title: string = '';
    message: string = '';
  
    firstname = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    lastname = new FormControl('', [Validators.required, Validators.maxLength(20)]);
    email = new FormControl('', [Validators.required, Validators.email]);
    adress = new FormControl('', [Validators.required, Validators.maxLength(80)]);
    phone= new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{8}")]);
    
    @Input() fromParent;
    constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private toastService : ToastService) {}
  
  
    ngOnInit() {        
      this.activateDragging();
      this.initialiserForms();    
    }

    initialiserForms() {
      this.updateForm.setValue({
        firstname: this.fromParent.firstname,
        lastname: this.fromParent.lastname,
        email: this.fromParent.email,
        phone: this.fromParent.phone,
        adress: this.fromParent.adress,
      });
    }
  

    activateDragging() {
      $(document).ready(function() {
        let modalContent: any = $('.modal-content');
        let modalHeader = $('.modal-header');
        modalHeader.addClass('cursor-all-scroll');
        modalContent.draggable({
          handle: '.modal-header'
        });  
      });
    }
  
    updateForm = this.formBuilder.group(
      {
        firstname : this.firstname,
        lastname : this.lastname,
        email : this.email,
        phone : this.phone,
        adress : this.adress,
      }
    );
    
    updateCustomer(credentials: any) {
      console.log("==> ",credentials);
    }
    
    showSuccess() {
    this.toastService.show('Inscription réussi !', { classname: 'bg-success text-light', delay: 4500 ,autohide: true});
    }
    
    close() {
      this.activeModal.close();
      this.onSubmitSubject.next(true);
    }



  

  }
  
  
  
  
  
  