import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { users } from 'src/app/models/users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedUser: users;

  constructor(private DataShare: DataShareService) { }

  ngOnInit() {
    this.DataShare.currentlogin.subscribe(() => this.checkforLog());
  }

  private checkforLog(){
    if(JSON.parse(localStorage.getItem("loggedUser"))){
      this.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    }
    else{
    }
  }

  public logOut(){
    localStorage.removeItem("loggedUser");
    this.loggedUser = null;
  }
  

}
