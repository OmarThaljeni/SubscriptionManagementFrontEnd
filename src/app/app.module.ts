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
import { ToastsContainerComponent } from './Components/Toast-container/toasts-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomerListComponent } from './Components/CustomerManagement/customer-list/customer-list.component';
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import 'hammerjs';
import { AddCustomerComponent } from './Components/CustomerManagement/add-customer/add-customer.component';
import { UpdateCustomerComponent } from './Components/CustomerManagement/update-customer/update-customer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './Components/Mat-confirm-dialog/mat-confirm-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from './Components/Material/material.module';
import { PresentationComponent } from './Components/Home/presentation.component';
import { loginInterceptorProvider } from './Services/AuthService/login-interceptor';
import { ResponsableListComponent } from './Components/ResponsableManagement/responsable-list/responsable-list.component';
import { AddResponsableComponent } from './Components/ResponsableManagement/add-responsable/add-responsable.component';
import { UpdateResponsableComponent } from './Components/ResponsableManagement/update-responsable/update-responsable.component';
import { ListSubscriptionComponent } from './Components/SubscriptionManagement/list-subscription/list-subscription.component';
import { AddSubscriptionComponent } from './Components/SubscriptionManagement/add-subscription/add-subscription.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from '@angular/material/select';
import {NgSelectModule} from '@ng-select/ng-select';
import { SubscriptionListByCustomerComponent } from './Components/CustomerManagement/subscription-list-by-customer/subscription-list-by-customer.component';
import { ClaimListComponent } from './Components/ClaimsManagement/claim-list/claim-list.component';
import { AddClaimComponent } from './Components/ClaimsManagement/add-claim/add-claim.component';
import { UpdateClaimComponent } from './Components/ClaimsManagement/update-claim/update-claim.component';
import { ListServiceCniComponent } from './Components/ServiceCniManagement/list-service-cni/list-service-cni.component';
import { AddServiceCniComponent } from './Components/ServiceCniManagement/add-service-cni/add-service-cni.component';
import { AddServiceComponent } from './Components/SubscriptionManagement/add-service/add-service.component';


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
    MatConfirmDialogComponent,
    ResponsableListComponent,
    AddResponsableComponent,
    UpdateResponsableComponent,
    ListSubscriptionComponent,
    AddSubscriptionComponent,
    SubscriptionListByCustomerComponent,
    ClaimListComponent,
    AddClaimComponent,
    UpdateClaimComponent,
    ListServiceCniComponent,
    AddServiceCniComponent,
    AddServiceComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTableModule,
    NgSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
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
  entryComponents: [MatConfirmDialogComponent]
})
export class AppModule { }
