import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RunPage } from '../pages/run/run';
import { HistoryPage } from '../pages/history/history';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  log: boolean;
  rootPage: any = RunPage;
  pages: Array<{title: string, component: any}>;
  User: any;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public _storage: Storage) {
    this.initializeApp();
      this._storage.get('email').then((val)=>{
        if(val!=null)
        {
          this.log = true;
          this._storage.get('user').then((val)=>{
            this.User = val;
            console.log(this.User);
          });
        }else
        {
          this.log = false;
        }
        console.log(this.log);
      });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Ăn gì đây?', component: HomePage },
      { title: 'Thông tin cá nhân', component: ProfilePage },
      { title: 'Lịch sử',component: HistoryPage}

    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  signout()
  {
      this._storage.remove('email');
      this._storage.remove('user');
        this.nav.setRoot(RunPage);

  }
}
