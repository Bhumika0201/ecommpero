import {
  Component,
  OnInit,
  ɵCodegenComponentFactoryResolver
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "../../shared/models/user";
import { AuthServices } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  showAdmin: boolean;
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  userName;
  user2: SocialUser;
  loggedIn: boolean;

  constructor(
    private authServices: AuthService,
    private router: Router,
    public authService: AuthServices,
    public productService: ProductService
  ) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(
      user => {
        this.currentUser = user;

        console.log(this.currentUser.isAdmin);
      }
    );

    this.authServices.authState.subscribe(user => {
      if (user != null) {
        this.userName = user.firstName;

        console.log(user.firstName);
      }
    });
  }

  ngOnInit() {
    console.log(localStorage);
    this.productService.calculateLocalCartProdCounts();
  }
  logout() {
    this.currentUserSubscription.unsubscribe();
    this.userName = null;
    this.showAdmin = false;
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
