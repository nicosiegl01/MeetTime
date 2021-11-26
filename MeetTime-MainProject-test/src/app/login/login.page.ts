import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  ngOnInit() {
  } 

  Login(){
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

}
