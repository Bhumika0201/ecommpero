import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MDBBootstrapModule } from "angular-bootstrap-md";

import { FormsModule, FormBuilder } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";

import { HttpClientModule } from "@angular/common/http";
import { ProductService } from "./services/product.service";


import { AuthServices } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { NgxContentLoadingModule } from "ngx-content-loading";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('23123879542-sg3679jus4lqkqsoaepmj880atep912f.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("744352662738829")
  }

]);
export function provideConfig() {
  return config;
}
@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
SocialLoginModule,//for fb & google
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxContentLoadingModule
  ],
  declarations: [],
  exports: [
    FormsModule,
    MDBBootstrapModule,


    FormsModule,
    RouterModule,

    NgxContentLoadingModule
  ],
  providers: [AuthServices, FormBuilder, UserService,ProductService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class SharedModule {}
