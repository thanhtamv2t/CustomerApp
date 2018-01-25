import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ProfilemodalPage } from '../profilemodal/profilemodal';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	cfirst:any;
	clast:any;
	cpassword:any;
	cemail:any;
	cphone:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _modal:ModalController,private _storage:Storage) { 	
  }
  ngOnInit(){
  		this._storage.get('user').then((val)=>{
  			this.cfirst = val.user_first;
  			this.clast = val.user_name;
  			this.cpassword ='';
  			this.cemail = val.user_email;
  			this.cphone = val.user_phone;
  			console.log(this.cphone);
  		});   	
  }
  presentModal() {
    let modal = this._modal.create(ProfilemodalPage);
    modal.present();
  }
}
