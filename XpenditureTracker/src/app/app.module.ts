import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

import {FirebaseService} from './firebase.service';

import { AuthService } from './auth.service';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { DashBoardPage } from '../pages/dashboard/dashboard';
import { ReportPage } from '../pages/report/report';
import { AboutPage } from '../pages/about/about';


let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

// Firebase Configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBN1deKXMuFDqwcK5rSs12NQ4JhOjZgpBI",
    authDomain: "expendituretracker.firebaseapp.com",
    databaseURL: "https://expendituretracker.firebaseio.com",
    storageBucket: "expendituretracker.appspot.com",
    messagingSenderId: "564965327209"
};

@NgModule({
  declarations: [
    MyApp,
    DashBoardPage,
    ReportPage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashBoardPage,
    ReportPage,
    AboutPage
  ],
  providers: [ 
    {
    provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseService, 
   
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
     AuthService
    ]
})
export class AppModule {}
