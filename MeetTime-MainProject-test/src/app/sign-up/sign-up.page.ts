import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor() { }

  SignUp() {
    let emailValue = (<HTMLInputElement>document.getElementById("email")).value;
    let emailValue2 = (<HTMLInputElement>document.getElementById("confirmEmail")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let confirmPassword = (<HTMLInputElement>document.getElementById("confirmPassword")).value;
    const age = Number((<HTMLInputElement>document.getElementById("age")).value);

    if (emailValue == emailValue2 && emailValue != "" && emailValue2 != "") {
      document.querySelector("#errorWarning").innerHTML = "Email confirmed";
    }
    else if (password == confirmPassword && password != "" && confirmPassword != "" && emailValue != emailValue2 || emailValue == "" || emailValue2 == "") {
      alert("Wrong email");
      document.querySelector("#errorWarning").innerHTML = "Wrong email";
    }
    else if (emailValue != emailValue2) {
      alert("Wrong email");
    }

    if (password == confirmPassword && password != "" && confirmPassword != "") {
      alert("Password confirmed");
      password
    }
    else if (emailValue == emailValue2 && emailValue != "" && emailValue2 != "" && password != confirmPassword || password == "" || confirmPassword == "") {
      alert("Wrong password");
    }
    else if (password != confirmPassword) {
      alert("Wrong password");
    }
    if (age < 18) {
      alert("You are to young");
    }

  }

  ngOnInit() {
  }

}
