import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginOrSignUpPage } from './login-or-sign-up.page';

const routes: Routes = [
  {
    path: '',
    component: LoginOrSignUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginOrSignUpPageRoutingModule {}
