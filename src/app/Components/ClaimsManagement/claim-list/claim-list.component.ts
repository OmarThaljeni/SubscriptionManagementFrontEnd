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
import { ClaimManagementService } from 'src/app/Services/ClaimService/claim-management.service';
import { AddClaimComponent } from '../add-claim/add-claim.component';

export interface Claims {
  id: string;
  subject: string;
  body: string;
  priority: string;
  typeSubscription: string;
  user: any;
}

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {

  ELEMENT_DATA: Claims[];
  displayedColumns: string[] = ['id','fullname', 'subject', 'body', 'priority','status','delete'];


  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  dataSource: MatTableDataSource<Claims>;

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


  constructor (private claimManagementService: ClaimManagementService, private modalService: NgbModal, private dialogService: DialogService, private toastService: ToastService, private formBuilder: FormBuilder) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getAllClaims();
  }


  getAllClaims() {
    let resp = this.claimManagementService.getListClaims();
    resp.subscribe(
      response => {        
        this.dataSource.data = response as Claims[];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      });
  }

  openAddClaimsModal() {
    this.modalRef = this.modalService.open(AddClaimComponent, this.modalOptions); 
    this.modalRef.result.then(() => {
    },
    () => {
        this.getAllClaims();
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

  deleteClaims(row) {
    this.dialogService.openConfirmDialog('Vous etes sur de supprimer cette réclamation ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.claimManagementService.deleteClaim(row.id).subscribe(() => {
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






