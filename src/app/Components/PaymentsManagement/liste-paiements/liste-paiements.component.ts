import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from '../../ModelConfig/modal-config';
import { DialogService } from 'src/app/Services/Notification/dialog.service';
import { ToastService } from 'src/app/Services/Notification/toast.service';
import { PaymentsMangamentService } from 'src/app/Services/Payement/payments-mangament.service';

export interface Paiement {
  id: number;
  montantPaie: number;
  montantReste: number;
  datePayment: Date;
}

@Component({
  selector: 'app-liste-paiements',
  templateUrl: './liste-paiements.component.html',
  styleUrls: ['./liste-paiements.component.css']
})
export class ListePaiementsComponent implements OnInit {

  ELEMENT_DATA: Paiement[];
  displayedColumns: string[] = ['id','fullName','typeAbonnement','montantTotal', 'montantPaie', 'montantReste', 'datePayment'];


  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  dataSource: MatTableDataSource<Paiement>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filter = new FormControl('', []);

  filterForm = this.formBuilder.group(
    {
      filter: this.filter,
    }
  );


  modalRef: any;
  modalOptions: NgbModalOptions = ModalConfig;


  constructor (private paymentsMangamentService:PaymentsMangamentService, private modalService: NgbModal, private dialogService: DialogService, private toastService: ToastService, private formBuilder: FormBuilder) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getAllServices();
  }


  getAllServices() {
    let resp = this.paymentsMangamentService.getListPaiements();
    resp.subscribe(
      response => {        
        console.log(response);
        
        this.dataSource.data = response as Paiement[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      });


  }

  applyFilter(filterValue: Event) {
    this.dataSource.filter = filterValue.toString().trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByKeyWord(words: any) {
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    this.dataSource.filter = words.toString().trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  };

 




}







