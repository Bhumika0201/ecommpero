import { Component, OnInit } from "@angular/core";
import { NgForm, EmailValidator } from "@angular/forms";
import { ToastrServic } from "./../../shared/services/toastr.service";

import { AuthServices } from "../../shared/services/auth.service";
import { UserService } from "../../shared/services/user.service";

import { User } from "../../shared/models/user";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";


declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [EmailValidator]
})
export class LoginComponent implements OnInit {
  private user2: SocialUser;
  private loggedIn: boolean;

  user = {
    emailId: "",
    loginPassword: ""
  };
  showAdmin:boolean ;
  errorInUserCreate = false;
  errorMessage: any;
  createUser;
  loggedUser;
  constructor(
    private authServices: AuthService,
    private authService: AuthServices,
    private userService: UserService,
    private toastService: ToastrServic,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createUser = new User();

  }

  ngOnInit() {
    this.authServices.authState.subscribe((user) => {
      this.user2 = user;
      this.loggedIn = (user != null);
      localStorage.setItem('currentUser', JSON.stringify(user));
       localStorage.setItem('access_token', user.authToken);


    });


  }
  addUser(userForm: NgForm) {

    this.authService
      .createUserWithEmailAndPassword(userForm.value["emailId"], userForm.value["password"]).subscribe((data) => {


        this.toastService.success(
          "registration  Success",
          "Logging in please wait"
        );

        this.router.navigate(['/']);


      },
      (err)=>{ console.log(err.error);
      this.toastService.error(
        "Authentication Failed",
         JSON.stringify(err.error)
      );}
      );

  }




  signInWithEmail(userForm: NgForm) {

    this.authService
      .signInRegular(userForm.value["emailId"], userForm.value["loginPassword"]).subscribe((data) => {
        console.log(data.user.isAdmin);
        this.loggedUser = data.user;
        console.log(this.loggedUser);

        this.toastService.success(
          "Authentication Success",
          "Logging in please wait"
        );

        this.router.navigate(['/']);



      },
      (err)=>{ console.log('error');
      this.toastService.error(
        "Authentication Failed",
        "Invalid Credentials, Please Check your credentials"
      );}
      );

  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
    this.authServices.authState.subscribe((user) => {
      if (user != null){
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log(user.authToken)
        localStorage.setItem('access_token', user.authToken);
        this.router.navigate(['/']);

      }



    });


  }
  signInWithFacebook() {

this.authService.signInWithFacebook();
this.authServices.authState.subscribe((user) => {
  if (user != null){
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log(user.authToken)
    localStorage.setItem('access_token', user.authToken);
    this.router.navigate(['/']);

  }



});

  }

}
