import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-codeview',
  templateUrl: 'codeview.html',
})
export class CodeviewPage {
  code:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.code = this.navParams.get('code');
  }

}
