import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-car-manage-layout',
  templateUrl: './car-manage-layout.component.html',
  styleUrls: ['./car-manage-layout.component.css']
})
export class CarManageLayoutComponent implements OnInit {

  public tableType: string;

  constructor(private DataShare: DataShareService, private router: Router) { }

  ngOnInit() {
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if(!loggedUser || loggedUser.rank.rank != "מנהל"){
      alert("אין לך גישה לדף זה! בבקשה התחבר.");
      this.router.navigate(['/sign-in']);
    }

    this.DataShare.currentMessage.subscribe(message => this.tableType = message);
  }

}
