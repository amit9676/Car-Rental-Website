import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { orders } from 'src/app/models/orders';
import { OrdersHandlerService } from 'src/app/services/orders-handler.service';

@Component({
  selector: 'app-car-return',
  templateUrl: './car-return.component.html',
  styleUrls: ['./car-return.component.css']
})
export class CarReturnComponent implements OnInit {

  public allOrders: orders[];

  public searchValue: string = "";
  public carDoesNotExists = false;
  public noActiveOrder = false;

  public loadPage = false;
  public errorPage = false;

  constructor(private router: Router, private serverService: ServerService, private ordersHandler: OrdersHandlerService) { }

  ngOnInit() {
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if(!loggedUser || (loggedUser.rank.rank != "מנהל" && loggedUser.rank.rank != "עובד")){
      alert("אין לך גישה לדף זה! בבקשה התחבר.");
      this.router.navigate(['/sign-in']);
    }

    this.serverService.getTheOrders().subscribe(items => {this.allOrders = items; this.loadPage = true},
       () => {alert("חלה שגיאה בטעינת העמוד, נא נסה שנית או בדוק את החיבור"); this.errorPage = true;});
  }

  public orderScan(){
    this.noActiveOrder = false;
    this.carDoesNotExists = false;
    

    let rightOrder = this.allOrders.find(p => p.orderedCar.carNum == this.searchValue && 
      (this.ordersHandler.getOrderStatus(p.startDate, p.endDate, p.actualEndDate) == "פעיל" || this.ordersHandler.getOrderStatus(p.startDate, p.endDate, p.actualEndDate) == "מאחר"));
    if(rightOrder){
      this.returnCar(rightOrder);
      this.searchValue = "";
    }
    else if (this.allOrders.find(p => p.orderedCar.carNum == this.searchValue)){
      this.noActiveOrder = true;
    }
    else{
      this.carDoesNotExists = true;
    }
  }

  public returnCar(item: orders){
    this.loadPage = false;
    this.ordersHandler.returnCar(item, () => this.loadPage = true)
  }

}
