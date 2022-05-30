import { Component, OnInit, NgZone, QueryList, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Middleware } from "../middleware/Middleware";
import { User } from '../User';
import { Observable, of } from "rxjs";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import { Activity } from '../Activity.model';
import { MatchResponse } from '../MatchResponse';


let middleware = new Middleware();

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.page.html',
  styleUrls: ['./mainpage.page.scss'],
})
export class MainpagePage implements OnInit,AfterViewInit{
  usersToBePresentated:User[] = [];
  users$:User[] = [];
  dislikedUsers: User[] = [];
  likedUsers: User[] = [];
  userArray:Promise<User[]>
  userObjectArray:User[]

  @ViewChildren('divs',{read: ElementRef}) cards: QueryList<ElementRef>
  constructor(private userS:UserService,private router: Router,private http: HttpClient,private gestureCtrl: GestureController, private zone:NgZone, private plt: Platform) {
    this.router = router;
  }

  switchToContactPage(){
    this.router.navigate(['profil-einstellungen']);
  }

  switchToMapPage(){
    this.router.navigate(['map']);
  }

  async ngAfterViewInit(){
    let x = await this.delay(500);
    console.log(this.cards);

    const cardArray = this.cards.toArray();
    this.useTinderSwipe(cardArray)
    console.log(cardArray);
  }
  
  async delay(delayInms) {
    return new Promise(resolve  => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

  async ngOnInit() {
    //let tempUsers = await this.http.get<User[]>("http://130.162.254.211:8080/user/getAllUsers")
    //console.log(tempUsers);
    
    // @TODO Users need to be randomized before
    
/*
private _id: number,
      private _firstname: string,
      private _lastname: string,
      private _mail: string,
      private _password: string,
      private _age: number
*/

    let user = [
      
    ]
    
    //this.users$ = tempUsers
    //this.users$ = new Observable<User[]>()
    let users = this.http.get<User[]>("http://130.162.254.211:3000/api/user/getAll")
    users.subscribe(param=>{
      this.users$ = param
      console.log(param);
      
    })

    /* this.userS.getUsers().subscribe(param=>{
      this.users$ = param
      console.log(param);
      
    }) */
    console.log(this.users$);
    
    
  }

  dislike(){
    this.users$.shift()
    console.log(this.users$[0]);
    console.log('dislike');
    
    console.log(this.users$);
    
  }

  like(){
    console.log(this.users$[0]);
    this.likedUsers.push(this.users$[0])
    console.log(this.likedUsers);
    console.log('like');
    
    let temp:User = this.users$.shift()
    console.log(temp.id);
    console.log(localStorage.getItem('id'));
    
    
    
    let temp2 = this.http.post<MatchResponse>("http://130.162.254.211:3000/api/match", {
        "userLiking": Number(localStorage.getItem('id')),
        "userLiked": temp.id
    });

    temp2.subscribe(x=>{
      console.log(x);
      
    })
    
  }


  getActivities(uId:number):Activity[]{
    console.log(uId);
    
    let activities:Activity[] = []
    let temp = this.http.get<Activity[]>('http://130.162.254.211:3000/api/user/findInterestsFrom/'+uId);
    temp.subscribe(param=>{
      activities = param
      console.log(param);
      
    })
    return activities
  }


  getAge(user:User){
    var today = new Date();
    var birthDate = new Date(user.birthdate)
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }




















  useTinderSwipe(cardArray){
    console.log('test123');
    
    for (let i = 0; i < cardArray.length; i++) {
      console.log(i);
      
      const card = cardArray[i]
      const gesture: Gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        threshold: 15,
        gestureName: 'swipe',
        onStart: event => {

        },
        onMove: event => {
          card.nativeElement.style.transform = `translateX(${event.deltaX}px) rotate(${event.deltaX/10}deg)`
        },
        onEnd: event=>{
          card.nativeElement.style.transition = '.5s ease-out';
          console.log("in gesture");
          
          if(event.deltaX>150){
            console.log('test1');
            card.nativeElement.style.transform = `translateX(${+this.plt.width()*2}px) rotate(${event.deltaX / 2}deg)`
          } else if(event.deltaX<-150){
            console.log('test2');
            card.nativeElement.style.transform = `translateX(-${+this.plt.width()*2}px) rotate(${event.deltaX / 2}deg)`
          }else{
            console.log('test3');
            card.nativeElement.style.transform = ''
          }
        }
      }, true);
      
      gesture.enable(true)
      console.log(gesture);

    }
  }

}
