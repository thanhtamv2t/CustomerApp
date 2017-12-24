import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any;
  list:any;
  ps: any;
  pos: any = 0;
  g: any = 2;
  constructor(public navCtrl: NavController,private _api: ApiProvider,private _toast: ToastController) {
      this.pos =0;
      this.g = 2;
  }

  ngOnInit(){
  	this._api.get('program').subscribe(data=>{
  		this.items = data;
  		this.list = this.items.slice(this.pos,this.g);
  		this.pos += this.g;

  	});
    this._api.get('priority_program').subscribe(data=>{
      this.ps = data;
    });
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      let db = this.items.slice(this.pos,this.pos+this.g);
      if(db.length!=0){
	      this.list = this.list.concat(db);
	      this.pos+=this.g;      	

      }else{
      	this.presentToast("Đã tải tất cả chương trình!");
      }
      infiniteScroll.complete();
    }, 500);
  }  
  detail(id){
  	this.navCtrl.push('DetailPage',{ id: id });
  }
  initializeItems(){
    this.list = this.items;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.list = this.list.filter((item) => {
        return (item.pro_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.pos=0;
      this.g = 2;
      this.list = this.items.slice(0,2);
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
