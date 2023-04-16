import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CustomerManagementService } from 'src/app/Services/CustomerManagementService/customer-management.service';

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


  constructor(private formBuilder: FormBuilder, private customerManagementService : CustomerManagementService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getAllCustomers();
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

/*   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } */
  
  filterByKeyWord(words : any){
    this.dataSource.filter = words.toString().trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  };
    
  }
  
