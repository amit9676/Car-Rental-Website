import { Component, OnInit, EventEmitter } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { cars } from 'src/app/models/cars';
import { carManufactors } from 'src/app/models/carManufactors';
import { carModels } from 'src/app/models/carModels';
import { carDesigns } from 'src/app/models/carDesigns';
import { orders } from 'src/app/models/orders';
import { givenData } from 'src/app/models/givenData';
import { DatesManagerService } from 'src/app/services/dates-manager.service';

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.css']
})
export class CarSearchComponent implements OnInit {
  public cars: cars[] = [];
  public carsRight: cars[] = [];
  public carsLeft: cars[] = [];

  public givenIDs: cars[] = [];

  public givenSearch: string = "";
  public givenStartDate: Date;
  public givenEndDate: Date;
  public givenManufactor: string;
  public givenModel: string;
  public givenYear: number;
  public givenGear: string;
  public givenDesign: string = "All";

  public manufactors: carManufactors[] = [];
  public manucheck = false;
  public manuSelected: string = "All";

  private allModels: carModels[] = [];
  public someModels: carModels[] = [];
  public modelSelected: string = "All";

  public designs: carDesigns[];

  public startDateSelected: Date;
  public endDateSelected: Date;
  public gearSelected: string = "All";
  public yearSelected: number;

  public orders: orders[];

  private connectionCheck: boolean[] = [];
  public loadPage = false;
  public errorPage = false;

  constructor(public carsService: ServerService, public dateService: DatesManagerService) { }

  ngOnInit() {
    

    this.carsService.getTheCars().subscribe(items => {
      this.cars = items.filter(p => p.functional);
      for (let i = 0; i < this.cars.length; i++) {
        if (i % 2 == 0) {
          this.carsRight.push(this.cars[i]);
        }
        else {
          this.carsLeft.push(this.cars[i]);
        }
      }
      this.serverLoad(true);
    }, () => this.serverLoad(false));

    
    this.carsService.getTheOrders().subscribe(items => {this.orders = items; this.serverLoad(true);}, () => this.serverLoad(false));
    this.carsService.getTheManufactors().subscribe(items => {this.manufactors = items; this.serverLoad(true);}, () => this.serverLoad(false));
    this.carsService.getTheDesigns().subscribe(items => {this.designs = items; this.serverLoad(true);}, () => this.serverLoad(false));
    this.carsService.getTheModels().subscribe(items => {this.allModels = items; this.serverLoad(true);}, () => this.serverLoad(false));

    
    
    let dataCheck = localStorage.getItem("cars");
    this.givenIDs = JSON.parse(dataCheck);
    if(!this.givenIDs){
      this.givenIDs = [];
    }
  }

  public serverLoad(condition: boolean){
    this.connectionCheck.push(condition)
    for(let item of this.connectionCheck){
      if(!item){
        if(this.connectionCheck.length === 5){
          alert("חלה שגיאה בטעינת העמוד, נא נסה שנית או בדוק את החיבור.");
          this.errorPage = true;
        }
        return;
      }
    }
    if(this.connectionCheck.length === 5){
      this.readData();
      this.loadPage = true;
    }
  }

  public readData(){
    let givenData = JSON.parse(localStorage.getItem("searchData"));
    if(givenData){

      this.givenSearch = (givenData as givenData).givenSearch;
      this.givenStartDate = (givenData as givenData).givenStartDate;
      if(this.givenStartDate){
        this.startDateSelected = new Date(this.givenStartDate);
      }


      this.givenEndDate = (givenData as givenData).givenEndDate;
      if(this.givenEndDate){
        this.endDateSelected = new Date(this.givenEndDate);
      }

      this.givenManufactor = (givenData as givenData).givenManufactor;
      if(this.givenManufactor){
        
        this.manuSelected = this.givenManufactor;
        this.someModels = this.allModels.filter(p => p.manufactor.toString() == this.givenManufactor);
      }

      this.givenModel = (givenData as givenData).givenModel;
      if(this.givenModel){
        this.modelSelected = this.givenModel;
      }

      this.givenYear = (givenData as givenData).givenYear;
      if(this.givenYear){
        this.yearSelected = this.givenYear;
      }

      this.givenGear = (givenData as givenData).givenGear;
      if(this.givenGear){
        this.gearSelected = this.givenGear;
      }
      this.carFilter(this.manuSelected, this.modelSelected, this.givenDesign, this.yearSelected,
        this.startDateSelected, this.endDateSelected, this.gearSelected);
      
      localStorage.removeItem("searchData");
      
    }
  }

  public getID(selected: cars) {

    if (selected) {


      let canAdd = true;

      for (let i = 0; i < this.givenIDs.length; i++) {
        if (selected.id == this.givenIDs[i].id) {
          canAdd = false;
          break;
        }
      }

      if (canAdd) {
        this.givenIDs.push(selected);
        localStorage.setItem("cars", JSON.stringify(this.givenIDs));
      }
    }
  }

  public LengthCheck(id: number): boolean {
    if (id <= this.cars.length - 1) {
      return true;
    }
    return false;
  }

  public carFilter(givenManufactor: any, givenModel: any, givenDesign: any,
    givenYear: any, givenStartDate: any, givenEndDate: any, givenGear: any){

    
    let manufactorVal: string;
    let modelVal: string;
    let designVal: string;
    let yearVal: number;
    let gearVal: string;
    let startDateVal: string;
    let endDateVal: string;
    
    if(givenManufactor instanceof HTMLSelectElement){
      manufactorVal = (givenManufactor as HTMLSelectElement).value;
    }
    else{
      manufactorVal = this.manuSelected;
    }
    
    if(givenModel instanceof HTMLSelectElement){
      modelVal = (givenModel as HTMLSelectElement).value;
    }
    else{
      modelVal = this.modelSelected;
    }

    if(givenDesign instanceof HTMLSelectElement){
      designVal = (givenDesign as HTMLSelectElement).value;
    }
    else{
      designVal = "All";
    }

    if(givenYear instanceof HTMLInputElement){
      yearVal = Number((givenYear as HTMLInputElement).value);
    }
    else{
      yearVal = this.yearSelected;
    }

    if(givenGear instanceof HTMLSelectElement){
      gearVal = (givenGear as HTMLSelectElement).value;
    }
    else{
      gearVal = this.gearSelected;
    }
    

    if(givenStartDate instanceof HTMLInputElement){
      startDateVal = (givenStartDate as HTMLInputElement).value;
    }
    else if (givenStartDate){
      startDateVal = this.startDateSelected.toDateString();
    }

    if(givenEndDate instanceof HTMLInputElement){
      endDateVal = (givenEndDate as HTMLInputElement).value;
    }
    else if(givenEndDate){
      endDateVal = this.endDateSelected.toDateString();
    }

    this.someModels = this.allModels;

    if(this.manucheck){
      modelVal = "All";
      this.modelSelected = "All";
      this.manucheck = false;
    }
    let searchedCars = this.cars.filter(p => p.model.model.toLowerCase().indexOf(this.givenSearch.toLowerCase()) > -1 ||
     p.manufactor.manufactor.toString().toLowerCase().indexOf(this.givenSearch.toLowerCase()) > -1 ||
      p.design.design.toLowerCase().indexOf(this.givenSearch.toLowerCase()) > -1 || 
      p.carNum.toLowerCase().indexOf(this.givenSearch.toLowerCase()) > -1  ||
       (p.manufactor.manufactor.toString().toLowerCase() + " " + p.model.model.toLowerCase()).indexOf(this.givenSearch.toLowerCase()) > -1);


    if(manufactorVal && manufactorVal != "All"){
      searchedCars = searchedCars.filter(p => p.manufactor.manufactor.toString() == manufactorVal);
      this.someModels = this.allModels.filter(p => p.manufactor.manufactor.toString() == manufactorVal);
    }
    else{
      this.someModels = [];
    }
    
    if(modelVal && modelVal != "All"){
      searchedCars = searchedCars.filter(p => p.model.model == modelVal);
    }

    if(designVal != "All"){
      searchedCars = searchedCars.filter(p => p.design.design == designVal);
    }

    if(!isNaN(yearVal) && yearVal != 0){
      searchedCars = searchedCars.filter(p => p.year == Number(yearVal));
    }

    if(gearVal && gearVal != "All"){
      searchedCars = searchedCars.filter(p => p.gear.gear == gearVal);
    }
    
    if(startDateVal && endDateVal && startDateVal != "" && endDateVal != ""){
      let sDate = new Date(startDateVal);
      let eDate = new Date(endDateVal);

      for(let item of this.orders){

        let orderStart = new Date(item.startDate);
        let orderEnd = new Date(item.endDate);
        if( eDate >= orderStart && sDate <= orderEnd){
          searchedCars = searchedCars.filter(p => p.carNum != item.orderedCar.carNum);
        }
      }
    }
    this.carsRight = [];
    this.carsLeft = [];
    
    for (let i = 0; i < searchedCars.length; i++) {
      if (i % 2 == 0) {
        this.carsRight.push(searchedCars[i]);
      }
      else {
        this.carsLeft.push(searchedCars[i]);
      }
    }
  }
}
