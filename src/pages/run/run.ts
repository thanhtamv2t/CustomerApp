import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the RunPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-run',
  templateUrl: 'run.html',
})
export class RunPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private _storage: Storage) {
  		this._storage.get('email').then((val)=>{
  			if(val!=null)
  			{
  				this.navCtrl.setRoot(HomePage);
  			}else
  			{
  				this.navCtrl.setRoot("LoginPage");
  			}
  		});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RunPage');
  }

}
