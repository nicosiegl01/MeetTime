import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  progress = 0;
  bufferProgress = 0;
  constructor(private router : Router) {
    // setInterval(() => {
    //   this.bufferProgress += .1;
    //   this.progress += .1;
    // }, 800);
    const testIntervall = setInterval(() => {
      this.router.navigate(['login-or-sign-up']);
    }, 1500);

    let n: ReturnType<typeof setTimeout>;
    n = setTimeout(()=>clearInterval(testIntervall), 1500);
  }
}
