import { Storage } from '@ionic/storage';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';



// Avoid name not found warnings
declare var Auth0Lock: any;


@Injectable()
export class AuthService {

  lock = new Auth0Lock('714k6LHmMy4b9pfBJmX9J87HB6wHQZdM', 'gognamunish.auth0.com', {
    auth: {
      redirect: false,
      params: {
        scope: 'openid offline_access',
      }
    }
  });

  storage: Storage = new Storage();
   user: Object;
   idToken: string;
  
  constructor(private authHttp: AuthHttp) {
    
    // Check if there is a profile saved in local storage
    this.storage.get('profile').then(profile => {
      this.user = JSON.parse(profile);

        console.log ("loaded from storage");
        console.log(this.user);

    }).catch(error => {
      console.log(error);
    });

    this.storage.get('id_token').then(token => {
        console.log ("loaded id from storage" + token);
      this.idToken = token;
    });

    this.lock.on('authenticated', authResult => {
      
      console.log (">>>>>>" + authResult.idToken);

      this.storage.set('id_token', authResult.idToken);
      this.idToken = authResult.idToken;

      

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        profile.user_metadata = profile.user_metadata || {};
        this.storage.set('profile', JSON.stringify(profile));
        this.user = profile;
      });

    
      this.storage.set('refresh_token', authResult.refreshToken);
     

    });    
  }

  public authenticated() { 
    return this.idToken != null;
  }
  
  public login() {
    console.log("logging in user");
    console.log(this.user);
    this.lock.show();
  }
  
  public logout() {
    console.log("logging out user");  
    this.storage.remove('profile');
    this.storage.remove('id_token');
    this.idToken = null;
    this.storage.remove('refresh_token');
  }
  }