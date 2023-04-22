import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CustomerManagementService } from 'src/app/Services/CustomerManagementService/customer-management.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { ModalConfig } from '../../ModelConfig/modal-config';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { DialogService } from 'src/app/Services/Notification/dialog.service';
import { ToastService } from 'src/app/Services/Notification/toast.service';

export interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  adress: string;
}


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

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

  buttonText: string = 'Open Modal';

  modalRef: any;
  modalOptions: NgbModalOptions = ModalConfig;


  constructor(private modalService: NgbModal,private dialogService: DialogService, private toastService: ToastService, private formBuilder: FormBuilder, private customerManagementService: CustomerManagementService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getAllCustomers();
  }

  openAddCustomerModal() {
    this.modalRef = this.modalService.open(AddCustomerComponent, this.modalOptions); 
    this.modalRef.result.then(() => {
    },
    () => {
        this.getAllCustomers();
    });
    }

  openUpdateCustomerModal(row) {
    this.modalRef = this.modalService.open(UpdateCustomerComponent, this.modalOptions);
    this.modalRef.componentInstance.fromParent = row;
    this.modalRef.result.then(() => {
    },
    () => {
        this.getAllCustomers();
    });
  }


  getAllCustomers() {
    let resp = this.customerManagementService.getListCustomers();
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


  deleteCustomer(row) {
    this.dialogService.openConfirmDialog('Vous etes sur de supprimer ce client ?')
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


