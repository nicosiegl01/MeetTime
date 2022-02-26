import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from '../User.model';
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
    this.playSound()

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
    
       let user = await this.http.get<boolean>("http://localhost:8080/user/"+emailValue+"/"+password)
       console.log(user.forEach(data=>console.log(data)));
       await user.forEach(data=>this.userDoesExist=data);
       console.log(this.userDoesExist);
       


       
    if(!this.userDoesExist){
      this.presentAlert('Email or Password is not correct')
      return
    }else{
      isAllowedToSwitch = true;
      localStorage.setItem('currentMail', emailValue);
    }

    if(isAllowedToSwitch){
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

