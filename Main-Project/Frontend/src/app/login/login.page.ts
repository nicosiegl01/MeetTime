import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Middleware } from "../middleware/Middleware";
import { User } from '../User.model';
import { Observable, of } from "rxjs";
import { HttpClient, HttpClientModule } from '@angular/common/http';

let user = new Middleware();

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  ngOnInit() {
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

   let user = await this.http.get<User[]>("http://130.162.254.211:8080/user/"+emailValue+"/"+password)
   

   console.log(user);
   



    /*if(!userExists){
      this.presentAlert('This E-Mail adress is unknown!')
    }

    if(!isAllowedToSwitch){
      this.presentAlert('E-Mail and password do not match!')
    }


console.log("before switch");

    this.switchView(true)
    console.log("switch");
    
    if(isAllowedToSwitch){
      this.switchView(true)
    }

    */
   this.switchView(true)

  }

  switchView(allowed){
    this.router.navigate(['mainpage']);
  }

}
