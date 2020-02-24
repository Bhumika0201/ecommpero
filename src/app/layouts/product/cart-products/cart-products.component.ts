import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';
import { DomSanitizer } from "@angular/platform-browser";
import { NoProductsFoundComponent } from '../../../shared/components/no-products-found/no-products-found.component';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit {
  cartProducts: Product[];
  url;
  urllist = [];
  messageTitle = 'No Products Found in Cart';
	messageDescription = 'Please, Add Products to Cart';
  constructor(private productService: ProductService,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getCartProduct();
  }
  getCartProduct() {
    this.cartProducts = this.productService.getLocalCartProducts();
    console.log('cart products',this.cartProducts);
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


  //remove cart products

  removeCartProduct(product: Product) {
		this.productService.removeLocalCartProduct(product);

		// Recalling
		this.getCartProduct();
	}
}
