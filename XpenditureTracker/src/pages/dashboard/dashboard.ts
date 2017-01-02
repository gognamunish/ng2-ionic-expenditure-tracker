import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NavController  ,ToastController, LoadingController } from 'ionic-angular';

import {FirebaseService} from '../../app/firebase.service';
import {Expenditure} from '../../app/expenditure';
import { AuthService } from '../../app/auth.service';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [FirebaseService]
})

export class DashBoardPage  implements OnInit{

  loading;
  daysToConsider:string = "Today";
  recentItemsTotal: number;
  expenditureForm : FormGroup;
  newInProgress : boolean;
  expenditures: Expenditure[];

  constructor(private auth: AuthService, private loadingController: LoadingController, private toastCtrl: ToastController, private formBuilder : FormBuilder, private navCtrl: NavController, private firebaseService : FirebaseService) {
    this.newInProgress = false;
  }

    ngOnInit(){
        this.initializeForm();
        this.loadExpenditures();
      } 

loadExpenditures (){
  
    this.firebaseService.getExpendituresBySegment(this.daysToConsider).subscribe(expenditures => {
          this.expenditures = expenditures;
          this.recentItemsTotal = 0;
          this.expenditures.forEach (exp => {
             this.recentItemsTotal = Number (exp.amount) + Number (this.recentItemsTotal);
          });
      });
   }

  initializeForm (){
   this.expenditureForm = this.formBuilder.group({    
            category: new FormControl('GENERAL', [<any>Validators.required]),
            amount: new FormControl('', [<any>Validators.required]),
            description: new FormControl('', []),
            created_by: new FormControl('#sachinshah', []),
            created_on: new FormControl(new Date().toISOString(), [<any>Validators.required])
        });
  }

  doRefresh(refresher) {
      console.log('Begin async operation', refresher);
      this.initializeForm();
      this.loadExpenditures();
      refresher.complete();
  }


  addNewExpenditure (){
    console.log ("new expenditure event");
    this.newInProgress = true;
    this.initializeForm();
  }

  cancelNew(){
     console.log ("canceling expenditure event");
    this.newInProgress = false;
  }

  saveExpenditure (expenditure: Expenditure){
    console.log ("save expenditure: " + expenditure);

   let toast = this.toastCtrl.create({
        message: 'Expenditure Saved successfully',
        duration: 3000,
        position : 'middle'
    });

    toast.present();
    this.firebaseService.addExpenditure(expenditure);
    this.firebaseService.getExpendituresBySegment(this.daysToConsider).subscribe(expenditures => {
          this.expenditures = expenditures;
          this.recentItemsTotal = 0;
          this.expenditures.forEach (exp => {
             this.recentItemsTotal = Number (exp.amount) + Number (this.recentItemsTotal);
          });
      });


    this.newInProgress = false;
    toast.dismiss();
  }

  deleteExpenditure (expenditure: Expenditure){
    console.log ("delete expenditure: " + expenditure);

    let toast = this.toastCtrl.create({
        message: 'Expenditure Deleted successfully',
        duration: 2000,
        position : 'middle',
        cssClass : 'toastStyle'
    });
 

    toast.present(); 
    this.firebaseService.deleteExpenditure(expenditure.$key);
    toast.dismiss(); 
  }

  filterBySegment (){
      this.firebaseService.getExpendituresBySegment(this.daysToConsider).subscribe(expenditures => {
          this.expenditures = expenditures;
          this.recentItemsTotal = 0;
          this.expenditures.forEach (exp => {
             this.recentItemsTotal = Number (exp.amount) + Number (this.recentItemsTotal);
          });
      });

        let toast = this.toastCtrl.create({
        message: 'Now Showing - ' + this.daysToConsider,
        duration: 1000,
        position : 'bottom'
    });

    toast.present();
  }

}
