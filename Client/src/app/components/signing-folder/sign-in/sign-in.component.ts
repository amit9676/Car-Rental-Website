import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/models/users';
import { ServerService } from 'src/app/services/server.service';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public wrongCardentials =  false;
  private allUsers: users[] = [];
  public hashConvert = new Md5();

  public userName = "";
  public password = "";

  public loadPage = false;
  public errorPage = false;


  constructor(private serverService: ServerService, private router: Router, private DataShare: DataShareService) { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem("loggedUser"))){
      this.router.navigate(['/cars/carSearch']);
    }
    
    this.serverService.getTheUsers().subscribe(items => {this.allUsers = items; this.loadPage = true;},
       () => {alert("שגיאה בטעינת דף החיבור, נא רענן את הדף."); this.errorPage = true;})
  }

  public logIn(){
    for(let item of this.allUsers){
      if(this.userName.toLowerCase() == item.userName.toLowerCase() && Md5.hashStr(this.password) == item.password.toLowerCase()){
        this.wrongCardentials = false;
        localStorage.setItem("loggedUser", JSON.stringify(item))
        this.DataShare.setlogin(true);
        this.router.navigate(['/cars/carSearch']);
        return;
      }
    }
    this.wrongCardentials = true;
  }

}
