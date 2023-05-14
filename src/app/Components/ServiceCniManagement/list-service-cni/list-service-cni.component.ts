

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from '../../ModelConfig/modal-config';
import { DialogService } from 'src/app/Services/Notification/dialog.service';
import { ToastService } from 'src/app/Services/Notification/toast.service';
import { AddServiceCniComponent } from '../add-service-cni/add-service-cni.component';
import { CniManagementService } from 'src/app/Services/ServiceCniManagement/cni-management.service';

export interface CniService {
  id: string;
  typeService: string;
  modelService: string;
  namePc: string;
  ramPc: string;
  cpuPc: any;
}

@Component({
  selector: 'app-list-service-cni',
  templateUrl: './list-service-cni.component.html',
  styleUrls: ['./list-service-cni.component.css']
})
export class ListServiceCniComponent implements OnInit {

  ELEMENT_DATA: CniService[];
  displayedColumns: string[] = ['id', 'typeService', 'modelService', 'namePc','ramPc','cpuPc','delete'];


  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  dataSource: MatTableDataSource<CniService>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filter = new FormControl('', []);

  filterForm = this.formBuilder.group(
    {
      filter: this.filter,
    }
  );

  buttonText: string = 'Open Modal';

  modalRef: any;
  modalOptions: NgbModalOptions = ModalConfig;


  constructor (private cniManagementService:CniManagementService, private modalService: NgbModal, private dialogService: DialogService, private toastService: ToastService, private formBuilder: FormBuilder) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getAllServices();
  }


  getAllServices() {
    let resp = this.cniManagementService.getListServices();
    resp.subscribe(
      response => {        
        this.dataSource.data = response as CniService[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      });


  }

  openAddServiceModal() {
    this.modalRef = this.modalService.open(AddServiceCniComponent, this.modalOptions); 
    this.modalRef.result.then(() => {
    },
    () => {
        this.getAllServices();
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






