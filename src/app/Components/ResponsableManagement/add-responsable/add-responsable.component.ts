import { Component, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import * as $ from "jquery";
import 'jqueryui';
import { FormBuilder, FormControl, NgModel, Validators } from '@angular/forms';
import { ToastService } from 'src/app/Services/Notification/toast.service';
import { CustomerManagementService } from 'src/app/Services/CustomerManagementService/customer-management.service';

@Component({
  selector: 'app-add-responsable',
  templateUrl: './add-responsable.component.html',
  styleUrls: ['./add-responsable.component.css']
})
export class AddResponsableComponent implements OnInit {
  @Output() onSubmitSubject: Subject<boolean> = new Subject<boolean>();
  title: string = '';
  message: string = '';

firstname = new FormControl('', [Validators.required, Validators.maxLength(20)]);
lastname = new FormControl('', [Validators.required, Validators.maxLength(20)]);
email = new FormControl('', [Validators.required, Validators.email]);
adress = new FormControl('', [Validators.required, Validators.maxLength(80)]);
phone= new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{8}")]);


  constructor(private modalService: NgbModal,private customerManagementService : CustomerManagementService,private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private toastService : ToastService) {}

  ngOnInit() {
    $(document).ready(function() {
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
      firstname : this.firstname,
      lastname : this.lastname,
      email : this.email,
      phone : this.phone,
      adress : this.adress,
    }
  );
  
  addResponsable(credentials: any) {    
    this.customerManagementService.addResponsable(credentials).subscribe(() => {
      this.toastService.showSuccess();
      this.modalService.dismissAll();
    },
      error => {
        console.log(error); 
      }
    )
    
  }
  
  showSuccess() {
  this.toastService.show('Inscription réussi !', { classname: 'bg-success text-light', delay: 4500 ,autohide: true});
  }
  
  close() {
    this.activeModal.close();
    this.onSubmitSubject.next(true);
  }
}






