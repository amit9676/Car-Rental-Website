import { Injectable } from '@angular/core';
import { users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class TableSearchService {

  constructor() { }

  public innerFilter(item: object, searchValue: string, searchDepth: number):boolean{
    for(let prop in item){
      if(typeof(item[prop])  === 'object'){
        if(this.innerFilter(item[prop], searchValue, searchDepth + 1)){
          return true;
        };
      }
      else if((String(item[prop]).toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || 
      ((item as users).firstName + " " + (item as users).lastName).toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
       && prop != "password" && (prop != "id" || searchDepth == 1)){
        return true;
      }
    }
    return false;
  }

  public OrdersInnerFilter(item: object, searchValue: string, searchDepth: number, managerView: boolean):boolean{
    for(let prop in item){
      if(typeof(item[prop])  === 'object'){
        if(this.OrdersInnerFilter(item[prop], searchValue, searchDepth + 1, managerView)){
          return true;
        };
      }
      else if(String(item[prop]).toLowerCase().indexOf(searchValue.toLowerCase()) > -1 && ((searchDepth == 1  && prop != "actualEndDate") || (prop == "userName" && managerView) || prop == "carNum")){
        return true;
      }
      
    }
    return false;
  }


}
