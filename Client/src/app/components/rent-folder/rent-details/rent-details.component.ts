import { Component, OnInit } from '@angular/core';
import { cars } from 'src/app/models/cars';
import { ServerService } from 'src/app/services/server.service';
import { orders } from 'src/app/models/orders';
import { DatesManagerService } from 'src/app/services/dates-manager.service';
import { users } from 'src/app/models/users';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styleUrls: ['./rent-details.component.css']
})
export class RentDetailsComponent implements OnInit {

  public oneCar: cars;
  public orderingUser: users;
  public orders: orders[] = [];

  public today: Date = new Date();
  public tommorow: Date = new Date(this.today);

  public startDate: Date;
  public endDate: Date;

  public rentPrice: number;
  public numOfDays: number = 1;

  public rentCondition = 1;

  public addedOrder: orders;
  public sucsessRent = false;
  public loadPage = true;


  constructor(private serverService: ServerService, public dateManager: DatesManagerService,
     private DataShare: DataShareService) { }

  ngOnInit() {

    this.tommorow.setDate(this.today.getDate() + 1);
    this.startDate = this.today;
    this.endDate = this.tommorow;
    this.orderingUser = JSON.parse(localStorage.getItem("loggedUser"));

    this.DataShare.currentCar.subscribe(car => {
      this.oneCar = car;
      if(car.functional == false){
        this.rentCondition = 4;
        this.loadPage = true;
      }
      else{
        this.DataShare.currentOrders.subscribe(orders => {
          this.orders = orders.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
          this.getRentPrice();})
      }
      this.rentPrice = this.oneCar.dailyRent;
    });

    

    
  }
  

  public getRentPrice(start?: HTMLInputElement, end?: HTMLInputElement):void {
    if(start && end){
      this.startDate = new Date(start.value);
      this.endDate = new Date(end.value);
    }

    let yesterDay = new Date(this.today);
    yesterDay.setDate(this.today.getDate() - 1);
    if(isNaN(this.startDate.getTime()) || isNaN(this.endDate.getTime()) || (this.startDate >= this.endDate || this.startDate < yesterDay)){
      this.rentCondition = 2;
      return;
    }


    for(let item of this.orders){
      let orderStart = new Date(item.startDate);
      let orderEnd: Date;
      if(item.actualEndDate){
        orderEnd = new Date(item.actualEndDate);
      }
      else{
        orderEnd = new Date(item.endDate);
      }

       orderStart.setHours(23,59,59,999);
       orderEnd.setHours(0,0,0,0);
      if((this.endDate >= orderStart && this.startDate <= orderEnd)){
        this.rentCondition = 3;
        return;
      }
    }

    
    this.numOfDays = this.dateManager.getDaysDifference(this.startDate, this.endDate);
    

    this.rentPrice = this.oneCar.dailyRent * this.numOfDays;
    this.rentCondition = 1;
  }

  public addOrder(){
    this.addedOrder = new orders();

    this.addedOrder.orderedCar = this.oneCar;
    this.addedOrder.orderingUser = this.orderingUser;
    this.addedOrder.startDate = new Date(this.startDate);
    this.addedOrder.endDate = new Date(this.endDate);
    this.addedOrder.actualEndDate = null;

    this.loadPage = false;
    this.serverService.addOrder(this.addedOrder).subscribe(p => {
      this.addedOrder.id = p.id;
      this.loadPage = true;
      this.sucsessRent = true;
      this.orders.push(p);
    }, () =>
     
    {alert("חלה שגיאה בביצוע ההזמנה, נא נסה שנית.");
    this.sucsessRent = false; this.loadPage = true; this.addedOrder = null;});
  }

}
