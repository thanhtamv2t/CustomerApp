import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profilemodal',
  templateUrl: 'profilemodal.html',
})
export class ProfilemodalPage {
	first:any;
	last:any;
	password:any;
	email:any;
	phone:any;
	uid:any;
	temp:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,private _storage:Storage,private _api:ApiProvider,private _toast: ToastController,private _event:Events) {
  		this._storage.get('user').then((val)=>{
  			this.uid = val.user_id;
  			this.first = val.user_first;
  			this.last = val.user_name;
  			this.password ='';
  			this.email = val.user_email;
  			this.phone = val.user_phone;
  			console.log(this.phone);
  		});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  save()
  {
  	this._api.post('user_update',{ user_id:this.uid,user_firstname:this.first,user_lastname:this.last,password:this.password }).subscribe(
  		data=>{
  			this.presentToast("Đã cập nhật, vui lòng vào lại mục thông tin để hệ thống cập nhật!");
  			this.dismiss();
  			//Reupdate Key
  			this._storage.get('user').then((val)=>{
  				this.temp = val;
  				this.temp.user_first = this.first;
  				this.temp.user_name = this.last;
  				this._storage.set('user',this.temp);
  			});
  		},error=>{
  			alert("Xảy ra lỗi vui lòng thử lại!");

  		});
  }
  presentToast(message) {
    let toast = this._toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
