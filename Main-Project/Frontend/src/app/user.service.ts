import { Injectable } from '@angular/core';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUsers():User[]{
    let users:User[] = [
      new User(-1,'Max','Muster','muster@gmx.at','123',19),
      new User(-1,'Kaartin','Maar','kaar@gmail.com','123',25),
      new User(-1,'Manuel','Neid','neidi@gmx.at','123',31),
      new User(-1,'El','Geng','elia12345@gmail.com','123',22),
      new User(-1,'Maxi','EderEder','eder@gmx.at','123',28)
    ]

    return users
  }
}
