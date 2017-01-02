import { Component } from '@angular/core';
import { SMS ,CallNumber,InAppBrowser ,EmailComposer} from 'ionic-native';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
   
  }

  email (){
    console.log ("preparing email");
    EmailComposer.isAvailable().then((available: boolean) =>{
   if(available) {
     //Now we know we can send
   }
});

let email = {
  to: 'gognamunish@gmail.com',
  cc: 'sps1997@gmail.com',
  subject: 'Great App ',
  body: 'Your app is wonderful',
  isHtml: true
};

// Send a text message using default options
EmailComposer.open(email);
}

  openTwitter (){
     new InAppBrowser('https://twitter.com/MunishGogna', '_blank');
  }

  call (){
    console.log ("Calling Munish");
    CallNumber.callNumber("98312848", true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  sms (){
      console.log ("Sending SMS");
     SMS.send('98312848', 'Hey Munish great job');
  }

}
