import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { IndexModule } from './index/index.module';
import { AppRoutes } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AgmCoreModule } from '@agm/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
    AppComponent,




  ],
  imports: [
    AutocompleteLibModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBQoKK2b-FcP__EN1XSM-SI7dnRz41QIyA',
      libraries: ['places']
    }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() ,
    NgxLoadingModule.forRoot({}),
    RouterModule.forRoot(AppRoutes),
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    IndexModule,
    SharedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
