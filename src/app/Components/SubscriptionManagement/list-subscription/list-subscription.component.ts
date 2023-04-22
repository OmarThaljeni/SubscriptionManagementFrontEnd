import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from '../../ModelConfig/modal-config';
import { DialogService } from 'src/app/Services/Notification/dialog.service';
import { ToastService } from 'src/app/Services/Notification/toast.service';
import { SubscirpionManagementService } from 'src/app/Services/SubscriptionManagement/subscirpion-management.service';
import { AddSubscriptionComponent } from '../add-subscription/add-subscription.component';

export interface Subscription {
  id: string;
  typeSubscription: string;
  userSet: any[];
}

@Component({
  selector: 'app-list-subscription',
  templateUrl: './list-subscription.component.html',
  styleUrls: ['./list-subscription.component.css']
})
export class ListSubscriptionComponent implements OnInit {

  ELEMENT_DATA: Subscription[];
  displayedColumns: string[] = ['id', 'typeSubcription','idUser', 'firstname', 'lastname','adress', 'update', 'delete'];


  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  dataSource: MatTableDataSource<Subscription>;

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


  constructor(private subscirpionManagementService: SubscirpionManagementService, private modalService: NgbModal, private dialogService: DialogService, private toastService: ToastService, private formBuilder: FormBuilder) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getAllSubscription();
  }


  getAllSubscription() {
    let resp = this.subscirpionManagementService.getAllSubscriptions();
    resp.subscribe(
      response => {        
        this.dataSource.data = response as Subscription[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'userSet[0].id': return item.userSet[0].id;
            case 'userSet[0].firstname': return item.userSet[0].firstname;
            case 'userSet[0].lastname': return item.userSet[0].lastname;
            case 'userSet[0].adress': return item.userSet[0].adress;
            default: return item[property];
          }
        };      
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      });
  }

  openAddSubscriptionModal() {
    this.modalRef = this.modalService.open(AddSubscriptionComponent, this.modalOptions); 
    this.modalRef.result.then(() => {
    },
    () => {

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
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1; 
    }
    this.dataSource.filter = words.toString().trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  };


}






