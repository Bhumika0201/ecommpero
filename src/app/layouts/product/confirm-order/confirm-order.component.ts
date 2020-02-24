import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { AuthServices } from '../../../shared/services/auth.service';
import { AuthService } from "angularx-social-login";


import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
  cartProducts:Product[];
  url;
  urllist = [];
  address;
  private sub: any;
  username;
  DeliveryInfo



  constructor(private productService:ProductService,public sanitizer: DomSanitizer,public authService: AuthService,public AuthServices:AuthServices,

    private route: ActivatedRoute) {
      this.authService.authState.subscribe(user => {
        if (user != null) {
          this.username = user.firstName;

          console.log(user.firstName);
        }
      });
    }

  ngOnInit() {

    this.getCartProduct();
    this.sub = this.route.params.subscribe((params) => {
     this.address = params['address'];
     // (+) converts string 'id' to a number



    });
    this.productService.AddAddress(this.address);//to be uncommented
    const c=this.AuthServices.getPastDeliveryinfo()
    console.log('past',c);




  }

  getCartProduct() {
    this.cartProducts = this.productService.addtopostorder();
    console.log('cartProducts',this.cartProducts);
    for (let entry of this.cartProducts) {
      console.log(entry);
      for (let photo of entry.photos) {
        let TYPED_ARRAY = new Uint8Array(photo.data);

        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, "");

        let base64String = btoa(STRING_CHAR);

        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          "data:image/jpg;base64," + base64String
        );

        console.log(this.url);
      }
      this.urllist.push(this.url);
      console.log(this.urllist);
    }
	}


}
