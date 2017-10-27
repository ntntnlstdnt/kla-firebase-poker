import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// angular fire
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {TicketService} from './service/ticket.service';
import {AuthService} from './service/auth.service';

const firebaseConfig = {
  apiKey: 'AIzaSyDkMxqhRj9-Xr9-vqQiFYxfIAqttbk-B3I',
  authDomain: 'kla-scrum-poker.firebaseapp.com',
  databaseURL: 'https://kla-scrum-poker.firebaseio.com',
  projectId: 'kla-scrum-poker',
  storageBucket: 'kla-scrum-poker.appspot.com',
  messagingSenderId: '735057512980'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    TicketService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
