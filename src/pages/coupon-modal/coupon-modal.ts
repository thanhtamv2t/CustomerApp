import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CouponModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupon-modal',
  templateUrl: 'coupon-modal.html',
})
export class CouponModalPage {
	db: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.db = this.navParams.get('coupon');
  	//console.log(this.db);
  	if(this.db.get_coupon ==false)
  	{
  		this.db.code = "";
  	}
  }
}
