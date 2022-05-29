import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { Observable, of } from "rxjs";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Activity } from '../Activity.model';

@Component({
  selector: 'app-profil-einstellungen',
  templateUrl: './profil-einstellungen.page.html',
  styleUrls: ['./profil-einstellungen.page.scss'],
})
export class ProfilEinstellungenPage implements OnInit {
  user$: Observable<User>;
  aktivitys$: Observable<Activity[]>

  firstname: Observable<string>;
  lastname: Observable<string>;
  mailAdress: Observable<string>;
  password: Observable<string>;
  age: Observable<number>;
  activities = [];

  constructor(private http: HttpClient,private router: Router) { 
    this.router = router;
  }

  async ngOnInit() {
    console.log('init');
    
    let mailAdressOfUser = localStorage.getItem('mailSignUp');
    let userId = 0;
    console.log(mailAdressOfUser);
    
    this.user$ = await this.http.get<User>("http://130.162.254.211:8080/user/findbyMail/" + mailAdressOfUser)
    await this.user$.forEach(data=>{
      userId = data.id
      console.log(data)
    });

    let temp = await this.http.get<Activity[]>("http://130.162.254.211:8080/user/getUserInterests/" + userId)
    this.aktivitys$ = temp
  }

  

  update(){
    let firstname = (<HTMLTextAreaElement>document.getElementById("firstname")).value;
    let lastname = (<HTMLTextAreaElement>document.getElementById("lastname")).value;
    let mail;
    let password = (<HTMLTextAreaElement>document.getElementById("firstname")).value;
    let age = new Date()//(<HTMLTextAreaElement>document.getElementById("firstname")).value;
    this.user$.forEach(item=>{
      age = item.birthdate;
      password = item.password;
      if(firstname==""){
        firstname = item.firstname
      }
      if(lastname==""){
        lastname = item.lastname
      }
      if(mail==""){
        mail = item.email;
      }
    });
    
    if(firstname==""){

    }

    this.http.put("http://130.162.254.211:8080/user/"+firstname+"/"+lastname+"/"+mail+"/"+password+"/"+age,null)
    this.router.navigate(['mainpage']);

    console.log('updated');
    
  }

  cancel(){
    this.router.navigate(['mainpage']);
  }

  async delete(akt:Activity){
    let userId = 0;
    console.log('del');
    
    await this.user$.forEach(elem=>{
      console.log(elem.id);
      userId = elem.id
    })
    console.log(akt.id);
    
    let num = await this.http.delete("http://130.162.254.211:8080/interest/delete/"+userId+"/"+akt.id);
    num.forEach(element => {
      console.log(element.valueOf())
    });
    location.reload()
  }
}
