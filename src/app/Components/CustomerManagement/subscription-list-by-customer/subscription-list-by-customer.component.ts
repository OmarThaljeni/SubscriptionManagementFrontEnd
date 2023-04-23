import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from '../../ModelConfig/modal-config';
import { ToastService } from 'src/app/Services/Notification/toast.service';
import { SubscirpionManagementService } from 'src/app/Services/SubscriptionManagement/subscirpion-management.service';
import { Subject } from 'rxjs';
import * as $ from "jquery";
import 'jqueryui';

export interface Subscription {
  id: string;
  typeSubscription: string;
  userSet: any[];
}

@Component({
  selector: 'app-subscription-list-by-customer',
  templateUrl: './subscription-list-by-customer.component.html',
  styleUrls: ['./subscription-list-by-customer.component.css']
})
export class SubscriptionListByCustomerComponent implements OnInit {
  
  @Output() onSubmitSubject: Subject<boolean> = new Subject<boolean>();
  ELEMENT_DATA: Subscription[];
  displayedColumns: string[] = ['id', 'typeSubcription', 'fullname', 'update', 'delete'];
  title: string = '';
  message: string = '';


  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
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
  @Input() fromParent;


  constructor(private activeModal: NgbActiveModal,private subscirpionManagementService: SubscirpionManagementService, private toastService: ToastService, private formBuilder: FormBuilder) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getAllSubscriptionsByCustomer();
    $(document).ready(function () {
      let modalContent: any = $('.modal-content');
      let modalHeader = $('.modal-header');
      modalHeader.addClass('cursor-all-scroll');
      modalContent.draggable({
        handle: '.modal-header'
      });

    });
  }


  getAllSubscriptionsByCustomer() {
    let resp = this.subscirpionManagementService.getAllSubscriptionByCustomer(this.fromParent.id);
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

  close() {
    this.activeModal.close();
    this.onSubmitSubject.next(true);
  }

}






