import {Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CustomerManagementService } from 'src/app/Services/CustomerManagementService/customer-management.service';
import { ModalConfig } from '../../ModelConfig/modal-config';
import { DialogService } from 'src/app/Services/Notification/dialog.service';
import { ToastService } from 'src/app/Services/Notification/toast.service';
import { AddResponsableComponent } from '../add-responsable/add-responsable.component';
import { UpdateResponsableComponent } from '../update-responsable/update-responsable.component';

export interface Customer {
  id: string;
  firstname: string;
  lastName: string;
  email: string;
  phone: string;
  adress: string;
}


@Component({
  selector: 'app-responsable-list',
  templateUrl: './responsable-list.component.html',
  styleUrls: ['./responsable-list.component.css']
})
export class ResponsableListComponent implements OnInit {

  ELEMENT_DATA: Customer[];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'phone', 'adress', 'update', 'delete'];

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  dataSource: MatTableDataSource<Customer>;
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


  constructor(private modalService: NgbModal,private dialogService: DialogService, private toastService: ToastService, private formBuilder: FormBuilder, private customerManagementService: CustomerManagementService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getAllResponsable();
  }

  openAddResponsableModal() {
    this.modalRef = this.modalService.open(AddResponsableComponent, this.modalOptions); 
    this.modalRef.result.then(() => {
    },
    () => {
        this.getAllResponsable();
    });
    }

  openUpdateResponsableModal(row) {
    this.modalRef = this.modalService.open(UpdateResponsableComponent, this.modalOptions);
    this.modalRef.componentInstance.fromParent = row;
    this.modalRef.result.then(() => {
    },
    () => {
        this.getAllResponsable();
    });

  }


  getAllResponsable() {
    let resp = this.customerManagementService.getListResponsables();
    resp.subscribe(
      response => {        
        this.dataSource.data = response as Customer[];
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
    this.dataSource.filter = words.toString().trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  };


  deleteResponsable(row) {
    this.dialogService.openConfirmDialog('Vous etes sur de supprimer ce responsable ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.customerManagementService.deleteUser(row.id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(x => x.id !== row.id)
            this.toastService.showSuccess();
          },
            () => {
              this.toastService.showWarning();
            })
        }
      });
  }




}



