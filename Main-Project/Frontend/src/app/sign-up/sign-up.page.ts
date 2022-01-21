import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Middleware } from "../middleware/Middleware";
  
let user = new Middleware();

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(public alertController: AlertController,private router: Router) {
    this.router = router;
  }
  
  async presentAlert(msg,head) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-classs',
      header: head,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  SignUp() {
    let emailValue = (<HTMLInputElement>document.getElementById("MAIL")).value;
    //let emailValue2 = (<HTMLInputElement>document.getElementById("confirmEmail")).value;
    let password = (<HTMLInputElement>document.getElementById("PW")).value;
    let confirmPassword = (<HTMLInputElement>document.getElementById("PW2")).value;
    const age = Number((<HTMLInputElement>document.getElementById("age")).value);
    const firstname = (<HTMLInputElement>document.getElementById("firstnameInput")).value;
    const lastname = (<HTMLInputElement>document.getElementById("lastnameInput")).value;
    let errormsg = (<HTMLInputElement>document.getElementById("error")).innerHTML;
    const errHeader = "Missing Attribute"
    
    //user.createUser("test","test","test","test",22)
    if(password==""){
      this.presentAlert("You need to enter a password!",errHeader)
      errormsg = "You need to enter a password!";
      return;
    }
    if(confirmPassword==""){
      this.presentAlert("You need to enter the password a second time!",errHeader)
      return;
    }
    if(password!=confirmPassword){
      this.presentAlert("Passwords are different!",errHeader)
      return;
    }
    if(emailValue==""){
      this.presentAlert("You must enter a mail adress",errHeader)
      return;
    }
    if (age < 18) {
      this.presentAlert("You are to young",errHeader)
      return;
    }
    if(emailValue != "" && password == confirmPassword && password != "" && age >= 18 ){
      this.presentAlert('You can now login to your account','Successful Registration');
      this.router.navigate(['login-or-sign-up']);
      user.createUser(firstname,lastname,emailValue,password,age)
    }
  }

  ngOnInit() {

  }
}
