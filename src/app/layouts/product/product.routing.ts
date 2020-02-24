
import { AddProductComponent } from './add-product/add-product.component';
import { Routes } from '@angular/router';
import { IndexComponent } from '../../index/index.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryProdListComponent} from './category-prod-list/category-prod-list.component';
import { SearchresultsComponent} from './searchresults/searchresults.component';
import { ConfirmOrderComponent} from './confirm-order/confirm-order.component';



export const ProductRoutes: Routes = [
	{
		path: 'products',
		children: [
			{
				path: '',
				component: IndexComponent
      },
      {
        path: 'add-product',
				// tslint:disable-next-line: indent
				component: AddProductComponent

      },
      {
				path: 'all-products',
				component: ProductListComponent
      },
      {
				path: 'cart-items',
				component: CartProductsComponent
			},
      {
				path: 'product/:id',
				component: ProductDetailComponent
      },
      {
				path: 'ctgProd/:productCategory',
				component: CategoryProdListComponent
      },
      {
				path: 'searchResults/:searchTerm',
				component: SearchresultsComponent
      },
      {
				path: 'checkouts',
        loadChildren: './checkout/checkout.module#CheckoutModule'
      },
      {
				path: 'confirm-order/:address',
        component: ConfirmOrderComponent
			},

		]
	}
];

