import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login-or-sign-up',
  templateUrl: './login-or-sign-up.page.html',
  styleUrls: ['./login-or-sign-up.page.scss'],
})
export class LoginOrSignUpPage implements OnInit {

  constructor(public alertController: AlertController,private router: Router) {
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

  Login(){
    this.playSound()

    let emailValue = (<HTMLInputElement>document.getElementById("email")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    let isAllowedToSwitch = true;
    let userExists = true;

    /*  Hier Datenbankabfrage ob es die Email überhaupt gibt
      Danach überprüfen ob das passwort und die email übereinstimmen
    */

    if(!userExists){
      this.presentAlert('This E-Mail adress is unknown!')
    }

    if(!isAllowedToSwitch){
      this.presentAlert('E-Mail and password do not match!')
    }

    this.switchView(true)
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

