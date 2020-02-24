import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/shared/models/product";
import { ProductService } from "../../../shared/services/product.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  products: Product[];
  productList = [];
  url;
  urllist = [];
  public loading = true;

  constructor(
    private PService: ProductService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.PService.getProducts().subscribe((data: Product[]) => {
      this.loading = false;
      this.productList = data;
      let len = data.length;
      for (let entry of data) {
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
    });

  }
  addToCart(product: Product) {
		this.PService.addToCart(product);
	}
}
