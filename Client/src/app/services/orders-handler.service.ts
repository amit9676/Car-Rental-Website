import { Injectable } from '@angular/core';
import { orders } from '../models/orders';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersHandlerService {

  constructor(private serverService: ServerService) { }

  public getOrderStatus(start: Date, end: Date, actual: Date): string{
    let today = new Date();
    today.setHours(0,0,0);

    let startDate = new Date(start);
    startDate.setHours(0,0,0,1);

    let endDate = new Date(end);
    startDate.setHours(0,0,0);

    let actualDate: Date;
    if(actual){
      actualDate = new Date(actual);
      actualDate.setHours(0,0,0);
    }

    if(startDate > today){
      return "ממתין"
    }
    else if(today >= startDate && today < endDate && !actualDate){
      return "פעיל"
    }
    else if(today >= endDate && !actualDate){
      return "מאחר"
    }
    return "הוחזר"
  }

  public returnCar(item: orders, changeStatus?){
    if(!confirm("האם אתה בטוח שברצונך להחזיר רכב זה ולסיים את ההזמנה באופן מיידי? לא ניתן לבטל פעולה זו!")){
      changeStatus();
      return;
    }
    let edittedOrder = new orders();
    edittedOrder.id = item.id;
    edittedOrder.endDate = item.endDate;
    edittedOrder.actualEndDate = new Date();
    edittedOrder.actualEndDate.setHours(23,59,59, 999);


    this.serverService.updateOrder(edittedOrder).subscribe(p => {
      alert("רכב זה הוחזר, ההשכרה הסתיימה.");
      item.actualEndDate = p.actualEndDate;
      item.orderStatus = "הוחזר";
      changeStatus();
      
    }, () => {alert("חל שגיאה בשינוי הנתונים, נא נסה שנית או בדוק את החיבור"); changeStatus();});
  }

}
