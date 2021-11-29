import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.page.html',
  styleUrls: ['./mainpage.page.scss'],
})
export class MainpagePage implements OnInit {

  constructor(private router: Router) {
    this.router = router;
  }

  Login(){
    
  }

  switchToContactPage(){
    this.router.navigate(['profil-einstellungen']);
  }

  ngOnInit() {
    
  }

}
