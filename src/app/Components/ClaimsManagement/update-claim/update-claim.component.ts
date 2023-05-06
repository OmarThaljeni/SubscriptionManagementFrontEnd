

  import { Component, Input, OnInit, Output } from '@angular/core';
  import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { Subject } from 'rxjs';
  import * as $ from "jquery";
  import 'jqueryui';
  import { FormBuilder, FormControl, Validators } from '@angular/forms';
  import { ToastService } from 'src/app/Services/Notification/toast.service';
  import { CustomerManagementService } from 'src/app/Services/CustomerManagementService/customer-management.service';
  import { ClaimManagementService } from 'src/app/Services/ClaimService/claim-management.service';
  
  
  @Component({
    selector: 'app-update-claim',
    templateUrl: './update-claim.component.html',
    styleUrls: ['./update-claim.component.css']
  })
  export class UpdateClaimComponent implements OnInit {
    
    @Output() onSubmitSubject: Subject<boolean> = new Subject<boolean>();
    title: string = '';
    message: string = '';
    selectedClaim: any;
  
    isValidSelectedSubscription: boolean = false;
    isClickedSubscription: boolean = false;
  
    isValidSelectedSubject: boolean = false;
    isClickedSubject: boolean = false;
  
    isValidSelectedBody: boolean = false;
    isClickedBody: boolean = false;
  
    selectedSubject: string;
    selectedContenu: string;
  
    arrayPriority = [
      { id: 1, name: 'Priorité eléve' },
      { id: 2, name: 'Priorité moyenne' },
      { id: 3, name: 'Priorité faible', },
    ];
    
    @Input() fromParent;

    constructor(private claimManagementService: ClaimManagementService, private modalService: NgbModal, private activeModal: NgbActiveModal, private toastService: ToastService) { }
  
    ngOnInit() {      
      this.fillOldData();
      $(document).ready(function () {
        let modalContent: any = $('.modal-content');
        let modalHeader = $('.modal-header');
        modalHeader.addClass('cursor-all-scroll');
        modalContent.draggable({
          handle: '.modal-header'
        });
  
      });
    }
  
    fillOldData() {
        this.selectedSubject = this.fromParent.subject;
        this.selectedContenu = this.fromParent.body;
        this.selectedClaim = this.fromParent.priority;
        
    }
  
    showSuccess() {
      this.toastService.show('Inscription réussi !', { classname: 'bg-success text-light', delay: 4500, autohide: true });
    }
  
    close() {
      this.activeModal.close();
      this.onSubmitSubject.next(true);
    }
  
  
    customSearchFnSubscription(term: string, item: any) {
      term = term.toLocaleLowerCase();
      return item.name.toLocaleLowerCase().indexOf(term) > -1 || item.id.toString().indexOf(term) > -1;
    }
  
  
    updateClaim() {
      const claims = { 'priority': this.selectedClaim.name, 'subject': this.selectedSubject, 'body': this.selectedContenu }
      const id = this.fromParent.id;
      let resp = this.claimManagementService.updateClaim(id, claims);
      resp.subscribe(() => {
        this.toastService.showSuccess();
        this.modalService.dismissAll();
      },
        error => {
          console.log(error);
        }
      )
    }
  
  
  
    checkValidateButtonSubscription() {
      this.isValidSelectedSubscription = this.selectedClaim ? true : false;
      this.isClickedSubscription = true;
    }
  
  
    checkValidateSubject() {
      this.isValidSelectedSubject = this.selectedSubject ? true : false;
      this.isClickedSubject = true;
    }
  
    checkValidateBody() {
      this.isValidSelectedBody = this.selectedContenu ? true : false;
      this.isClickedBody = true;
    }
  
  
    
  }
  
  
  
  
  
  