import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})


export class HistoryPage {
  db:any;
  uid:any;
  num:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _api:ApiProvider,private _storage:Storage) {
    this._storage.get('user').then((val)=>{
      this.uid = val.user_id;
        	this._api.post('coupon_list',{ user_id: val.user_id  }).subscribe(data=>{
  				this.db = data;
  				console.log(this.db);
          this.num = this.db.length;
  			}); 
    });

  }
  ngOnInit(){
    
  }
  codeView(code)
  {
  	this.navCtrl.push("CodeviewPage",{ code: code });
  }
}
