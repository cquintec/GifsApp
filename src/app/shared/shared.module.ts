import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomePageComponent } from '../gifs/pages/home/home-page.component';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,

  ],
  exports:[
    SidebarComponent
  ]
})
export class SharedModule { }
