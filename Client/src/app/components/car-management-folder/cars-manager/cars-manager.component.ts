import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { cars } from 'src/app/models/cars';
import { orders } from 'src/app/models/orders';
import { DataShareService } from 'src/app/services/data-share.service';
import { TableSearchService } from 'src/app/services/table-search.service';
import { carManufactors } from 'src/app/models/carManufactors';
import { carModels } from 'src/app/models/carModels';
import { carDesigns } from 'src/app/models/carDesigns';
import { carGears } from 'src/app/models/carGears';
import { Branches } from 'src/app/models/branches';
import { CarHandlerService } from 'src/app/services/car-handler.service';

@Component({
  selector: 'app-cars-manager',
  templateUrl: './cars-manager.component.html',
  styleUrls: ['./cars-manager.component.css']
})
export class CarsManagerComponent implements OnInit {

  public allCars: cars[];
  public presentedCars: cars[] = [];
  public allManufactors: carManufactors[];
  public allModels: carModels[];
  public allDesigns: carDesigns[];
  public presentedModels: carModels[];
  public Allgears = [new carGears(1,"ידני"), new carGears(2,"אוטומטי")];
  public allBranches: Branches[];

  public existingCar = false;
  public isFuture = false;

  public orders: orders[] = [];

  public searchValue: string = "";

  public editMode: boolean[] = [];
  public updateMode: boolean[] = [];

  public givenCarNumber: string;
  public givenManufactor: string;
  public givenModel: string;
  public givenDesign: string;
  public givenYear: number;
  public givenGear: string;
  public givenKilometrage: number;
  public givenDayRent: number;
  public givenLateRent: number;
  public givenFunctionality: boolean;
  public givenBranch: string;

  private connectionCheck: boolean[] = [];
  public pageLoad = false;
  public errorPage = false;


  constructor(private carService: ServerService, private DataShare: DataShareService, public tableSearcher: TableSearchService,
     public carHandler: CarHandlerService) { }

  ngOnInit() {
    this.DataShare.changeMessage("ניהול רכבים");
    this.loadItems();
    this.getTheOrders();
    

    this.carService.getTheManufactors().subscribe(items => {this.allManufactors = items; this.serverLoad(true);},
      () => {this.serverLoad(false);});
    
    this.carService.getTheModels().subscribe(items => {this.allModels = items; this.serverLoad(true);},
      () => {this.serverLoad(false);});

    this.carService.getTheDesigns().subscribe(items => {this.allDesigns = items; this.serverLoad(true);},
      () => {this.serverLoad(false);});

    this.carService.getTheBranches().subscribe(items => {this.allBranches = items; this.serverLoad(true);},
      () => {this.serverLoad(false);});
  }

  public serverLoad(condition: boolean){
    this.connectionCheck.push(condition)
    for(let item of this.connectionCheck){
      if(!item){
        if(this.connectionCheck.length === 6){
          alert("חלה שגיאה בטעינת העמוד, נא נסה שנית או בדוק את החיבור.");
          this.errorPage = true;
        }
        return;
      }
    }
    if(this.connectionCheck.length === 6){
      this.pageLoad = true;
      this.listFilter(this.allCars);
    }
  }

  public loadItems(){
    this.carService.getTheCars().subscribe(items => {
      this.allCars = items;
      this.serverLoad(true);
      }, () => this.serverLoad(false));
  }

  public listFilter(items: cars[]){
    this.presentedCars = [];
    let searchValue: string = this.searchValue;
    if(this.searchValue == "כן"){
      searchValue = "true";
    }
    else if(this.searchValue == "לא"){
      searchValue = "false";
    }
    
    for(let item of items){

      if(this.tableSearcher.innerFilter(item, searchValue, 1)){
        this.presentedCars.push(item);
      }
    }
  }

  private getTheOrders(){
    this.carService.getTheOrders().subscribe(items => {this.orders = items;
    this.rentAvailablilty();
    this.serverLoad(true);}
    , () => {this.serverLoad(false);});
  }

  public rentAvailablilty(){
    let today = new Date();
    today.setHours(0,0,0);

    if(!this.allCars){return;}
    for(let car of this.allCars){

      for(let order of this.orders){

        let orderStart = new Date(order.startDate);
        let orderEnd = new Date(order.endDate);

        if(orderEnd >= today && orderStart <= today && order.orderedCar.carNum === car.carNum){
          break;
        }
      }
    }
  }

  public convertToInput(item: cars):void{

    for(let i = 0; i < this.editMode.length; i++){
      this.editMode[i] = false;
    }
    this.editMode[item.id] = true;
    this.givenCarNumber = item.carNum;
    this.givenManufactor = String(item.manufactor.id);
    this.presentedModels = this.carHandler.getManufactorModels(this.allModels, this.allManufactors, this.givenManufactor);
    this.givenModel = String(item.model.id);
    this.givenDesign = String(item.design.id);
    this.givenYear = item.year;
    this.givenGear = String(item.gear.id);
    this.givenKilometrage = item.kilometrage;
    this.givenDayRent = item.dailyRent;
    this.givenLateRent = item.lateRent;
    this.givenFunctionality = item.functional;
    this.givenBranch = String(item.branch.id);
  }

  public saveChanges(item: cars){
    let chosenManufactor = this.allManufactors.find(p => p.id == Number(this.givenManufactor));
    let chosenModel = this.allModels.find(p => p.id == Number(this.givenModel));
    let chosenBranch = this.allBranches.find(p => p.id == Number(this.givenBranch));
    let chosenDesign = this.allDesigns.find(p => p.id == Number(this.givenDesign));
    let chosenGear = this.Allgears[Number(this.givenGear) - 1];

    let carToEdit = new cars(item.id, chosenManufactor, chosenModel, chosenGear, chosenDesign, this.givenCarNumber,
      chosenBranch, this.givenYear, this.givenDayRent, this.givenLateRent, this.givenKilometrage, this.givenFunctionality, item.picture);

    
    this.updateMode[item.id] = true;
    this.carService.UpdateCar(carToEdit).subscribe(p => {
      alert("השינויים בוצעו בהצלחה");
      item.carNum = p.carNum;
      item.manufactor.manufactor = p.manufactor.manufactor;
      item.design.design = p.design.design;
      item.model.model = p.model.model;
      item.gear.gear = p.gear.gear;
      item.dailyRent = p.dailyRent;
      item.lateRent = p.lateRent;
      item.functional = p.functional;
      item.year = p.year;
      item.branch.address = p.branch.address;
      item.branch.city = p.branch.city;
      item.kilometrage = p.kilometrage;
      
      this.updateMode[item.id] = false;
      if(JSON.parse(localStorage.getItem("cars"))){
        this.carHandler.modifyLocalStorage(carToEdit, p);
      }
      
      this.editMode[item.id] = false;},
      () => {alert("חלה שגיאה בביצוע הפעולה, נא נסה שנית או בדוק את חיבור האינטרנט"); this.editMode[item.id] = false; this.updateMode[item.id] = false; });
  }

  public deleteCar(item: cars){
    let confirmDelete = confirm("אזהרה! מחיקת הרכב תמחק גם את כל ההזמנות של רכב זה" + 
    "\n אתה בטוח שברצונך להמשיך?");
    if(!confirmDelete){
      return;
    }
    
    this.updateMode[item.id] = true;

    this.carService.DeleteCarImage(item).subscribe(() => {
      this.carService.deleteCar(item.id).subscribe(() => {
      
        alert("הרכב נמחק בהצלחה");
        this.presentedCars = this.presentedCars.filter(p => p.id != item.id);
        if(JSON.parse(localStorage.getItem("cars"))){
          this.carHandler.modifyLocalStorage(item);
        }
        
        this.updateMode[item.id] = false;
        },
      () => {alert("אירעה שגיאה בביצוע הפעולה, נא נסה שנית."); this.updateMode[item.id] = false;})});
  }
}
