import { Component, OnInit } from "@angular/core";
import { Product } from "../../../../shared/models/product";
import { ProductService } from "../../../../shared/services/product.service";
import { DomSanitizer } from "@angular/platform-browser";
import { MapsAPILoader } from "@agm/core";
import { AuthServices } from '../../../../shared/services/auth.service';
import { AuthService } from "angularx-social-login";
import { Router } from '@angular/router';



@Component({
  selector: "app-shipping-details",
  templateUrl: "./shipping-details.component.html",
  styleUrls: ["./shipping-details.component.scss"]
})
export class ShippingDetailsComponent implements OnInit {
  cartProducts: Product[];
  url;
  chooseLocation:boolean = false;
  addLocation:boolean = false;
  urllist = [];
  splitted=[];
  postalcode;
  totalValue = 0;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  constructor(
    private productService: ProductService,
    public sanitizer: DomSanitizer,
    private mapsAPILoader: MapsAPILoader,
    public authService: AuthServices,
    private router: Router

  ) {}

  ngOnInit() {
  this.getCartProduct() ;
  }
  uselocation(){
    this.chooseLocation=true;
    this.addLocation=false;
      this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;


    });
  }
  addAddress(){
    this.chooseLocation=false;
    this.addLocation=true;
  }
  private setCurrentLocation() {
    this.chooseLocation=true;
    this.addLocation=false;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        console.log(this.latitude);
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  getCartProduct() {
    this.cartProducts = this.productService.getLocalCartProducts();
    console.log(this.cartProducts);
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

    this.cartProducts.forEach(product => {
      this.totalValue += Number(product.productPrice);
    });
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log('r',results);
        console.log('s',status);
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
            this.splitted=this.address.split(',');
            this.postalcode=this.splitted[4].split(' ')
            console.log(this.splitted)
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  payfororder(){

    console.log(this.address)
    const res=this.productService.AddAddress(this.address);

    this.router.navigate(['products/confirm-order',this.address]);


  }
}
