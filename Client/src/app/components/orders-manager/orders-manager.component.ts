import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { orders } from 'src/app/models/orders';
import { DataShareService } from 'src/app/services/data-share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from 'src/app/models/users';
import { DatesManagerService } from 'src/app/services/dates-manager.service';
import { OrdersHandlerService } from 'src/app/services/orders-handler.service';
import { TableSearchService } from 'src/app/services/table-search.service';

@Component({
  selector: 'app-orders-manager',
  templateUrl: './orders-manager.component.html',
  styleUrls: ['./orders-manager.component.css']
})
export class OrdersManagerComponent implements OnInit {

  public allOrders: orders[];
  public presentedOrders: orders[] = [];

  public managerview: boolean;

  public searchValue: string = "";
  public myUser: users;
  public newEndDate: Date;
  public edittedEndDate: Date;

  public isFuture: boolean;
  public endBeforeStart: boolean;
  public anotherOrderExists: boolean;
  public orderNewPrice: number;

  public editMode: boolean[] = [];
  public updateMode: boolean[] = [];
  public loadPage = false;
  public errorPage = false;

  constructor(public carTypesService: ServerService, private dataShare: DataShareService,
     private activatedRoute: ActivatedRoute, private router: Router, public dateManager: DatesManagerService,
      public ordersHandler: OrdersHandlerService, private tableSearcher: TableSearchService) { }

  ngOnInit() {
    if(this.activatedRoute.snapshot.routeConfig.path.indexOf("orders-manager") > -1){
      this.managerview = true;
    }
    else{
      this.managerview = false;
    }

    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if((!loggedUser || loggedUser.rank.rank != "מנהל") && this.managerview){
      alert("אין לך גישה לדף זה! בבקשה התחבר.");
      this.router.navigate(['/sign-in']);
    }

    this.dataShare.currentUser.subscribe(user => {this.myUser = user;});
    this.loadItems();
  }

  public loadItems(){
    this.carTypesService.getTheOrders().subscribe(items => {
      if(this.managerview){
        this.allOrders = items;
        this.listFilter(items);
      }
      else{
        this.allOrders = items.filter(p => p.orderingUser.userName === this.myUser.userName);
      }

      for(let item of items){
        item.price = this.dateManager.getDaysDifference(item.startDate, item.endDate) * item.orderedCar.dailyRent + 
        this.dateManager.getDaysDifference(item.endDate, item.actualEndDate) * item.orderedCar.lateRent;

        item.orderStatus = this.ordersHandler.getOrderStatus(item.startDate, item.endDate, item.actualEndDate);
      }
      this.listFilter(this.allOrders);
      this.loadPage = true;
      }, () => {alert("חלה שגיאה בטעינת העמוד, נא נסה שנית או בדוק את החיבור."); this.errorPage = true;});
  }

  public convertToInput(item: orders):void{

    for(let i = 0; i < this.editMode.length; i++){
      this.editMode[i] = false;
    }
    this.editMode[item.id] = true;
    this.newEndDate = new Date(item.endDate);
    this.isFuture = true;
    this.endBeforeStart = false;
    this.anotherOrderExists = false;
    this.orderNewPrice = item.price;
  }

  public listFilter(items: orders[]){
    this.presentedOrders = [];
    
    for(let item of items){

      if(this.tableSearcher.OrdersInnerFilter(item, this.searchValue, 1, this.managerview)){
        this.presentedOrders.push(item);
      }
    }
  }

  public getNewPrice(orderEndInput: HTMLInputElement, item: orders){
    let orderEnd = new Date(orderEndInput.value);
    this.orderNewPrice = this.dateManager.getDaysDifference(item.startDate, orderEnd) * item.orderedCar.dailyRent;
  }

  public compareOrderDates(orderEndInput: HTMLInputElement, item: orders){
    let orderEnd = new Date(orderEndInput.value);
    orderEnd.setHours(0,0,0);
    if(orderEnd <= new Date(item.startDate)){
      this.endBeforeStart = true;
    }
    else{
      this.endBeforeStart = false;
    }
  }

  public compareOrdertoOtherOrders(orderEndInput: HTMLInputElement, item: orders){
    let orderEnd = new Date(orderEndInput.value);
    orderEnd.setHours(0,0,0);
    this.anotherOrderExists = false;
    let oneCarOrders = this.allOrders.filter(p => p.orderedCar.carNum === item.orderedCar.carNum && p.id != item.id)
    for(let order of oneCarOrders){
      if(orderEnd > new Date(order.startDate) && new Date(order.startDate) > new Date(item.endDate)){
        this.anotherOrderExists = true;
        return;
      }
    }
  }

  public saveOrderEndDate(orderEndInput: Date, item: orders){
    let edittedOrder = new orders();
    edittedOrder.id = item.id;
    edittedOrder.endDate = new Date(orderEndInput);
    this.updateMode[item.id] = true;
    this.carTypesService.updateOrder(edittedOrder).subscribe(p => {
      alert("השינוי בוצע בהצלחה");
      item.endDate = p.endDate;
      item.price = this.orderNewPrice;
      this.editMode[item.id] = false;
      this.updateMode[item.id] = false;
    }, () => {alert("חל שגיאה בשינוי הנתונים, נא נסה שנית או בדוק את החיבור"); this.editMode[item.id] = false; this.updateMode[item.id] = false;});
  }
  
  public deleteOrder(item: orders){
    if(!confirm("האם אתה בטוח שברצונך למחוק הזמנה זו?")){
      return;
    }

    this.updateMode[item.id] = true;
    this.carTypesService.deleteOrder(item.id).subscribe(() => {
      this.presentedOrders = this.presentedOrders.filter(p => p.id != item.id);
      this.updateMode[item.id] = false;
      alert("ההזמנה נמחקה.");
    }, () => {alert("אירעה שגיאה בביצוע הפעולה, נא נסה שנית."); this.updateMode[item.id] = false;});
  }

  public returnCar(item: orders){
    this.updateMode[item.id] = true;
    this.ordersHandler.returnCar(item, () => this.updateMode[item.id] = false)
  }

  public getOutOfHeere(item: orders){
    if(this.managerview){
      this.router.navigate(['/orders-manager/order-details/' + item.id]);
    }
    else{
      this.router.navigate(['/personal-zone/personal-orders/order-details/' + item.id]);
    }
  }

}
