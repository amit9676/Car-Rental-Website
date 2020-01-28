import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/models/users';
import { userGender } from 'src/app/models/userGender';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import { userRank } from 'src/app/models/userRank';
import { UserHandlerService } from 'src/app/services/user-handler.service';
import { ImagesHandlerService } from 'src/app/services/images-handler.service';
import { DatesManagerService } from 'src/app/services/dates-manager.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public isFuture =  false;
  public user = new users();

  public allUsers: users[] = [];

  public validatedUserName = true;
  public validatedSocialNumber = true;
  public validatedEmail = true;
  public files: File = null;
  public loadPage = false;
  public errorPage = false;

  public genders = [new userGender(1,"זכר"), new userGender(2,"נקבה")];


  constructor(private serverService: ServerService, private router: Router, private DataShare: DataShareService,
    public userHandler: UserHandlerService, public imageService: ImagesHandlerService, public dateManager: DatesManagerService) { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem("loggedUser"))){
      this.router.navigate(['/cars/carSearch']);
    }
    this.serverService.getTheUsers().subscribe(items => {this.allUsers = items; this.loadPage = true;},
      () => {alert("אירעה שגיאה בטעינת הדף, נא נסה שנית או בדוק את החיבורת."); this.errorPage = true;});
  }

  public addUser(gender: HTMLSelectElement){

    this.loadPage = false;
    this.user.gender = this.genders[Number(gender.value) - 1];
    this.user.rank = new userRank(1, "לקוח");

    this.serverService.addUser(this.user).subscribe(p => {
      
      if(p.gender.id == 1){
        
        alert("ברוך הבא " + p.userName);
        
      }
      else if(p.gender.id == 2){
        alert("ברוכה הבאה " + p.userName);
      }
      if(this.files){
        this.serverService.updateUserImage(p,this.files).subscribe( s => {
          this.registration(s);
        }, err => alert("אירעה שגיאה בהעלאת התמונה, נא נסה שנית."));
      }
      else{
        this.registration(p);
      }
      this.loadPage = true;
      
      
    }, () => {alert("אירעה שגיאה בהרשמה, נא נסה שנית או בדוק את החיבור"); this.loadPage = true;});
  }

  private registration(userToAdd: users){
    localStorage.setItem("loggedUser", JSON.stringify(userToAdd))
    this.DataShare.setlogin(true);
    this.router.navigate(['/cars/carSearch']);
  }

}
