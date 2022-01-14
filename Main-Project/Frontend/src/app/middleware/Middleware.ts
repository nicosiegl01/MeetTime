/*import * as http from 'http';*/

export class Middleware {
  createUser(){
    

    // User data from input-fields
    
    fetch('http://localhost:8080/user/fname/name/mail/password/20', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).then(result => result.json())
  .then(jsonformat=>console.log(jsonformat));

  

  }
}