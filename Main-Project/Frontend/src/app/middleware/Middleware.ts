/*import * as http from 'http';*/
import { Observable, of } from "rxjs";
import { User } from '../User.model';

export class Middleware {
  createUser(fname,lname,mail,pw,age){
    // User data from input-fields
    fetch('http://130.162.254.211:8080/user/add/'+fname+'/'+lname+'/'+mail+'/'+pw+'/'+age, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).then(result => result.json())
  .then(jsonformat=>console.log(jsonformat));
  }

  addInterest(uId, iId){
    // User data from input-fields
    fetch('http://130.162.254.211:8080/interest/add/'+uId+'/'+iId, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).then(result => result.json())
  .then(jsonformat=>console.log(jsonformat));
  }

  loginUser(mail,pw){
    // User data from input-fields
    fetch('http://130.162.254.211:8080/user/'+mail+'/'+pw, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(result => result.json())
  .then(jsonformat=>console.log(jsonformat));
  }

  getAllUsers(){
    return new Promise(function(){fetch('http://localhost:8080/user/getAllUsers', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(result => result.json())
  .then(jsonformat=>console.log(jsonformat))});

  }

  async getAllUsers2(){
    let userArray:Observable<User[]>;

    const users = fetch("http://localhost:8080/user/getAllUsers")
      .then((response) => response.json())
      .then((user) => {
        return user;
      });
    const printAddress = async () => {
      const a = await users;
      let b: Observable<User[]> = of([a]);
      userArray = a;
      console.log(userArray);
      
    };
    await printAddress()
    console.log(userArray);
    
    return userArray;
  }






  
}

