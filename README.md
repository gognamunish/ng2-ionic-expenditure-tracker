# ionic-expenditure-tracker
> An Ionic App backed by Firebase database meant for tracking Expenditure (beginners)

<img src="https://github.com/gognamunish/ionic-expenditure-tracker/blob/master/XpenditureTracker/resources/github/home.png" height="40%" width="40%" />

### iOS Packaging
```
ionic build ios
ionic build android

Refer to https://ionicframework.com/docs/v2/setup/deploying/ for detailed steps

```

### Accessing using Browser
ionic serve
http://localhost:8100/


### Firebase Database 

I have checked in my own configuration, in case you want to create your own database, create a collection named 'expenditures' 

<a href="https://console.firebase.google.com/" target="_blank">https://console.firebase.google.com/</a>

```js
// Replace this Firebase Configuration with your own, if you are lazy than ignore
export const firebaseConfig = {
    apiKey: "AIzaSyBN1deKXMuFDqwcK5rSs12NQ4JhOjZgpBI",
    authDomain: "expendituretracker.firebaseapp.com",
    databaseURL: "https://expendituretracker.firebaseio.com",
    storageBucket: "expendituretracker.appspot.com",
    messagingSenderId: "564965327209"
};

```
