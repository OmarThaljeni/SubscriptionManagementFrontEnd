import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/Login/register/register.component';
import { LoginComponent } from './Components/Login/Auth/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainerComponent } from './Components/toast-container/toasts-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomerListComponent } from './Components/CustomerManagement/customer-list/customer-list.component';
import { MatTableModule } from '@angular/material/table'  
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import 'hammerjs';
import { AddCustomerComponent } from './Components/CustomerManagement/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './Components/CustomerManagement/update-customer/update-customer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './Components/mat-confirm-dialog/mat-confirm-dialog.component';
import {MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from './Components/Material/material.module';
import { PresentationComponent } from './Components/home/presentation.component';
import { loginInterceptorProvider } from './Services/AuthService/login-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToastsContainerComponent,
    CustomerListComponent,
    PresentationComponent,
    AddCustomerComponent,
    UpdateCustomerComponent,
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
   MatSnackBarModule,
   BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MaterialModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [loginInterceptorProvider],
  bootstrap: [AppComponent],
  entryComponents:[MatConfirmDialogComponent]
})
export class AppModule { }
