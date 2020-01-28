import { Component, OnInit } from '@angular/core';
import { carManufactors } from 'src/app/models/carManufactors';
import { ServerService } from 'src/app/services/server.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { cars } from 'src/app/models/cars';
import { CarHandlerService } from 'src/app/services/car-handler.service';

@Component({
  selector: 'app-manufactors-manager',
  templateUrl: './manufactors-manager.component.html',
  styleUrls: ['./manufactors-manager.component.css']
})
export class ManufactorsManagerComponent implements OnInit {

  public allManufactors: carManufactors[];
  public presentedManufactors: carManufactors[] = [];

  public searchValue: string = "";
  public manufactorValue: string = "";

  public existingManufactor = false;

  public editMode: boolean[] = [];
  public updateMode: boolean[] = [];

  public pageLoad = false;
  public errorPage = false;

  constructor(private serverService: ServerService, private DataShare: DataShareService,
     private carHandler: CarHandlerService) { }

  ngOnInit() {
    this.DataShare.changeMessage("ניהול יצרנים");
    this.loadItems();
  }

  public loadItems(){
    this.serverService.getTheManufactors().subscribe(items => {this.allManufactors = items; this.manufactorFilter(); this.pageLoad = true;}
      , () => {alert("חלה בעיה בטעינת הדף, נא רענן את העמוד או בדוק את החיבור."); this.errorPage = true;});
  }

  public manufactorFilter(){
    this.presentedManufactors = this.allManufactors;

    this.presentedManufactors = this.presentedManufactors.filter
    (p => p.manufactor.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
  }

  public convertToInput(item: carManufactors):void{

    for(let i = 0; i < this.editMode.length; i++){
      this.editMode[i] = false;
    }
    this.editMode[item.id] = true;
    this.manufactorValue = item.manufactor;
  }

  public saveChanges(item: carManufactors){
    let manufactorToUpdate = new carManufactors();
    manufactorToUpdate.id = item.id;
    manufactorToUpdate.manufactor = this.manufactorValue;
    this.updateMode[item.id] = true;

    this.serverService.UpdateManufactor(manufactorToUpdate).subscribe(p => {
      
      this.updateMode[item.id] = false;
      alert("הפרטים עודכנו בהצלחה");
      item.manufactor = p.manufactor;
       this.editMode[item.id] = false;
       },
     () => {alert("אירעה שגיאה בביצוע הפעולה, נא נסה שנית.");this.editMode[item.id] = false; this.updateMode[item.id] = false;});
  }

  public checkManufactorValidation(givenManufactor: carManufactors){
    this.existingManufactor = false;
    for(let item of this.allManufactors){
      if(this.manufactorValue.toLowerCase() == item.manufactor.toLowerCase() && givenManufactor.id != item.id){
        this.existingManufactor = true;
        break;
      }
    }
  }

  public deleteManufactor(item: carManufactors){
    let confirmDelete = confirm("אזהרה! מחיקת יצרן זה תמחק את כל הדגמים, הרכבים וההזמנות המשתמשים ביצרן זה." + 
    "\n אתה בטוח שברצונך להמשיך?");
    if(!confirmDelete){
      return;
    }
    this.updateMode[item.id] = true;
    this.serverService.deleteManufactor(item.id).subscribe(() => {
      alert("היצרן נמחק בהצלחה");
       this.presentedManufactors = this.presentedManufactors.filter(p => p.id != item.id);

       if(JSON.parse(localStorage.getItem("cars"))){
        let manufactorCars: cars[] = JSON.parse(localStorage.getItem("cars"));
        manufactorCars = manufactorCars.filter(p => p.manufactor.id === item.id);
        for(let innerCar of manufactorCars){
          this.carHandler.modifyLocalStorage(innerCar);
        }
       }
       


       this.updateMode[item.id] = false;
      },
    () => {alert("אירעה שגיאה בביצוע הפעולה, נא נסה שנית."); this.updateMode[item.id] = false;});
  }
}
