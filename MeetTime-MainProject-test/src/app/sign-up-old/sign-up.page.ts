import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(public alertController: AlertController,private router: Router) {
    this.router = router;
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


  SignUp() {
    let emailValue = (<HTMLInputElement>document.getElementById("email")).value;
    let emailValue2 = (<HTMLInputElement>document.getElementById("confirmEmail")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let confirmPassword = (<HTMLInputElement>document.getElementById("confirmPassword")).value;
    const age = Number((<HTMLInputElement>document.getElementById("age")).value);

    if (password == confirmPassword && password != "" && confirmPassword != "" && emailValue != emailValue2 || emailValue == "" || emailValue2 == "") {
      document.querySelector("#errorWarning").innerHTML = "Wrong email";
    }
    else if (emailValue != emailValue2) {
      document.querySelector("#errorWarning").innerHTML = "Wrong email";
    }
    if (emailValue == emailValue2 && emailValue != "" && emailValue2 != "" && password != confirmPassword || password == "" || confirmPassword == "") {
      document.querySelector("#errorWarning").innerHTML = "Wrong password";
    }
    else if (password != confirmPassword) {
      document.querySelector("#errorWarning").innerHTML = "Wrong password";
    }
    if (age < 18) {
      document.querySelector("#errorWarning").innerHTML = "You are to young";
    }
    if(emailValue == emailValue2 && emailValue != "" && emailValue2 != "" && password == confirmPassword && password != "" && confirmPassword != "" && age >= 18){
      this.presentAlert('You can now login to your account');
      this.router.navigate(['login-or-sign-up']);
    }
  }

  ngOnInit() {
  }

  switchToView1() {

  }

  switchToView2() {
    
  }

}
