import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Middleware } from "../middleware/Middleware";
  
let user = new Middleware();
let mail = ""
let mailconfirm = ""
let password = ""
let passwordConfirm = ""

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

  save(){
    let mailTemp = (<HTMLInputElement>document.getElementById("email")).value;
    let mail2Temp = (<HTMLInputElement>document.getElementById("confirmEmail")).value;
    let pwTemp = (<HTMLInputElement>document.getElementById("password")).value;
    let pw2Temp = (<HTMLInputElement>document.getElementById("confirmPassword")).value;
    if(mailTemp!=""){ 
      mail = mailTemp
    }
    if(mail2Temp!=""){
      mailconfirm = mail2Temp
    }
    if(pwTemp != ""){
      password = pwTemp
    }
    if(pw2Temp != ""){
      password = pw2Temp
    }
  }


  SignUp() {
    let emailValue = (<HTMLInputElement>document.getElementById("email")).value;
    let emailValue2 = (<HTMLInputElement>document.getElementById("confirmEmail")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let confirmPassword = (<HTMLInputElement>document.getElementById("confirmPassword")).value;
    const age = Number((<HTMLInputElement>document.getElementById("age")).value);
    const firstname = (<HTMLInputElement>document.getElementById("firstnameInput")).value;
    const lastname = (<HTMLInputElement>document.getElementById("lastnameInput")).value;
    console.log('Mail:');
    console.log(emailValue);
    console.log(mail);
    

    console.log('PW:');
    console.log(password);
    console.log(password);
    
    user.createUser("test","test","test","test",22)
    
    alert(emailValue);
    if (password == confirmPassword && password != "" && emailValue != emailValue2 || emailValue == "") {
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
    else if (age < 18) {
      document.querySelector("#errorWarning").innerHTML = "You are to young";
    }
    if(emailValue == emailValue2 && emailValue != "" && password == confirmPassword && password != "" && age >= 18 ){
      this.presentAlert('You can now login to your account');
      this.router.navigate(['login-or-sign-up']);
      user.createUser(firstname,lastname,mail,password,age)
    }
  }

  ngOnInit() {
  }

  switchToView1() {

  }

  switchToView2() {
    
  }

}
