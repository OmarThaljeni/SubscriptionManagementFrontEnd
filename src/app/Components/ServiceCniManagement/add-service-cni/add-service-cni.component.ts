import { Component, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import * as $ from "jquery";
import 'jqueryui';
import { ToastService } from 'src/app/Services/Notification/toast.service';


@Component({
  selector: 'app-add-service-cni',
  templateUrl: './add-service-cni.component.html',
  styleUrls: ['./add-service-cni.component.css']
})
export class AddServiceCniComponent implements OnInit {

  @Output() onSubmitSubject: Subject<boolean> = new Subject<boolean>();
  title: string = '';
  message: string = '';
  selectedTypeService: any;
  selectedModelService: any;
  selectedNomPc : any;
  selectedRamPc :any;
  selectedCpu :any;

  isValidatedTypeService: boolean = false;
  isClickedTypeService: boolean = false;

  isValidatedModelService: boolean = false;
  isClickedModelService: boolean = false;

  isValidatedNomPc: boolean = false;
  isClickedNomPc: boolean = false;

  isValidatedRamPc: boolean = false;
  isClickedRamPc: boolean = false;

  isValidatedCpu: boolean = false;
  isClickedCpu: boolean = false;


  arrayTypeService = [
    { id: 1, name: 'IAAS' },
    { id: 2, name: 'PAAS' },
    { id: 3, name: 'SAAS', },
  ];


  arrayModelService = [
    { id: 1, name: 'Model 1' },
    { id: 2, name: 'Model 2' },
    { id: 3, name: 'Model 3', },
    { id: 4, name: 'Model 4', },
  ];


  arrayNomPc = [
    { id: 1, name: 'SAMSUNG' },
    { id: 2, name: 'DELL' },
    { id: 3, name: 'ASUS', },
    { id: 4, name: 'LENOVO', },
  ];

  arrayRamPc = [
    { id: 1, name: '2GO' },
    { id: 2, name: '4GO' },
    { id: 3, name: '8GO', },
    { id: 4, name: '16GP', },
    { id: 5, name: '32GP', },
    { id: 6, name: '64GP', },
    { id: 7, name: '128GP', },
  ];

  arrayCpu = [
    { id: 1, name: 'i3' },
    { id: 2, name: 'i5' },
    { id: 3, name: 'i7', },
    { id: 4, name: 'i8', },
    { id: 5, name: 'i9', },
  ];

  constructor(private activeModal: NgbActiveModal, private toastService: ToastService) { }

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


  customSearchFnService(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return item.name.toLocaleLowerCase().indexOf(term) > -1 || item.id.toString().indexOf(term) > -1;
  }


  addService() {


  }



  checkValidateTypeService() {
    this.isValidatedTypeService = this.selectedTypeService ? true : false;
    this.isClickedTypeService = true;
  }

  checkValidateModelService() {
    this.isValidatedModelService = this.selectedModelService ? true : false;
    this.isClickedModelService = true;
  }

  checkValidateNomPc() {
    this.isValidatedNomPc = this.selectedNomPc ? true : false;
    this.isClickedNomPc = true;
  }
  

  checkValidateRamPc() {
    this.isValidatedRamPc = this.selectedRamPc ? true : false;
    this.isClickedRamPc = true;
  }

  checkValidateCpu() {
    this.isValidatedCpu = this.selectedCpu ? true : false;
    this.isClickedCpu = true;
  }



}





