import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { ServerService } from 'src/app/services/server.service';
import { carDesigns } from 'src/app/models/carDesigns';
import { CarHandlerService } from 'src/app/services/car-handler.service';
import { cars } from 'src/app/models/cars';

@Component({
  selector: 'app-designs-manager',
  templateUrl: './designs-manager.component.html',
  styleUrls: ['./designs-manager.component.css']
})
export class DesignsManagerComponent implements OnInit {

  public allDesigns: carDesigns[];
  public presentedDesigns: carDesigns[] = [];

  public searchValue: string = "";
  public designValue: string = "";

  public existingDesign = false;

  public editMode: boolean[] = [];
  public updateMode: boolean[] = [];
  public pageLoad = false;
  public errorPage = false;

  constructor( private serverService: ServerService, private DataShare: DataShareService, 
    private carHandler: CarHandlerService) { }

  ngOnInit() {
    this.DataShare.changeMessage("ניהול סוגי רכב");
    this.loadItems();
  }

  private loadItems(){
    this.serverService.getTheDesigns().subscribe(items => {this.allDesigns = items; this.designFilter(); this.pageLoad = true;}
      , () => {alert("חלה בעיה בטעינת הדף, נא רענן את העמוד או בדוק את החיבור."); this.errorPage = true;});
  }

  public designFilter(){
    this.presentedDesigns = this.allDesigns;

    this.presentedDesigns = this.presentedDesigns.filter
    (p => p.design.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
  }

  public convertToInput(item: carDesigns):void{

    for(let i = 0; i < this.editMode.length; i++){
      this.editMode[i] = false;
    }
    this.editMode[item.id] = true;
    this.designValue = item.design;
  }

  public checkDesignValidation(givenDesign: carDesigns){
    this.existingDesign = false;
    for(let item of this.allDesigns){
      if(this.designValue.toLowerCase() == item.design.toLowerCase() && givenDesign.id != item.id){
        this.existingDesign = true;
        break;
      }
    }
  }

  public saveChanges(item: carDesigns){
    let designToUpdate = new carDesigns();
    designToUpdate.id = item.id;
    designToUpdate.design = this.designValue;

    this.updateMode[item.id] = true;

    this.serverService.updateDesign(designToUpdate).subscribe(p => {
      alert("הפרטים עודכנו בהצלחה");
      item.design = p.design;
       this.editMode[item.id] = false;
       this.updateMode[item.id] = false;
       },
     () => {alert("אירעה שגיאה בביצוע הפעולה, נא נסה שנית.");this.editMode[item.id] = false; this.updateMode[item.id] = false;});
  }

  public deleteDesign(item: carDesigns){
    let confirmDelete = confirm("אזהרה! מחיקת סוג רכב זה תמחק את כל הרכבים וההזמנות המשתמשים בסוג רכב זה." + 
    "\n אתה בטוח שברצונך להמשיך?");
    if(!confirmDelete){
      return;
    }
    this.updateMode[item.id] = true;

    this.serverService.deleteDesign(item.id).subscribe(() => {
      
       this.presentedDesigns = this.presentedDesigns.filter(p => p.id != item.id);

       if(JSON.parse(localStorage.getItem("cars"))){
        let designCars: cars[] = JSON.parse(localStorage.getItem("cars"));
        designCars = designCars.filter(p => p.design.id === item.id);
        for(let innerCar of designCars){
          this.carHandler.modifyLocalStorage(innerCar);
        }
       }
       

       this.updateMode[item.id] = false;
       alert("הסוג רכב נמחק בהצלחה");
      },
    () => {alert("אירעה שגיאה בביצוע הפעולה, נא נסה שנית."); this.updateMode[item.id] = false;});
  }

}
