import { Component, OnInit } from '@angular/core';
import { cars } from 'src/app/models/cars';
import { orders } from 'src/app/models/orders';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  public oneCar: cars;
  public orders: orders[] = [];


  constructor(private DataShare: DataShareService) { }

  ngOnInit() {
    this.DataShare.currentCar.subscribe(car => {this.oneCar = car;});
    this.DataShare.currentOrders.subscribe(orders => {this.orders = orders; this.rentAvailablilty();})

  }

  public rentAvailablilty():boolean{
    let today = new Date();
    let orderStart: Date;
    let orderEnd: Date;

    for(let item of this.orders){
      orderStart = new Date(item.startDate);
      if(item.actualEndDate){
        orderEnd = new Date(item.actualEndDate);
      }
      else{
        orderEnd = new Date(item.endDate);
      }
      
      if((orderEnd >= today && orderStart <= today)){
        return false;
      }
    }
    return true;
  }

}
