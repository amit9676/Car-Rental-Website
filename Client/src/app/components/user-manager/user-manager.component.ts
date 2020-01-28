import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/models/users';
import { ServerService } from 'src/app/services/server.service';
import { DatesManagerService } from 'src/app/services/dates-manager.service';
import { UserHandlerService } from 'src/app/services/user-handler.service';
import { TableSearchService } from 'src/app/services/table-search.service';
import { userGender } from 'src/app/models/userGender';
import { userRank } from 'src/app/models/userRank';
import { Router } from '@angular/router';
import { orders } from 'src/app/models/orders';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  public allUsers: users[] = [];
  public presentedUsers: users[] = [];

  public searchValue: string = "";

  public genders = [new userGender(1,"זכר"), new userGender(2,"נקבה")];
  public ranks = [new userRank(1,"עובד"), new userRank(2,"עובד"), new userRank(3,"מנהל")];

  public editMode: boolean[] = [];
  public updateMode: boolean[] = [];

  public myUser: users;

  public editBirthDate: Date;
  public initialBirthDate: Date;

  public editFirstName: string;
  public editLastName: string;
  public editUserName: string;
  public editSocialNumber: string;
  public editEmail: string;
  public editGender: string;
  public editRank: string;
  

  public validatedUserName = true;
  public validatedSocialNumber = true;
  public validatedEmail = true;
  public isFuture =  false;

  public pageLoad = false;
  public errorPage = false;

  constructor(private serverService: ServerService, public dateManager: DatesManagerService, public userHandler: UserHandlerService,
    private tableSearcher: TableSearchService, private router: Router) { }

  ngOnInit() {
    this.myUser = JSON.parse(localStorage.getItem("loggedUser"));

    if(!this.myUser || this.myUser.rank.rank != "מנהל"){
      alert("אין לך גישה לדף זה! בבקשה התחבר.");
      this.router.navigate(['/sign-in']);
    }
    
    this.loadItems();
    
  }

  public loadItems(){
    this.serverService.getTheUsers().subscribe(items => {this.allUsers = items;
       this.listFilter(items);
        this.pageLoad = true;}, () => {alert("חלה בעיה בטעינת הדף, נא רענן את העמוד או בדוק את החיבור."); this.errorPage = true;});
  }

  

  public listFilter(items: users[]){
    this.presentedUsers = [];
    
    for(let item of items){

      if(this.tableSearcher.innerFilter(item, this.searchValue, 1)){
        this.presentedUsers.push(item);
      }
    }
    
  }

  public convertToInput(item: users):void{

    for(let i = 0; i < this.editMode.length; i++){
      this.editMode[i] = false;
    }
    this.editMode[item.id] = true;
    this.validatedUserName = true;
    this.validatedSocialNumber = true;
    this.validatedEmail = true;
    this.isFuture =  false;

    this.editUserName = item.userName;
    this.editFirstName = item.firstName;
    this.editLastName = item.lastName;
    this.editSocialNumber = item.socialNumber;
    this.editEmail = item.email;
    this.editGender = String(item.gender.id);
    this.editRank = String(item.rank.id);

    if(item.dateOfBirth){
      this.initialBirthDate = new Date (item.dateOfBirth);
      this.editBirthDate = new Date (item.dateOfBirth);
    }
    else{
      this.initialBirthDate = null;
      this.editBirthDate = null;
    }
  }

  public saveChanges(item: users){

    let edittedUser = new users();

    edittedUser.id = item.id;
    edittedUser.userName = this.editUserName;
    edittedUser.socialNumber = this.editSocialNumber;
    edittedUser.image = item.image;
    edittedUser.email = this.editEmail;
    if(this.editBirthDate){
      edittedUser.dateOfBirth = this.editBirthDate;
      this.initialBirthDate = this.editBirthDate;
    }
    else{
      edittedUser.dateOfBirth = null;
      this.initialBirthDate = null;
    }
    edittedUser.gender = this.genders[Number(this.editGender) - 1];
    edittedUser.rank = this.ranks[Number(this.editRank) - 1];

    edittedUser.firstName = this.editFirstName;
    edittedUser.lastName = this.editLastName;
    
    this.updateMode[item.id] = true;
    this.serverService.updateUser(edittedUser).subscribe(p => {
      alert("הפרטים עודכנו בהצלחה.");

      item.userName = p.userName;
      item.firstName = p.firstName;
      item.gender = p.gender;
      item.dateOfBirth = p.dateOfBirth;
      item.email = p.email;
      item.lastName = p.lastName;
      item.image = p.image;
      item.socialNumber = p.socialNumber;
      item.rank = p.rank;
      this.updateMode[item.id] = false;
      
      this.editMode[item.id] = false;
      if((JSON.parse(localStorage.getItem("loggedUser")) as users).id == p.id){
        localStorage.setItem("loggedUser", JSON.stringify(p));
      }
    },
     () => {alert("חלה שגיאה בעדכון הפרטים, נא נסה שנית."); this.editMode[item.id] = false; this.updateMode[item.id] = false; });
  }

  public deleteUser(item: users){
    let confirmDelete = confirm("אזהרה! מחיקת משתמש תמחק גם את כל ההזמנות שבוצעו על ידי משתמש זה" + 
    "\n אתה בטוח שברצונך להמשיך?");
    if(!confirmDelete){
      return;
    }

    this.updateMode[item.id] = true;

    this.serverService.DeleteUserImage(item).subscribe(() => {
      this.serverService.deleteUser(item.id).subscribe(() => {
      
        alert("המשתמש נמחק בהצלחה");
        this.updateMode[item.id] = false;
        this.presentedUsers = this.presentedUsers.filter(p => p.id != item.id);
        },
      () => {alert("אירעה שגיאה בביצוע הפעולה, נא נסה שנית."); this.updateMode[item.id] = false;});
    });

    
  }
}
