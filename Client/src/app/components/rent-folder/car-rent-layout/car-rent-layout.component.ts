import { Component, OnInit } from '@angular/core';
import { cars } from 'src/app/models/cars';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { orders } from 'src/app/models/orders';

@Component({
  selector: 'app-car-rent-layout',
  templateUrl: './car-rent-layout.component.html',
  styleUrls: ['./car-rent-layout.component.css']
})
export class CarRentLayoutComponent implements OnInit {
  public oneCar: cars;
  public carsOrders: orders[];
  public loadPage = false;
  public errorPage = false;

  private connectionCheck: boolean[] = [];

  constructor(private activatedRoute: ActivatedRoute, private serverService: ServerService,
     private router: Router, private DataShare: DataShareService) { }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params.id;

    this.serverService.getTheCars().subscribe(cars => {
      this.oneCar = cars.find(p => p.id === id);
      if(this.oneCar){
        this.serverLoad(true);
      }
      else{
        alert("מכונית זה לא קיימת.")
        this.router.navigate(['/cars']);
      }
    }, () => this.serverLoad(false));

    this.serverService.getTheOrders().subscribe(items => {
      this.carsOrders = items.filter(p => p.orderedCar.id === id);
      this.serverLoad(true);
    }, () => this.serverLoad(false));
  }

  public serverLoad(condition: boolean){
    this.connectionCheck.push(condition)
    for(let item of this.connectionCheck){
      if(!item){
        if(this.connectionCheck.length === 2){
          alert("חלה שגיאה בטעינת העמוד, נא נסה שנית או בדוק את החיבור.");
          this.errorPage = true;
        }
        return;
      }
    }
    if(this.connectionCheck.length === 2){
      this.DataShare.setCar(this.oneCar);
      this.DataShare.setOrders(this.carsOrders);
      this.loadPage = true;
    }
  }

}
