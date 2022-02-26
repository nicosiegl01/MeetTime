import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { LoginOrSignUpPageRoutingModule } from './login-or-sign-up-routing.module';

import { LoginOrSignUpPage } from './login-or-sign-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginOrSignUpPageRoutingModule,
    HttpClientModule
  ],
  declarations: [LoginOrSignUpPage]
})
export class LoginOrSignUpPageModule {}
