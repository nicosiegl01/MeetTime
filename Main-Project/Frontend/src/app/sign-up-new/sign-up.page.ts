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
    console.log(age);
    

    if (password == confirmPassword && password != "" && confirmPassword != "" && emailValue != emailValue2 || emailValue == "" || emailValue2 == "") {
      this.presentAlert('Wrong E-Mail!');
      alert("1")
    }
    else if (emailValue != emailValue2) {
      this.presentAlert('E-Mails are different!');
      alert("2")
    }
    if (emailValue == emailValue2 && emailValue != "" && emailValue2 != "" && password != confirmPassword || password == "" || confirmPassword == "") {
      this.presentAlert('Wrong password!');
      alert("3")
    }
    else if (password != confirmPassword) {
      this.presentAlert('Passwords are different!');
      alert("4")
    }
    if (age < 18) {
      this.presentAlert('You have to be at least 18 years old!');
      alert("5")
    }
    if(emailValue == emailValue2 && emailValue != "" && emailValue2 != "" && password == confirmPassword && password != "" && confirmPassword != "" && age >= 18){
      this.presentAlert('SignUp was successful!');
      this.router.navigate(['login-or-sign-up']);
      alert("correct")
    }
  }

  ngOnInit() {
  }

  switchToView1() {

  }

  switchToView2() {
    
  }

}
