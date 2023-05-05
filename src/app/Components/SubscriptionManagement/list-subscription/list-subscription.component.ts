import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
import { AddServiceComponent } from '../add-service/add-service.component';
import { CniService } from '../../ServiceCniManagement/list-service-cni/list-service-cni.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface Subscription {
  id: string;
  typeSubscription: string;
  userSet: any[];
  serviceCniSet?: CniService[];

}

@Component({
  selector: 'app-list-subscription',
  templateUrl: './list-subscription.component.html',
  styleUrls: ['./list-subscription.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class ListSubscriptionComponent implements OnInit {

  ELEMENT_DATA: Subscription[];
  displayedColumns: string[] = ['id', 'typeSubcription', 'idUser', 'fullName', 'adress', 'nbService', 'update', 'delete'];
  innerDisplayedColumns: string[] = ['id', 'typeService', 'modelService', 'namePc', 'ramPc', 'cpuPc'];
  expandedElement: Subscription | null;


  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  dataSource: MatTableDataSource<Subscription>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<CniService>>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;

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

  toggleRow(subscription: Subscription) {
    let openExpand = subscription.serviceCniSet;
    subscription.serviceCniSet
      && (openExpand && openExpand?.length > 0 && (this.expandedElement = this.expandedElement === subscription ? null : subscription));
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<CniService>).sort = this.innerSort.toArray()[index]);
  }


  getAllSubscription() {
    let resp = this.subscirpionManagementService.getAllSubscriptions();
    resp.subscribe(
      response => {
        this.dataSource.data = response as Subscription[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
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
        this.getAllSubscription();
      });
  }

  openAddServiceModal(row) {
    if ((row.serviceCniSet.length >= 3 && row.typeSubcription === 'Abonnement professionnel') || (row?.serviceCniSet.length >= 5 && row.typeSubcription === 'Abonnement normal') || (row?.serviceCniSet.length >= 7 && row.typeSubcription === 'Abonnement basique')) {
      this.toastService.showCannotAdd();
    } else {
      this.modalRef = this.modalService.open(AddServiceComponent, this.modalOptions);
      this.modalRef.componentInstance.fromParent = row;
      this.modalRef.result.then(() => {
      },
        () => {
          this.getAllSubscription();
        });
    }
  }

  deleteSubscription(row) {    
    if(row.serviceCniSet.length>0 && row?.userSet[0]) {
      this.toastService.showCannotDelete();
    }
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






