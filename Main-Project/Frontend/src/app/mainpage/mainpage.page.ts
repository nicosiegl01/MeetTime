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
  dislikedUsers$: Observable<User[]>;
  likedUsers$: Observable<User[]>;

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
    this.users$ = await this.http.get<User[]>("http://localhost:8080/user/getAllUsers")
  }

  dislike(){
    console.log(this.users$);
    console.log("switch");
  }

  like(){
    console.log(this.users$);
    console.log("switch");
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
