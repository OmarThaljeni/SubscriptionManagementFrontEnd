import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import * as $ from "jquery";
import 'jqueryui';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/Services/Notification/toast.service';
import { CustomerManagementService } from 'src/app/Services/CustomerManagementService/customer-management.service';
import { SubscirpionManagementService } from 'src/app/Services/SubscriptionManagement/subscirpion-management.service';
import { PaymentsMangamentService } from 'src/app/Services/Payement/payments-mangament.service';


@Component({
  selector: 'app-add-payments',
  templateUrl: './add-payments.component.html',
  styleUrls: ['./add-payments.component.css']
})
export class AddPaymentsComponent implements OnInit {

  @Output() onSubmitSubject: Subject<boolean> = new Subject<boolean>();
  title: string = '';
  message: string = '';

  montantPaie = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  datePayment = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  observation = new FormControl('', [Validators.required, Validators.email]);

  paiementForm = this.formBuilder.group(
    {
      montantPaie: this.montantPaie,
      datePayment: this.datePayment,
      observation: this.observation,
    }
  );




  @Input() fromParent;
  constructor(private paymentsMangamentService: PaymentsMangamentService, private formBuilder: FormBuilder, private subscriptionManagementService: SubscirpionManagementService, private customerManagementService: CustomerManagementService, private modalService: NgbModal, private activeModal: NgbActiveModal, private toastService: ToastService) { }

  ngOnInit() {
    $(document).ready(function () {
      let modalContent: any = $('.modal-content');
      let modalHeader = $('.modal-header');
      modalHeader.addClass('cursor-all-scroll');
      modalContent.draggable({
        handle: '.modal-header'
      });

    });
  }


  showSuccess() {
    this.toastService.show('Inscription réussi !', { classname: 'bg-success text-light', delay: 4500, autohide: true });
  }

  close() {
    this.activeModal.close();
    this.onSubmitSubject.next(true);
  }


  addPayments(credentials: any) {
    const id = this.fromParent.id;
    if (credentials.montantPaie > this.fromParent.montantTotal) {
      this.toastService.showCannotAddPaiement();
    } else if (credentials.montantPaie < 10) {
      this.toastService.showMontantNotValid();
    } else if (this.fromParent.montantTotal - this.fromParent.montantPaie < credentials.montantPaie) {
      this.toastService.showCannotAddPaiement();
        } else {
          let resp = this.paymentsMangamentService.addPayement(id, credentials);
          resp.subscribe(() => {
            this.toastService.showSuccess();
            this.modalService.dismissAll();
          },
            error => {
              console.log(error.error);
            }
          )
        }

  }




}
