/*import * as http from 'http';*/

export class Middleware {
  createUser(fname,lname,mail,pw,age){
    // User data from input-fields
    fetch('http://localhost:8080/user/'+fname+'/'+lname+'/'+mail+'/'+pw+'/'+age, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).then(result => result.json())
  .then(jsonformat=>console.log(jsonformat));
  }
}