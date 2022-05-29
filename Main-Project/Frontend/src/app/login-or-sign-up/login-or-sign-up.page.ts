import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from '../User';
import { Observable, of } from "rxjs";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-or-sign-up',
  templateUrl: './login-or-sign-up.page.html',
  styleUrls: ['./login-or-sign-up.page.scss'],
})
export class LoginOrSignUpPage implements OnInit {
  userDoesExist = false;
  constructor(public alertController: AlertController,private router: Router,private http: HttpClient) {
    this.router = router;
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Wrong Input',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async Login(){

    

    let emailValue = (<HTMLInputElement>document.getElementById("email")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let isAllowedToSwitch = false;
    let userExists = false;

    /*  Hier Datenbankabfrage ob es die Email überhaupt gibt
      Danach überprüfen ob das passwort und die email übereinstimmen
    */

      if(emailValue == ""){
        this.presentAlert('Please enter an E-Mail Address!')
        return;
       }
    
       if(password == ""){
        this.presentAlert('Please enter a password!')
        return;
       }
    
       let user = await this.http.get<User>("http://130.162.254.211:3000/api/user/getByMail/"+emailValue)
       user.subscribe(userParam=>{
         localStorage.setItem("mail",userParam.email)
         localStorage.setItem("fname",userParam.firstname)
         localStorage.setItem("lname",userParam.lastname)
         localStorage.setItem("id",userParam.id+"")
         //localStorage.setItem("lat",userParam.latitude + "")
         //localStorage.setItem("long",userParam.longitude + "")
         //localStorage.setItem("id",userParam.id + "")

       })
       console.log(user.forEach(data=>console.log(data)));
       console.log(this.userDoesExist);
       this.userDoesExist = true
       


       
    if(!this.userDoesExist){
      this.presentAlert('Email or Password is not correct')
      return
    }else{
      isAllowedToSwitch = true;
      localStorage.setItem('mailSignUp', emailValue);
    }

    if(isAllowedToSwitch){
      this.playSound()
      this.switchView(true)
    }

  }

  switchView(allowed){
    this.router.navigate(['mainpage']);
  }

  signUpBtn() {
    this.router.navigate(['sign-up']);
  }

  loginBtn() {
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

  private playSound() {
    /*var player = require('play-sound')
    player.play('../../assets/sounds/login.mp3', function(err){
      if (err) throw err
    })*/

    let audio = new Audio();
    audio.src = "../../assets/sounds/login.mp3";
    audio.load();
    audio.play();

  }
}

