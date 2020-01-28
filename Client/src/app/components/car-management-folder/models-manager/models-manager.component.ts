import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { ServerService } from 'src/app/services/server.service';
import { carModels } from 'src/app/models/carModels';
import { carManufactors } from 'src/app/models/carManufactors';
import { cars } from 'src/app/models/cars';
import { CarHandlerService } from 'src/app/services/car-handler.service';

@Component({
  selector: 'app-models-manager',
  templateUrl: './models-manager.component.html',
  styleUrls: ['./models-manager.component.css']
})
export class ModelsManagerComponent implements OnInit {

  public allModels: carModels[];
  public presentedModels: carModels[] = [];

  public allManufactors: carManufactors[] = [];
  public selectedManufactor: carManufactors;
  public editManufactor: string;
  public searchedManufactor: string = "All";

  public searchValue: string = "";
  public modelName: string = "";
  public existingModel = false;

  public editMode: boolean[] = [];
  public updateMode: boolean[] = [];

  private connectionCheck: boolean[] = [];
  public loadPage = false;
  public errorPage = false;

  constructor(private serverService: ServerService, private DataShare: DataShareService, private carHandler: CarHandlerService) { }

  ngOnInit() {
    this.DataShare.changeMessage("ניהול דגמים");

    
    this.loadItems();
      this.serverService.getTheManufactors().subscribe(items => {this.allManufactors = items; this.serverLoad(true);}
        , () => {this.allManufactors = null; this.serverLoad(false);});
  }

  private loadItems(){
    this.serverService.getTheModels().subscribe(items => {this.allModels = items; this.serverLoad(true);}
      , () => this.serverLoad(false));
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
      this.loadPage = true;
      this.modelFilter();
    }
  }

  public getManufactorValue(manufactor: HTMLSelectElement){
    this.editManufactor = manufactor.value;
    this.selectedManufactor = this.allManufactors.find(p => p.manufactor == this.editManufactor);
  }

  public modelFilter(){
    
    this.presentedModels = this.allModels;
    if(this.searchedManufactor !== "All"){
      this.presentedModels = this.presentedModels.filter
    (p => p.manufactor.manufactor == this.searchedManufactor);
    }

    this.presentedModels = this.presentedModels.filter
    (p => p.model.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
  }

  public convertToInput(item: carModels):void{

    for(let i = 0; i < this.editMode.length; i++){
      this.editMode[i] = false;
    }
    this.editMode[item.id] = true;
    this.editManufactor = item.manufactor.manufactor;
    this.selectedManufactor = this.allManufactors.find(p => p.manufactor == this.editManufactor);
    this.modelName = item.model;
  }

  public checkModelValidation(givenModel: carModels){
    this.existingModel = false;
    for(let item of this.allModels){
      if(this.modelName.toLowerCase() == item.model.toLowerCase() && this.editManufactor == item.manufactor.manufactor
       && givenModel.id != item.id){
        this.existingModel = true;
        break;
      }
    }
  }

  public saveChanges(item: carModels){
    let modelToUpdate = new carModels();
    modelToUpdate.id = item.id;
    modelToUpdate.manufactor = this.selectedManufactor;
    modelToUpdate.model = this.modelName;
    this.updateMode[item.id] = true;

    this.serverService.UpdateModel(modelToUpdate).subscribe(p => {
      alert("הפרטים עודכנו בהצלחה");
      item.manufactor = p.manufactor;
      item.model = p.model;
       this.editMode[item.id] = false;
       this.updateMode[item.id] = false;
       },
     () => {alert("אירעה שגיאה בביצוע הפעולה, נא נסה שנית."); this.editMode[item.id] = false; this.updateMode[item.id] = false;});
  }

  public deleteModel(item: carModels, givenManufactor: HTMLSelectElement){
    let confirmDelete = confirm("אזהרה! מחיקת דגם זה תמחק את כל הרכבים וההזמנות המשתמשים בדגם זה." + 
    "\n אתה בטוח שברצונך להמשיך?");
    if(!confirmDelete){
      return;
    }
    this.updateMode[item.id] = true;
    this.serverService.deleteModel(item.id).subscribe(() => {
      alert("הדגם נמחק בהצלחה");
      this.presentedModels = this.presentedModels.filter(p => p.id != item.id);
      
      if(JSON.parse(localStorage.getItem("cars"))){
        let modelCars: cars[] = JSON.parse(localStorage.getItem("cars"));
        modelCars = modelCars.filter(p => p.model.id === item.id);
         for(let innerCar of modelCars){
           this.carHandler.modifyLocalStorage(innerCar);
         }  
      }
      
      this.updateMode[item.id] = false;
      
      },
    () => {alert("אירעה שגיאה בביצוע הפעולה, נא נסה שנית."); this.updateMode[item.id] = false;});
    
    
  }

}
