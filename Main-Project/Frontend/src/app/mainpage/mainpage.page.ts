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
  users2$: Observable<User[]>;

  @ViewChildren(IonCard,{read: ElementRef}) cards: QueryList<ElementRef>
  constructor(private router: Router,private http: HttpClient,private gestureCtrl: GestureController, private zone:NgZone, private plt: Platform) {
    this.router = router;
  }


  Login(){

  }

  switchToContactPage(){
    this.router.navigate(['profil-einstellungen']);
  }

  ngAfterViewInit(){
    console.log(this.cards);
    
    const cardArray = this.cards.toArray();
    this.useTinderSwipe(cardArray)
    console.log(cardArray);
    
  }

  ngOnInit() {
    this.users$ = this.http.get<User[]>("http://localhost:8080/user/getAllUsers")
    console.log(this.users$.forEach(data=>console.log(data)));
  }
















  useTinderSwipe(cardArray){
    console.log(cardArray.length);
    
    for (let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i]
      console.log(card+",card");
      
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
