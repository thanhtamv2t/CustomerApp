import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
//import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Headers, RequestOptions } from '@angular/http';
import { ApiProvider } from '../../providers/api/api';
//Import page
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  access: any;
  temp:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _toast: ToastController,private _api: ApiProvider,private _storage: Storage) {
  }

  information = {email: '',password: ''};
  user = {user_id:'',user_name:'',user_avatar:'',user_email:'',user_active:'',user_verify:''};

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  signin()
  {
  	if(this.information.email == '' && this.information.email == '')
  	{
  		this.presentToast('Vui lòng điền đầy đủ thông tin!');
  	}else
  	{	
  		this._api.post('user',{ email: this.information.email, password: this.information.password }).subscribe(data=>{
        this.access = data;
        console.log(this.access);
  			if(this.access.acc)
  			{
  				this.presentToast('Đăng nhập thành công!');		
          //Storage User Information
          this._api.get('user?email='+this.information.email).subscribe(db=>{
              this.temp = db;
              this.user.user_id=this.temp.user_id;
              this.user.user_name = this.temp.user_lastname;
              this.user.user_email = this.temp.user_email;
              this.user.user_active = this.temp.user_activation;
              this.user.user_verify = this.temp.user_email_verify;
              this._storage.set('user',this.user);
          });
          //
          this._storage.set('email',this.information.email);
  				this.navCtrl.setRoot(HomePage);
          
  			}else{
  				this.presentToast('Sai thông tin đăng nhập!');		
  			}
  		});
  		

  	}
  }
  presentToast(message) {
    let toast = this._toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
