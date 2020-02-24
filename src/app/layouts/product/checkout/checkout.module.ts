import { CheckoutRoutingModule } from './checkout.routing';
import { SharedModule } from '../../../shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
@NgModule({
	imports: [ CommonModule, SharedModule, CheckoutRoutingModule ],
	declarations: [
		CheckoutComponent,
		ShippingDetailsComponent,

	],
	exports: [ CheckoutComponent ]
})
export class CheckoutModule {}
