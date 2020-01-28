import { Component, OnInit } from '@angular/core';
import { cars } from 'src/app/models/cars';

@Component({
  selector: 'app-your-cars',
  templateUrl: './your-cars.component.html',
  styleUrls: ['./your-cars.component.css']
})
export class YourCarsComponent implements OnInit {

  public cars: cars[];
  public carsRight: cars[] = [];
  public carsLeft: cars[] = [];

  constructor() { }

  ngOnInit() {
    this.cars = JSON.parse(localStorage.getItem("cars"));
    if(!this.cars){
      this.cars = [];
    }
   
    for (let i = 0; i < this.cars.length; i++) {
      if (i % 2 == 0) {
        this.carsRight.push(this.cars[i]);
      }
      else {
        this.carsLeft.push(this.cars[i]);
      }
    }
    
    
  }

}
