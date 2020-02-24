import { Injectable } from "@angular/core";
import { Router, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthServices } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthServices) { }

  canActivate(route, state: RouterStateSnapshot) {
    // console.log(this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(["/login"], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
