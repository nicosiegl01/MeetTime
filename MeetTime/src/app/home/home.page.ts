import { Component, ElementRef, NgZone, QueryList, ViewChildren } from '@angular/core';
import { Gesture, GestureController, IonCard, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  people = [
    {
      name:'Elias Ganglberger',
      img:'https://image.geo.de/30105672/t/aP/v3/w1440/r1.7778/-/teaser-jpg--58653-.jpg',
      power: 0
    },
    {
      name:'Meister Eder',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK9gqFKRn28xKHD1CAbEevdzsLmsv5yQkGnQ&usqp=CAU',
      power: 0
    },
    {
      name:'Mia Mandel',
      img: 'https://st3.depositphotos.com/1037987/15097/i/600/depositphotos_150975580-stock-photo-portrait-of-businesswoman-in-office.jpg',
      power: 0
    },
    {
      name:'Magnus Neidhat',
      img: 'https://i.ds.at/O7XSPQ/rs:fill:750:0/plain/2021/08/25/cook.jpeg',
      power: 0
    },
    {
      name:'Nico Siegl',
      img: 'https://www.onlinepc.ch/img/6/0/2/7/6/6/jeff-williams-apple_w640_h480.jpg',
      power: 0
    }
  ];

  @ViewChildren(IonCard,{read: ElementRef}) cards: QueryList<ElementRef>
  longPressActive = false;
  constructor(private gestureCtrl: GestureController, private zone:NgZone, private plt: Platform) {}



  ngAfterViewInit(){
    const cardArray = this.cards.toArray();

    // this.useLongPress(cardArray)
    this.useTinderSwipe(cardArray)
  }

  useLongPress(cardArray){
    for (let i = 0; i < cardArray.length; i++) {
      const card = cardArray[i]
      console.log('Card: ', card)
      const gesture: Gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        threshold: 15,
        gestureName: 'long-press',
        onStart: event => {
          this.longPressActive = true;
          this.increasePower(i)
        },
        onEnd: event=>{
          this.longPressActive = false;
        }
      }, true);
      gesture.enable(true )
    }
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

  increasePower(i) {
    console.log('increase')
    setTimeout(()=>{
      if(this.longPressActive ){
        this.zone.run(()=>{
          this.people[i].power++
          this.increasePower(i);
        });
      }
    },2000)
  }

}
