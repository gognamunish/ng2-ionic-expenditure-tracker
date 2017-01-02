import {Injectable} from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';

import {Expenditure} from './expenditure';

@Injectable()
export class FirebaseService{

    expenditures: FirebaseListObservable<Expenditure[]>;
    
    constructor(private angularFire: AngularFire){
        console.log ("Angular Fire Service initialized");
    }
    
    getExpendituresByCategory(category: string = null){     
        console.log ("Loading by category: " + category);  
        if(category != null){
            this.expenditures = this.angularFire.database.list('/expenditures', {
                query: {
                    orderByChild: 'category',
                    equalTo: category,
                }
            }) as 
            FirebaseListObservable<Expenditure[]>
        } else {
            this.expenditures = this.angularFire.database.list('/expenditures') as FirebaseListObservable<Expenditure[]>
        }

        return this.expenditures;
    }

    getExpendituresBySegment(daysToConsider: string){
      let days ;
        switch (daysToConsider) {
            case "This Week":
                    days = -7;
                    break;
            case "This Month":
                days = -31;
                break;
             case "All Time":
                days = -999;
                break;    
             default:
                days = -1;
        }

       let startDate = new Date(new Date().getTime() + days*24*60*60*1000); 
       console.log ("Start Date : " + startDate);
       
        this.expenditures = this.angularFire.database.list('/expenditures', {
                query: {
                    orderByChild: 'created_on',
                    startAt : startDate.toISOString(),
                    endAt: new Date().toISOString()
                }
            }) as  FirebaseListObservable<Expenditure[]>
       
        return this.expenditures;
    }
    
     addExpenditure(newExpenditure){
        return this.expenditures.push(newExpenditure);
    }

      deleteExpenditure(key : string){
        return this.expenditures.remove(key);
        }
    
    
}