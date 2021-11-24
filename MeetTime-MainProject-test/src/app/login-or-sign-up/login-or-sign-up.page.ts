import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-or-sign-up',
  templateUrl: './login-or-sign-up.page.html',
  styleUrls: ['./login-or-sign-up.page.scss'],
})
export class LoginOrSignUpPage implements OnInit {

  constructor(private router: Router) {
    this.router = router;
  }

  signUpBtn() {
    this.router.navigate(['sign-up']);
  }

  loginBtn() {
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }
}

