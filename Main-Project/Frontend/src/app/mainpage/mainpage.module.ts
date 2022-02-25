import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, NgZone, QueryList, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { MainpagePageRoutingModule } from './mainpage-routing.module';

import { MainpagePage } from './mainpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainpagePageRoutingModule,
    HttpClientModule,
  ],
  declarations: [MainpagePage]
})
export class MainpagePageModule {}
