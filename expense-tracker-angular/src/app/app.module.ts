import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { LoginComponent } from './views/login/login.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { AngularFireModule } from '@angular/fire/compat';
import { DashComponent } from './views/dash/dash.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { NgChartsModule } from 'ng2-charts';
import { MonthlyTrendComponent } from './components/charts/monthly-trend/monthly-trend.component';
import { ExpensesByCategoryComponent } from './components/charts/expenses-by-category/expenses-by-category';
import { TableComponent } from './components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardMinicardComponent } from './components/dashboard-minicard/dashboard-minicard.component';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AvatarModule } from 'ngx-avatar';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashComponent,
    DashboardCardComponent,
    MonthlyTrendComponent,
    ExpensesByCategoryComponent,
    TableComponent,
    SidenavComponent,
    DashboardMinicardComponent,
    AddExpenseComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase), //Needed for UI Module
    FirebaseUIModule.forRoot(firebaseUiAuthConfig), 
    LayoutModule, 
    NgChartsModule, MatTableModule, MatPaginatorModule, MatSortModule,
    NgxShimmerLoadingModule,
    AvatarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
