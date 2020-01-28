import { Injectable } from '@angular/core';
import { carModels } from '../models/carModels';
import { carManufactors } from '../models/carManufactors';
import { cars } from '../models/cars';

@Injectable({
  providedIn: 'root'
})
export class CarHandlerService {

  constructor() { }

  public getManufactorValue(manufactor: HTMLSelectElement):string{
    return manufactor.value;
  }

  public getManufactorModels(allModels: carModels[], allManufactors: carManufactors[], givenManufactor: string):carModels[]{
    if(allModels && allManufactors){
      return allModels.filter(p => p.manufactor.id == Number(givenManufactor))
    }
  }

  public checkForExistingCar(allCars: cars[], givenCarNumber: string,  car?: cars):boolean{
    if(car){
      for(let item of allCars){
        if(givenCarNumber == item.carNum && car.id != item.id){
          return true;
        }
      }
    }
    else{
      for(let item of allCars){
        if(givenCarNumber == item.carNum){
          return true;
        }
      }
    }
    return false;
  }

  public checkForFuture(givenYear: number):boolean{
    let currentYear = new Date().getFullYear();
    if(givenYear > currentYear){
      return true;
    }
    else{
      return false;
    }
  }

  public modifyLocalStorage(originalItem: cars ,newItem? :cars){
    let userSearchedCars:cars[] = JSON.parse(localStorage.getItem("cars"));
    let carToEdit = userSearchedCars.find(p => p.id === originalItem.id);

      if(userSearchedCars && carToEdit){
        newItem ? userSearchedCars.splice(userSearchedCars.indexOf(originalItem),1,newItem) : userSearchedCars = userSearchedCars.filter(t => t.id !== originalItem.id);
        localStorage.setItem("cars", JSON.stringify(userSearchedCars));
      }
  }
}


