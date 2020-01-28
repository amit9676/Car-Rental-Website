import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { orders } from 'src/app/models/orders';
import { DataShareService } from 'src/app/services/data-share.service';
import { users } from 'src/app/models/users';
import { DatesManagerService } from 'src/app/services/dates-manager.service';
import { OrdersHandlerService } from 'src/app/services/orders-handler.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  public oneOrder: orders;

  public managerview: boolean;

  constructor(private activatedRoute: ActivatedRoute, private serverService: ServerService, private dataShare: DataShareService,
     private router: Router,  public dateManager: DatesManagerService, public ordersHandler: OrdersHandlerService) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params.id;
    if(this.activatedRoute.snapshot.routeConfig.path.indexOf("orders-manager") > -1){
      this.managerview = true;
    }
    else{
      this.managerview = false;
    }

    this.serverService.getTheOrders().subscribe(items => {
      for (let p of items) {
        if (p.id === id) {
          this.oneOrder = p;

          this.oneOrder.price = this.dateManager.getDaysDifference(p.startDate, p.endDate) * p.orderedCar.dailyRent + 
          this.dateManager.getDaysDifference(p.endDate, p.actualEndDate, true) * p.orderedCar.lateRent;

          this.oneOrder.orderStatus = this.ordersHandler.getOrderStatus(p.startDate, p.endDate, p.actualEndDate);

          this.checkForUserAccess();
          break;
        }
      }
      if(!this.oneOrder){
        alert("הזמנה זו לא קיימת.");
        this.managerview ? this.router.navigate(['/orders-manager']) : this.router.navigate(['/personal-zone/personal-orders']);
      }
      
    }, () => alert("חלה שגיאה בטעינת העמוד, נא נסה שנית או בדוק את החיבור."));
  }

  private checkForUserAccess(){
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    
    if((!loggedUser || (loggedUser as users).rank.rank != "מנהל") && this.managerview){
      alert("אין לך גישה לדף זה!");
      this.router.navigate(['/personal-zone/personal-orders']);
    }
    if((loggedUser as users).userName != this.oneOrder.orderingUser.userName &&
     !this.managerview){
      alert("אין לך גישה לדף זה!");
      this.router.navigate(['/personal-zone/personal-orders']);

    }
  }

  public getOutOfHeere(){
    if(this.managerview){
      this.router.navigate(['/orders-manager']);
    }
    else{
      this.router.navigate(['/personal-zone/personal-orders']);
    }
  }

  

}
