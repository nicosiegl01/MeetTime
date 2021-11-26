import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilEinstellungenPage } from './profil-einstellungen.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilEinstellungenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilEinstellungenPageRoutingModule {}
