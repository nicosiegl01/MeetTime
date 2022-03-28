import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../Activity.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  activities$: Observable<Activity[]>;

  constructor(private http:HttpClient) { }

  async ngOnInit() {
    let actvitiesTemp = await this.http.get<Activity[]>("http://localhost:8080/interest/getAllInterests")
    this.activities$ = actvitiesTemp
    console.log('test');
    console.log(actvitiesTemp);
    
    actvitiesTemp.forEach(item=>console.log(item))
  }

}
