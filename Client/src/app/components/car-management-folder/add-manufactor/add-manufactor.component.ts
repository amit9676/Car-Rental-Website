import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { ServerService } from 'src/app/services/server.service';
import { carManufactors } from 'src/app/models/carManufactors';

@Component({
  selector: 'app-add-manufactor',
  templateUrl: './add-manufactor.component.html',
  styleUrls: ['./add-manufactor.component.css']
})
export class AddManufactorComponent implements OnInit {

  public manufactorName: string = "";
  public existingManufactor = false;

  public allManufactors: carManufactors[];

  public loadPage = false;
  public errorPage = false;


  constructor(private DataShare: DataShareService, private serverService: ServerService) { }

  ngOnInit() {
    this.DataShare.changeMessage("ניהול יצרנים");
    this.loadItems();
  }

  private loadItems(){
    this.serverService.getTheManufactors().subscribe(item => {this.allManufactors = item; this.loadPage = true;},
      () => {alert("חלה בעיה בטעינת הדף, נא רענן את העמוד או בדוק את החיבור."); this.errorPage = true;});
  }

  public addManufactor(){
    let manufactorToAdd = new carManufactors();
    manufactorToAdd.manufactor = this.manufactorName;
    this.loadPage = false;

    this.serverService.AddManufactors(manufactorToAdd).subscribe(p => {alert("היצרן נוסף למערכת.");
      this.loadItems();
      this.loadPage = true;
    },
     () => {alert("חלה שגיאה בהוספת היצרן למערכת, נא בדוק שוב את החיבור."); this.loadPage = true;});
     this.manufactorName = "";
  }

  public checkManufactorValidation(){
    this.existingManufactor = false;
    for(let item of this.allManufactors){
      if(this.manufactorName.toLowerCase() == item.manufactor.toLowerCase()){
        this.existingManufactor = true;
        break;
      }
    }
  }

}
