import { Component, OnInit } from '@angular/core';
import { Branches } from 'src/app/models/branches';
import { ServerService } from 'src/app/services/server.service';
import { users } from 'src/app/models/users';
import { messages } from 'src/app/models/messages';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  public branches: Branches[];
  public branchesErrorLoad = false;
  public myUser: users;

  public fullName: string = "";
  public email: string = "";
  public message: string = "";

  public sendMessageLoad = true;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getTheBranches().subscribe(items => this.branches = items, err => 
      {
        alert("שגיאה בטעינת הסניפים, נא נסה שנית.");
        this.branchesErrorLoad = true;
      }
    );

    if(JSON.parse(localStorage.getItem("loggedUser"))){
      this.myUser = JSON.parse(localStorage.getItem("loggedUser"));
      this.fullName = this.myUser.firstName + " " + this.myUser.lastName;
      this.email = this.myUser.email;
    }
  }

  public sendMessage(){
    let messageToSend = new messages();
    messageToSend.fullName = this.fullName;
    messageToSend.email = this.email;
    messageToSend.content = this.message;

    this.sendMessageLoad = false;

    this.serverService.addMessage(messageToSend).subscribe(() => {alert("הודעתך נקלטתך במערכת!");
    this.message = ""; this.sendMessageLoad = true;},
     () => {alert("חלה שגיאה בשליחת ההודעה, נא נסה שנית או בדוק את החיבור."); this.sendMessageLoad = true;})
  }

}
