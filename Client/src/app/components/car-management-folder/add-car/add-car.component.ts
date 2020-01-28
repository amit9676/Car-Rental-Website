import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { ServerService } from 'src/app/services/server.service';
import { carManufactors } from 'src/app/models/carManufactors';
import { carModels } from 'src/app/models/carModels';
import { carDesigns } from 'src/app/models/carDesigns';
import { Branches } from 'src/app/models/branches';
import { cars } from 'src/app/models/cars';
import { carGears } from 'src/app/models/carGears';
import { CarHandlerService } from 'src/app/services/car-handler.service';
import { ImagesHandlerService } from 'src/app/services/images-handler.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  public isFuture =  false;
  public existingCar = false;

  public allManufactors: carManufactors[];
  public allBranches: Branches[];
  public Allgears = [new carGears(1,"ידני"), new carGears(2,"אוטומטי")];
  public allCars: cars[];

  public allModels: carModels[];
  public presentedModels: carModels[];

  public allDesigns: carDesigns[];

  public givenCarNumber: string;
  public givenManufactor: string;
  public givenYear: number;
  public givenKilometrage: number;
  public givenDayRent: number;
  public givenLateRent: number;
  public givenFunctionality: boolean = true;
  public files: File = null;

  private connectionCheck: boolean[] = [];
  public loadPage = false;
  public errorPage = false;
  
  constructor(private DataShare: DataShareService, private serverService: ServerService, public carHandler: CarHandlerService,
     public imageService: ImagesHandlerService) { }

  ngOnInit() {
    this.DataShare.changeMessage("ניהול רכבים");
    this.loadItems();
    this.serverService.getTheDesigns().subscribe(items => {this.allDesigns = items; this.serverLoad(true);},
       () => {this.serverLoad(false);});

    this.serverService.getTheBranches().subscribe(items => {this.allBranches = items; this.serverLoad(true);},
      () => {this.serverLoad(false);});

  
    this.serverService.getTheManufactors().subscribe(items => {
      this.allManufactors = items;
      this.givenManufactor = String(items[0].id);
      this.serverLoad(true);
      },
      () => {this.serverLoad(false);});

    this.serverService.getTheModels().subscribe(items => {
      this.allModels = items;
      this.serverLoad(true);},
      () => { this.serverLoad(false);});
  }

  public serverLoad(condition: boolean){
    this.connectionCheck.push(condition);
    
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
      this.presentedModels = this.carHandler.getManufactorModels(this.allModels, this.allManufactors, this.givenManufactor);
      this.loadPage = true;
    }
  }

  public loadItems(){
    this.serverService.getTheCars().subscribe(items => {this.allCars = items; this.serverLoad(true);},
      () => {this.serverLoad(false);});
  }

  public addCar(manufactor: HTMLSelectElement, model: HTMLSelectElement,
     branch: HTMLSelectElement, design: HTMLSelectElement, gear: HTMLSelectElement){
      let chosenManufactor = this.allManufactors.find(p => p.id == Number(manufactor.value));
      let chosenModel = this.allModels.find(p => p.id == Number(model.value));
      let chosenGear = this.Allgears[Number(gear.value) - 1];
      let chosenBranch = this.allBranches.find(p => p.id == Number(branch.value));
      let chosenDesign = this.allDesigns.find(p => p.id == Number(design.value));
      let carToAdd = new cars(null, chosenManufactor, chosenModel, chosenGear, chosenDesign, this.givenCarNumber,
         chosenBranch, this.givenYear, this.givenDayRent, this.givenLateRent, this.givenKilometrage, this.givenFunctionality, null);

      this.loadPage = false;
      this.serverService.AddCar(carToAdd).subscribe(p => this.serverService.updateCarImage(p, this.files)
      .subscribe( () => {alert("הרכב נוסף בהצלחה!"); this.loadItems(); this.loadPage = true;}, err => {alert("חלה שגיאה בביצוע הפעולה, נא נסה שנית או בדוק את החיבור"); this.loadPage = true;}),
        () => {alert("חלה שגיאה בביצוע הפעולה, נא נסה שנית או בדוק את החיבור"); this.loadPage = true;});
      this.givenCarNumber = "";

     }

}
