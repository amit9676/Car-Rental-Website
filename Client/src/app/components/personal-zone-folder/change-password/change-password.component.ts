import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/models/users';
import { DataShareService } from 'src/app/services/data-share.service';
import { ServerService } from 'src/app/services/server.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public myUser: users;

  public currentPassword: string;

  public newPassword: string;
  public confirmPassword: string;

  public matchingCurrentPassword = false;
  public matchingNewPasswords = false;
  public hashConvert = new Md5();

  public loadPage = true;

  constructor(private dataShare: DataShareService, private serverServcie: ServerService) { }

  ngOnInit() {
    this.dataShare.currentUser.subscribe(user => {this.myUser = user;});
  }

  public compareNewPassword(){
    if(Md5.hashStr(this.currentPassword) === this.myUser.password.toLowerCase()){
      this.matchingCurrentPassword = true;
    }
    else{
      this.matchingCurrentPassword = false;
    }
  }

  public compareNewPasswords(){
    if(this.newPassword === this.confirmPassword){
      this.matchingNewPasswords = true;
    }
    else{
      this.matchingNewPasswords = false;
    }
  }

  public changePassword(){
    
    this.myUser.password = Md5.hashStr(this.newPassword).toString();
    this.loadPage = false;
    this.serverServcie.updateUserPassword(this.myUser).subscribe(() => 
    {
      alert("הסיסמא שונתה.");
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.loadPage = true;
      localStorage.setItem("loggedUser", JSON.stringify(this.myUser));
    },
    () => {
      alert("חלה שגיאה בעדכון הפרטים, נא נסה שנית.");
      this.myUser.password = this.currentPassword;
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.loadPage = true;
    });
  }



}
