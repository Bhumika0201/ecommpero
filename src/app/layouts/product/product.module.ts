// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CheckoutModule } from "./checkout/checkout.module";

import { AgmCoreModule } from '@agm/core';

// configuration and services
import { ProductRoutes } from "./product.routing";
//import { FileDropDirective, FileSelectDirective} from 'ng2-file-upload';

// Components


import { ProductComponent } from "./product.component";


import { AddProductComponent } from "./add-product/add-product.component";
import { NoProductsFoundComponent } from '../../shared/components/no-products-found/no-products-found.component';


import { SharedModule } from "../../shared/shared.module";
import { ProductListComponent } from './product-list/product-list.component';
import { BestProductComponent } from './best-product/best-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { CartCalculatorComponent } from './cart-calculator/cart-calculator.component';
import { CategoryProdListComponent } from './category-prod-list/category-prod-list.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
	imports: [CommonModule,NgxLoadingModule.forRoot({}), RouterModule.forChild(ProductRoutes), SharedModule,CheckoutModule,    AgmCoreModule.forRoot({
    apiKey: 'AIzaSyBQoKK2b-FcP__EN1XSM-SI7dnRz41QIyA',
    libraries: ['places']
  }),],
	declarations: [
		ProductComponent,
    ProductDetailComponent,
		AddProductComponent,

		ProductListComponent,
    NoProductsFoundComponent,
		BestProductComponent,
     //FileSelectDirective,
    // FileDropDirective,
    CartProductsComponent,
    CartCalculatorComponent,
    CategoryProdListComponent,
    SearchresultsComponent,
    ConfirmOrderComponent,

	],
	exports: [BestProductComponent]
})
export class ProductModule { }
