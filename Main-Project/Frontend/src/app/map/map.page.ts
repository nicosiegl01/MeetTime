
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { __param } from 'tslib';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterViewInit {
  map;
  private circle;

  constructor() { }

  ngOnInit() {
    this.map = 1;
    console.log(this.map);
    this.getLocation();
  }

  ngAfterViewInit() {

  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  }
  
  showPosition(position) {
    // console.log(this.map);
    
    // let fname = '';
    // console.log(this.http);
    
    // let users = this.http.get<User[]>("http://130.162.254.211:3000/api/user/1")
    // users.subscribe(param => {
    //   this.users$ = param
    //   console.log(param);
    //   fname = param[0].firstname;
    //   console.log(fname);
    // });
    // console.log(this.users$);
    console.log("test");
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(position.coords.longitude);
    console.log(position.coords.latitude);
    // this.initMap(position.coords.longitude, position.coords.latitude);
    let map = L.map('map').setView([59.5, -0.05], 13);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([59.5, -0.00000000005]).addTo(map)
      .bindPopup('This is you')
      .openPopup();

    L.marker([59.5, -0.5]).addTo(map)
      .bindPopup('This is you')
      .openPopup();

    L.marker([latitude, longitude]).addTo(map)
      .bindPopup("Ich")
      .openPopup();


    let circle = L.circle([59.5, -0.00000000005], {
      color: 'grey',
      fillColor: 'grey',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(map);
  }

  initMap(longitude, latitude): void {
  }
}

