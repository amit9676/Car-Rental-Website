import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { ServerService } from 'src/app/services/server.service';
import { carDesigns } from 'src/app/models/carDesigns';

@Component({
  selector: 'app-add-design',
  templateUrl: './add-design.component.html',
  styleUrls: ['./add-design.component.css']
})
export class AddDesignComponent implements OnInit {
  public designName: string = "";
  public existingDesign = false;

  public allDesigns: carDesigns[];
  public loadPage = false;
  public errorPage = false;

  constructor(private DataShare: DataShareService, private serverService: ServerService) { }

  ngOnInit() {
    this.DataShare.changeMessage("ניהול סוגי רכב");
    this.loadItems();
  }

  private loadItems(){
    this.serverService.getTheDesigns().subscribe(items => {this.allDesigns = items; this.loadPage = true;},
      () => {alert("חלה בעיה בטעינת הדף, נא רענן את העמוד או בדוק את החיבור."); this.errorPage = true;});
  }

  public checkDesignValidation(){
    this.existingDesign = false;
    for(let item of this.allDesigns){
      if(this.designName.toLowerCase() == item.design.toLowerCase()){
        this.existingDesign = true;
        break;
      }
    }
  }

  public addDesign(){
    let designToAdd = new carDesigns();
    designToAdd.design = this.designName;
    this.loadPage = false;
    this.serverService.addDesign(designToAdd).subscribe(p => {alert("סוג הרכב נוסף למערכת.");
      this.loadItems();
      this.loadPage = true;},
      () => {alert("חלה שגיאה בהוספת סוג הרכב למערכת, נא בדוק שוב את החיבור."); this.loadPage = true;});
     this.designName = "";
  }

}
