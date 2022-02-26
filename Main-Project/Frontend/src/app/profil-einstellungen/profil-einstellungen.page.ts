import { Component, OnInit } from '@angular/core';
import { User } from '../User.model';
import { Observable, of } from "rxjs";
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    let mailAdressOfUser = localStorage.getItem('currentMail');
    console.log(mailAdressOfUser);
    
    this.user$ = await this.http.get<User>("http://localhost:8080/user/findbyMail/" + mailAdressOfUser)
    console.log(this.user$.forEach(data=>console.log(data)));

    
  }

}
