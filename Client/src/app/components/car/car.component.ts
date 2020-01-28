import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { cars } from 'src/app/models/cars';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  @Input()
  public car: cars;

  @Output()
  public selectedCar = new EventEmitter<cars>();

  

  constructor() { }

  ngOnInit() {
  }

  public carNotify(selected: cars){
    this.selectedCar.emit(selected);
  }

}
