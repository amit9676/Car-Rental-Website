import { Injectable } from '@angular/core';
import { users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService {

  constructor() { }

  public checkUserName(allUsers: users[], userName: any, userID?: number):boolean{
    
    for(let item of allUsers){
      if(userName.toLowerCase() == item.userName.toLowerCase() && userID !=item.id){
        return false;
      }
    }
    return true;
  }

  public checkSocialNumber(allUsers: users[], socialNumber: string, userID?: number):boolean{
    
    for(let item of allUsers){
      if(socialNumber == item.socialNumber && userID !=item.id){
        return false;
      }
    }
    return true;
  }

  public checkEmail(allUsers: users[], email: string, userID?: number):boolean{
    
    for(let item of allUsers){
      if(email.toLowerCase()  == item.email.toLowerCase() && userID !=item.id){
        return false;
      }
    }
    return true;
  }
}
