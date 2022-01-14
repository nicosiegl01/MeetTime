import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilEinstellungenPageRoutingModule } from './profil-einstellungen-routing.module';

import { ProfilEinstellungenPage } from './profil-einstellungen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilEinstellungenPageRoutingModule
  ],
  declarations: [ProfilEinstellungenPage]
})
export class ProfilEinstellungenPageModule {}
