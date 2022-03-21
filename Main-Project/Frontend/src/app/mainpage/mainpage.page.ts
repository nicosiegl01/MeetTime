import { Component, OnInit, NgZone, QueryList, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Middleware } from "../middleware/Middleware";
import { User } from '../User.model';
import { Observable, of } from "rxjs";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';


let middleware = new Middleware();

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.page.html',
  styleUrls: ['./mainpage.page.scss'],
})
export class MainpagePage implements OnInit,AfterViewInit{
  usersToBePresentated:User[] = [];
  users$: Observable<User[]>;
  dislikedUsers: User[];
  likedUsers: User[];
  userArray:Promise<User[]>
  userObjectArray:User[]

  @ViewChildren(IonCard,{read: ElementRef}) cards: QueryList<ElementRef>
  constructor(private router: Router,private http: HttpClient,private gestureCtrl: GestureController, private zone:NgZone, private plt: Platform) {
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
    let tempUsers = await this.http.get<User[]>("http://localhost:8080/user/getAllUsers")
    
    // @TODO Users need to be randomized before
    

    
    this.users$ = tempUsers
  }

  dislike(){
    this.userArray = this.users$.toPromise()
    this.userArray.then((val) => this.userObjectArray = val);
    
    let user = this.userObjectArray.pop()
    console.log(user);
    console.log(this.userObjectArray);
    window.location.reload();
  }

  like(){
    console.log();
    
    console.log(this.users$);
  }








  useTinderSwipe(cardArray){
    for (let i = 0; i < cardArray.length; i++) {
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
      gesture.enable(true )
    }
  }

}
