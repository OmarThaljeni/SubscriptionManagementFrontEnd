import { Component, OnInit,ViewChild } from '@angular/core';
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
import { NotificationService } from 'src/app/Services/Notification/notification.service';

export interface Customer {
  id: string;
  firstname: string;
  lastName: string;
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
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'phone', 'adress','update','delete'];

  
  @ViewChild(MatTable, {static:false}) table: MatTable<any>;
  dataSource: MatTableDataSource<Customer>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filter = new FormControl('', []);

  filterForm = this.formBuilder.group(
    {
      filter : this.filter,
    }
  );

  buttonText: string = 'Open Modal';
  
  modalRef: any;
  modalOptions: NgbModalOptions = ModalConfig;


  constructor(private dialogService: DialogService, private notificationService:NotificationService,private modalService: NgbModal, private formBuilder: FormBuilder, private customerManagementService : CustomerManagementService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getAllCustomers();
  }

  openAddCustomerModal() {
    this.modalRef = this.modalService.open(AddCustomerComponent, this.modalOptions);
  }

  openUpdateCustomerModal(row) {
    this.modalRef = this.modalService.open(UpdateCustomerComponent, this.modalOptions);
    this.modalRef.componentInstance.fromParent = row;
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
  
  filterByKeyWord(words : any){
    this.dataSource.filter = words.toString().trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  };
   


  onDelete(row){
    console.log("===> ",row);
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.notificationService.success('! Deleted successfully');
      }
    });
  }

  }

  
