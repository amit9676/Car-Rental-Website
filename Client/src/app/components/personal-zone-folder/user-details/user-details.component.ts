import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { users } from 'src/app/models/users';
import { DataShareService } from 'src/app/services/data-share.service';
import { DatesManagerService } from 'src/app/services/dates-manager.service';
import { UserHandlerService } from 'src/app/services/user-handler.service';
import { userGender } from 'src/app/models/userGender';
import { userRank } from 'src/app/models/userRank';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  public allUsers: users[] = [];

  public myUser: users;
  public genders = [new userGender(1,"זכר"), new userGender(2,"נקבה")];
  public ranks = [new userRank(1,"עובד"), new userRank(2,"עובד"), new userRank(3,"מנהל")];
  public editMode = false;

  public editUserName: string;
  public editFirstName: string;
  public editLastName: string;
  public editSocialNumber: string;
  public editEmail: string;

  public initialBirthDate: Date;
  public editBirthDate: Date;
  
  public editGender: string;


  public validatedUserName = true;
  public validatedSocialNumber = true;
  public validatedEmail = true;
  public isFuture =  false;

  public loadPage = false;
  public errorPage = false;


  constructor(private dataShare: DataShareService, public dateManager: DatesManagerService, private serverService: ServerService,
    public userHandler: UserHandlerService) { }

  ngOnInit() {
    this.dataShare.currentUser.subscribe(user => this.myUser = user);
    this.serverService.getTheUsers().subscribe(items => {this.allUsers = items; this.loadPage = true;},
      () => {alert("חלה שגיאה בטעינת בדף, נא נסה שנית או בדוק את החיבור."); this.errorPage = true;});
    this.returntoNormal();
  }

  public saveChanges(){
    let edittedUser = new users();
    edittedUser.rank = new userRank(1, "לקוח");

    edittedUser.id = this.myUser.id;
    edittedUser.userName = this.editUserName;
    edittedUser.socialNumber = this.editSocialNumber;
    edittedUser.image = this.myUser.image;
    edittedUser.email = this.editEmail;
    if(this.editBirthDate){
      edittedUser.dateOfBirth = this.editBirthDate;
      this.initialBirthDate = this.editBirthDate;
    }
    else{
      edittedUser.dateOfBirth = null;
      this.initialBirthDate = null;
    }

    edittedUser.firstName = this.editFirstName;
    edittedUser.lastName = this.editLastName;

    edittedUser.gender = this.genders[Number(this.editGender) - 1];
    edittedUser.rank = this.ranks[this.myUser.rank.id - 1];
    
    this.loadPage = false;
    this.serverService.updateUser(edittedUser).subscribe(p => {
      alert("הפרטים עודכנו בהצלחה.");

      this.myUser.userName = p.userName;
      this.myUser.firstName = p.firstName;
      this.myUser.gender = p.gender;
      this.myUser.dateOfBirth = p.dateOfBirth;
      this.myUser.email = p.email;
      this.myUser.lastName = p.lastName;
      this.myUser.socialNumber = p.socialNumber;

      localStorage.setItem("loggedUser", JSON.stringify(this.myUser));
      this.dataShare.setlogin(true);
      
      this.editMode = false;
      this.loadPage = true;
      },
     () => {alert("חלה שגיאה בעדכון הפרטים, נא נסה שנית."); this.returntoNormal(); this.loadPage = true; });
  }

  public returntoNormal(){
    this.editMode = false
    this.validatedUserName = true;
    this.validatedSocialNumber = true;
    this.validatedEmail = true;
    this.isFuture =  false;

    this.editUserName = this.myUser.userName;
      this.editFirstName = this.myUser.firstName;
      this.editLastName = this.myUser.lastName;
      this.editSocialNumber = this.myUser.socialNumber;
      this.editEmail = this.myUser.email;
      if(this.myUser.dateOfBirth){
        this.initialBirthDate = new Date (this.myUser.dateOfBirth);
        this.editBirthDate = new Date (this.myUser.dateOfBirth);
      }
      
      this.editGender = String(this.myUser.gender.id);
  }

}
