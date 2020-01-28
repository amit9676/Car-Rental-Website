import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { ServerService } from 'src/app/services/server.service';
import { carManufactors } from 'src/app/models/carManufactors';
import { carModels } from 'src/app/models/carModels';

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit {
  public allManufactors: carManufactors[] = [];
  public selectedManufactor: carManufactors;

  public allModels: carModels[] = [];

  public modelName: string = "";
  public existingModel = false;

  private connectionCheck: boolean[] = [];
  public loadPage = false;
  public errorPage = false;

  constructor(private DataShare: DataShareService, private serverService: ServerService) { }

  ngOnInit() {
    this.DataShare.changeMessage("ניהול דגמים");
    this.serverService.getTheManufactors().subscribe(items => {
      this.allManufactors = items;
      this.selectedManufactor = items.find(p => p.id != null);
      this.serverLoad(true);
      },
      () => {this.allManufactors = null; this.serverLoad(false);});

    this.loadItems();
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
    }
  }

  private loadItems(){
    this.serverService.getTheModels().subscribe(items => {this.allModels = items; this.serverLoad(true);},
       () => {this.allModels = null; this.serverLoad(false);});
  }

  public getModelValue(manufactor: HTMLSelectElement){
    this.selectedManufactor = this.allManufactors.find(p => p.id === Number(manufactor.value));
    this.checkModelValidation();
  }

  public checkModelValidation(){
    this.existingModel = false;
    for(let item of this.allModels){
      if(this.modelName.toLowerCase() == item.model.toLowerCase() && this.selectedManufactor.manufactor == item.manufactor.manufactor){
        this.existingModel = true;
        break;
      }
    }
  }

  public addModel(){
    let modelToAdd = new carModels();
    modelToAdd.manufactor = this.selectedManufactor;
    modelToAdd.model = this.modelName;
    this.loadPage = false;
    this.serverService.AddModel(modelToAdd).subscribe(p => {
      alert("הדגם נוסף למערכת.");
      this.loadItems();
      this.loadPage = true;
    },
     err => {alert("חלה שגיאה בהוספת הדגם למערכת, נא בדוק שוב את החיבור."); this.loadPage = true;});
     this.modelName = "";
  }

}
