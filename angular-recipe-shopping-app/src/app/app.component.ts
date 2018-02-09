import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { apiKey, authDomain } from '../config.app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loadedFeature: string = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: apiKey,
      authDomain: authDomain
    });
  }
  
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
