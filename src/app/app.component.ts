import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from '../app/shared/services/product.service';
import { Product } from "src/app/shared/models/product";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DemoApp3';
  data = [];
  
  productList = [];

  constructor(public router: Router,public Pservice:ProductService){}
  ngOnInit(){
    this.Pservice.getProducts().subscribe((data: Product[]) => {
      this.productList = data;
      for (let entry of this.productList) {
        this.data.push(entry.productName);
      }



    });

  }
  searchValue(value){

    this.router.navigate(['/products/searchResults',value]);


  }

  changeEventAutocomplete(value){

    this.router.navigate(['/products/searchResults',value]);


  }
  keyword = 'searchTerm';





  //function to router link
}
