import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../Activity.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { User } from '../User.model';
import { Middleware } from "../middleware/Middleware";
import { Router } from '@angular/router';

let middleware = new Middleware();

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  /*
    SUCHE EINBAUEN!!!
    SUCHE EINBAUEN!!!
    SUCHE EINBAUEN!!!
  */
  activities$: Observable<Activity[]>;
  user$: Observable<User>;
  selected:Activity[] = []
  length:number = 0

  constructor(private http:HttpClient, private alertController:AlertController, private router:Router) { }

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

  async ngOnInit() {
    let actvitiesTemp = await this.http.get<Activity[]>("http://130.162.254.211:8080/interest/getAllInterests")
    this.activities$ = actvitiesTemp
    console.log('test');
    console.log(actvitiesTemp);
    
    actvitiesTemp.forEach(item=>console.log(item))
    this.activities$.subscribe( akt1 => {
      console.log(akt1.length);
      this.length = akt1.length
    });
    console.log(this.length);
    
  }

  isSelected(activityPara:Activity){
    /*let temp:Activity = undefined
    this.activities$.forEach(activity=>{
      console.log(activity.includes(activityPara));
    })
  return true;*/
return false;
  }

  check(name:string){
    console.log(name);
    
    let tempA:Activity = undefined
    let index = 0;
    this.activities$.subscribe( akt1 => {
      console.log(akt1);
      
        akt1.forEach(element=>{
          let isIn:Boolean = false;
          //console.log(element);
          if(element.name==name){ 
            this.selected.forEach(element2=>{
              console.log(name);
              console.log(element2.name);
              
              
              if(element2.name==name){
                isIn = true
              }else{
                isIn = false;
              }
            })
            
            if(!isIn){
              console.log('NOT in');
              if(this.selected.length<5){
                this.selected.push(element)
              }else{
                this.presentAlert('You can just select 5 elements','Activity Limit')
              }
            } else {
              console.log('already in');
              
              let finalIndex = 0
              let tempIndex = 0;
              this.selected.forEach(elem=>{
                if(elem.name==name){
                  finalIndex = tempIndex
                }
                tempIndex++
              })
              console.log(finalIndex);
              
              this.selected.splice(finalIndex,1)
            }// /interest/userId/interestId
            return;
          }
          index++
          console.log(this.selected);
        })
      
        

    });
     console.log(this.selected);
    }

    async complete(){
      if(this.selected.length<=2){
        let tempLen = this.selected.length
        this.presentAlert('You need to enter at least 3 activities and you entered ' + tempLen,'Not Finished Yet')
        return;
      }

      //await middleware.createUser(localStorage.getItem('firstnameSignUp'),localStorage.getItem('lastnameSignUp'),localStorage.getItem('mailSignUp'),localStorage.getItem('passwordSignUp'),localStorage.getItem('ageSignUp'));
      let a = ""
      this.http.post("http://130.162.254.211:8080/user/"+localStorage.getItem('firstnameSignUp')+"/"+localStorage.getItem('lastnameSignUp')+"/"+localStorage.getItem('mailSignUp')+"/"+localStorage.getItem('passwordSignUp')+"/"+localStorage.getItem('ageSignUp') , {})
      this.setActivities()
      //let user = await this.http.get<Activity[]>("http://130.162.254.211:8080/interest/getAllInterests")
      //let user = 
    }

    async setActivities(){
      let mail = localStorage.getItem('mailSignUp')
      this.user$ = await this.http.get<User>("http://130.162.254.211:8080/user/findbyMail/"+mail)
      let id = 0;
      
      await this.user$.forEach(elem=>{
        console.log(elem);
        
        id = elem.id;
        
      })

      for (let i = 0; i < this.selected.length; i++) {
        const iId = this.selected[i].id;
        console.log(iId);
        console.log(id);
        
        this.http.post("http://130.162.254.211:8080/interest/add/"+mail , {})
        await middleware.addInterest(id, iId)
      }

      this.router.navigate(['mainpage'])
    }
}
