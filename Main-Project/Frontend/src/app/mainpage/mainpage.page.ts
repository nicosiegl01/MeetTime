import { Component, OnInit, NgZone, QueryList, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Middleware } from "../middleware/Middleware";
import { User } from '../User.model';
import { Observable, of } from "rxjs";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';
import { UserService } from '../user.service';
import { Activity } from '../Activity.model';


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
    let tempUsers = await this.http.get<User[]>("http://130.162.254.211:8080/user/getAllUsers")
    console.log(tempUsers);
    
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
    this.users$ = this.userS.getUsers()
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
    
    this.users$.shift()
  }


  getActivities(actId:number):Activity[]{
    let activities:Activity[] = []
    let temp = this.http.get<Activity[]>('http://130.162.254.211:8080/user/getUserInterests/'+actId);
    temp.subscribe(param=>{
      activities = param
    })
    return activities
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
            card.nativeElement.style.transform = `translateX(${+this.plt.width()*2}px) rotate(${event.deltaX / 2}deg)`
          } else if(event.deltaX<-150){
            card.nativeElement.style.transform = `translateX(-${+this.plt.width()*2}px) rotate(${event.deltaX / 2}deg)`
          }else{
            card.nativeElement.style.transform = ''
          }
        }
      }, true);
      gesture.enable(true)
    }
  }

}
