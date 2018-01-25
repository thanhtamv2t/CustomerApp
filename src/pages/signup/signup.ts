import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
	first:any;
	last:any;
	email:any;
	password:any;
	phone:any;
	show:any = false;
	temp:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _api: ApiProvider,private _toast:ToastController) {

  }

  signup()
  {
  	this._api.post('user_signup',{first: this.first,last:this.last,password:this.password,email:this.email,phone:this.phone}).subscribe(data=>{
  		this.temp = data;
  		if(this.temp.code==0)
  		{
  			this.presentToast("Email đã tồn tại trên hệ thống!");
  		}
  		else if(this.temp.code==1)
  		{
  			this.presentToast("Số điện thoại đã được sử dụng!")
  		}else if(this.temp.code==2)
  		{
  			this.presentToast("Đăng ký thành công!");
  			this.navCtrl.pop();
  		}else
  		{
  			this.presentToast("Xảy ra lỗi, vui lòng thử lại!");
  		}
  	},error=>{
  		console.log(error);
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
