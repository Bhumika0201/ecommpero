import { Product } from "../../../shared/models/product";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../shared/services/product.service";
import { ToastrServic } from "src/app/shared/services/toastr.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  product;
  productList = [];
  url;
  url2;
  urllist = [];
  curPage = 0;
  pageSize = 1;
splitted=[];
public loading = true;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastrService: ToastrServic,
    public sanitizer: DomSanitizer
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params["id"];
      console.log(id); // (+) converts string 'id' to a number
      this.getProductDetail(id);
    });
  }

  getCategoryWiselist(category) {
    this.urllist = [];
    console.log(category);
    this.productService.searchProduct(category).subscribe((data: Product[]) => {
      this.loading=false;
      console.log(data);
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

          this.url2 = this.sanitizer.bypassSecurityTrustResourceUrl(
            "data:image/jpg;base64," + base64String
          );

          console.log(this.url2);
        }
        this.urllist.push(this.url2);
        console.log(this.urllist);
      }
    });
  }

  getProductDetail(id: string) {
    // this.spinnerService.show();
    this.productService.getProductDetails(id).subscribe((data: Product[]) => {
      this.loading=false;
      this.product = data;
      console.log(this.product);
      for (let photo of this.product.photos) {
        let TYPED_ARRAY = new Uint8Array(photo.data);

        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, "");

        let base64String = btoa(STRING_CHAR);

        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          "data:image/jpg;base64," + base64String
        );
        this.urllist.push(this.url);
        console.log(this.urllist);
        console.log(this.url);
      }
      this.splitted=this.product.productCategory.split(' ')
      this.getCategoryWiselist(this.splitted[0])
    });
    console.log("the category is", this.product);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
