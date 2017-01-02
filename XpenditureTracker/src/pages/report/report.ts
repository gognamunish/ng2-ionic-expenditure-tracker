import { Component } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { NavController  ,ToastController, LoadingController } from 'ionic-angular';

import {FirebaseService} from '../../app/firebase.service';
import {Expenditure} from '../../app/expenditure';



@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})

export class ReportPage {

  category: string;
  categoryTotal: number;
  expenditures: Expenditure[];

  constructor(private loadingController: LoadingController, private toastCtrl: ToastController, private formBuilder : FormBuilder, private navCtrl: NavController, private firebaseService : FirebaseService) {
    
  }

   filterCategory(){
    console.log ("Filter by category: " + this.category);   
    this.firebaseService.getExpendituresByCategory(this.category).subscribe(expenditures => {
          this.expenditures = expenditures;
          this.categoryTotal = 0;
          this.expenditures.forEach (exp => {
             this.categoryTotal = Number (exp.amount) + Number (this.categoryTotal);
          });
          
      });

      

  }
  
  
}
