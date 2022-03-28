import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityPageRoutingModule } from './activity-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivityPage } from './activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ActivityPage]
})
export class ActivityPageModule {}
