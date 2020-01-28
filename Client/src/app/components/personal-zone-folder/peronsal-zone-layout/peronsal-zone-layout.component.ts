import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { users } from 'src/app/models/users';
import { Router } from '@angular/router';


@Component({
  selector: 'app-peronsal-zone-layout',
  templateUrl: './peronsal-zone-layout.component.html',
  styleUrls: ['./peronsal-zone-layout.component.css']
})
export class PeronsalZoneLayoutComponent implements OnInit {

  public loggedUser: users;

  constructor(private dataShareService: DataShareService, private router: Router) { }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem("loggedUser"))){
      alert("אין לך גישה לדף זה! בבקשה התחבר.");
      this.router.navigate(['/sign-in']);
    }

    this.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    //?local storage-האם כדאי לקחת את מידע המשתמש מהשרת ולא מ
    this.dataShareService.setUser(this.loggedUser);
  }

}
