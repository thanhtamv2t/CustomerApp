import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotactivePage } from './notactive';

@NgModule({
  declarations: [
    NotactivePage,
  ],
  imports: [
    IonicPageModule.forChild(NotactivePage),
  ],
})
export class NotactivePageModule {}
