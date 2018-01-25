import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import { ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
//Page Import 
import { CouponModalPage } from '../coupon-modal/coupon-modal';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})

export class DetailPage {
  proid: any;
  uid:any;
  pro: any;
  time:any;
  gtime:any;
  t:any;
  active:any;
  program = { pro_id: '',pro_name:'',pro_address: '',pro_image:'',pro_images:'',pro_desc:'',pro_rating:'' }
  constructor(public navCtrl: NavController, public navParams: NavParams,private _api: ApiProvider,private _storage: Storage,private _modal: ModalController) {
  	this.proid = this.navParams.get('id'); 
    this._storage.get('user').then((val)=>{
      this.uid = val.user_id;
    });
      this._storage.get('user').then((val)=>{
        this.active = val.user_active;
        if(this.active!=2)
        {
          this._storage.remove('user');
          this._storage.remove('email');
          this.navCtrl.setRoot("NotactivePage");

        }
      });     
  }
  ngOnInit(){
  	this._api.get('program?id='+this.proid).subscribe((data)=>{
  		this.pro  = data;
  		this.program.pro_id = this.pro.pro_id;
  		this.program.pro_name = this.pro.pro_name;
  		this.program.pro_address = this.pro.pro_address;
  		this.program.pro_image = this.pro.pro_post_image;
  		this.program.pro_images = this.pro.pro_images;
  		this.program.pro_desc = this.pro.pro_menu;
  		this.program.pro_rating = Math.round((this.pro.pro_rating.valueOf()*13.25)).toString();
  		console.log(this.program);
  	});  	
    this._api.get('time').subscribe((data)=>{
      this.time = data;
      if(this.time.length==0)
        this.time.push("Đã hết giờ phục vụ!");
      console.log(this.time);
    });
  }
  ionViewDidLoad() {

  }
  getCoupon()
  {
    this._api.post('coupon',{ user_id: this.uid,program_id: this.program.pro_id,time:this.gtime }).subscribe(data=>{
      this.t = data;
      console.log(this.t)
        this.navCtrl.push(CouponModalPage,{ coupon: this.t,time: this.gtime });
    },
    err=>{
      console.log("Error");
    });
  }

}
