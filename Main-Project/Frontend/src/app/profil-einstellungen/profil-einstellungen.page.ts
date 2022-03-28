import { Component, OnInit } from '@angular/core';
import { User } from '../User.model';
import { Observable, of } from "rxjs";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-einstellungen',
  templateUrl: './profil-einstellungen.page.html',
  styleUrls: ['./profil-einstellungen.page.scss'],
})
export class ProfilEinstellungenPage implements OnInit {
  user$: Observable<User>;
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
    
    let mailAdressOfUser = localStorage.getItem('currentMail');
    console.log(mailAdressOfUser);
    
    this.user$ = await this.http.get<User>("http://localhost:8080/user/findbyMail/" + mailAdressOfUser)
    console.log(this.user$.forEach(data=>console.log(data)));
  }

  

  update(){
    let firstname = (<HTMLTextAreaElement>document.getElementById("firstname")).value;
    let lastname = (<HTMLTextAreaElement>document.getElementById("lastname")).value;
    let mail;
    let password = (<HTMLTextAreaElement>document.getElementById("firstname")).value;
    let age = 0//(<HTMLTextAreaElement>document.getElementById("firstname")).value;
    this.user$.forEach(item=>{
      age = item.age;
      password = item.password;
      if(firstname==""){
        firstname = item.firstname
      }
      if(lastname==""){
        lastname = item.lastname
      }
      if(mail==""){
        mail = item.mail;
      }
    });
    
    if(firstname==""){

    }

    this.http.put("http://localhost:8080/user/"+firstname+"/"+lastname+"/"+mail+"/"+password+"/"+age,null)
    this.router.navigate(['mainpage']);

    console.log('updated');
    
  }

  cancel(){
    this.router.navigate(['mainpage']);
  }

}
