import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../models/user";

import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

import {
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angularx-social-login";
import { ConditionalExpr } from "@angular/compiler";

@Injectable()
export class AuthServices {
  private user: SocialUser;
  private loggedIn: boolean;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  userDetail;
  //uri = " http://localhost:5000/api/users";
  uri = " https://frozen-thicket-03463.herokuapp.com/api/users";

  loggedUser: User;
  loggedUser2;
  dbUser;
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {
    //localStorage.removeItem("currentUser")
    this.currentUserSubject = new BehaviorSubject<User>(
     // localStorage.removeItem("currentUser")
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  isLoggedIn(): boolean {
    return localStorage.getItem("access_token") !== null;
  }

  logout() {
    this.authService.signOut();
    this.loggedUser = null;
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    localStorage.removeItem("access_token");
  }
  /*createUserWithEmailAndPassword(emailID: string, password: string) {
    console.log("in auth service");
    const obj = {
      email: emailID,
      password: password
    };
    this.http
      .post(`${this.uri}/register`, obj)
      .subscribe(res => console.log(res));
  }*/
  getLoggedInUser() {}

  isAdmin(): boolean {
    const user = this.loggedUser;
    // console.log("loggedUSer", user)
    if (user != null && user.isAdmin === true) {
      return true;
    }
  }
  signInRegular(email, password) {
    console.log("in regular sign in");

    const obj = {
      email: email,
      password: password
    };
    return this.http
      .post<{ token: string; user: any }>(`${this.uri}/login`, obj)
      .pipe(
        map(result => {
          this.loggedUser = result.user;
          localStorage.setItem("currentUser", JSON.stringify(result.user));
          console.log(result.user);
          this.currentUserSubject.next(result.user);
          localStorage.setItem("access_token", result.token);
          return result;
        })
      );
  }
  createUserWithEmailAndPassword(email, password) {
    console.log("in regular sign in");
    console.log(email);
    console.log(password);
    const obj = {
      email: email,
      password: password
    };
    return this.http
      .post<{ token: string; user: any }>(`${this.uri}/register`, obj)
      .pipe(
        map(result => {
          this.loggedUser = result.user;
          console.log(result)

          localStorage.setItem("currentUser", JSON.stringify(result));
          localStorage.setItem("access_token", result.token);
          return result;
        })
      );
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe(user => {
      if (user != null) {
        this.loggedUser2 = user;
      }
    });
  }

  getPastDeliveryinfo() {

    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log("user is", user._id || user.id);
    this.http.post(`${this.uri}products/findbyId`, {
      idString: user._id || user.id
    });
    // return this.http.get(`http://localhost:5000/api/fbusers/login/facebook`);
  }

}
