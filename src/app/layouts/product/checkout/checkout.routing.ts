import { CheckoutComponent } from './checkout.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../shared/services/auth_gaurd';

export const checkoutRoutes: Routes = [
	{
		path: 'checkouts',
		component: CheckoutComponent,
		//canActivate: [ AuthGuard ],
  }
];

@NgModule({
	imports: [ RouterModule.forChild(checkoutRoutes) ],
	exports: [ RouterModule ]
})
export class CheckoutRoutingModule {}
