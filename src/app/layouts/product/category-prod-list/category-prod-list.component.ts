import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from "../../../shared/services/product.service";
import { DomSanitizer } from "@angular/platform-browser";

import { Product } from "src/app/shared/models/product";



@Component({
  selector: 'app-category-prod-list',
  templateUrl: './category-prod-list.component.html',
  styleUrls: ['./category-prod-list.component.scss']
})
export class CategoryProdListComponent implements OnInit {
  private sub: any;
  products: Product[];
  productList = [];
  url;
  urllist = [];
  loading = true;

  constructor(		private route: ActivatedRoute,
    private PService: ProductService,
    public sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const category = params['productCategory'];
     // (+) converts string 'id' to a number
      this.getCategoryWiselist(category);

		});
  }
  getCategoryWiselist(category){
    this.urllist = [];
    this.productList = [];
    this.loading = true;

    console.log(category)
    this.PService.getProductsCategoryWise (category).subscribe((data :Product[]) => {
      this.loading= false;
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
