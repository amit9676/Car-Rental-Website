import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { carManufactors } from 'src/app/models/carManufactors';
import { carModels } from 'src/app/models/carModels';
import { givenData } from 'src/app/models/givenData';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public givenSearch = "";
  public givenStartDate: Date;
  public givenEndDate: Date;
  
  public manufactors: carManufactors[] = [];

  private allModels: carModels[] = [];
  public someModels: carModels[] = [];

  public givenYear: number;

  public givenData: givenData = new givenData();

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getTheManufactors().subscribe(items => this.manufactors = items);
    this.serverService.getTheModels().subscribe(items => this.allModels = items);
  }

  public filterModel(givenManufactor: HTMLInputElement){
    if(givenManufactor.value != "All"){
      this.someModels = this.allModels.filter(p => p.manufactor.manufactor.toString() == givenManufactor.value);
    }
    else{
      this.someModels = [];
    }


  }

  public searchItems(givenManufactor: HTMLInputElement, givenModel: HTMLInputElement, givenGear: HTMLInputElement){
    
      this.givenData.givenSearch = this.givenSearch;
      this.givenData.givenStartDate = this.givenStartDate;
      this.givenData.givenEndDate = this.givenEndDate;
      this.givenData.givenManufactor = givenManufactor.value;
      this.givenData.givenModel = givenModel.value;
      this.givenData.givenYear = this.givenYear;
      this.givenData.givenGear = givenGear.value;


      localStorage.setItem("searchData", JSON.stringify(this.givenData));
  }

}
