import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CouponModalPage } from './coupon-modal';

@NgModule({
  declarations: [
    CouponModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CouponModalPage),
  ],
})
export class CouponModalPageModule {}
