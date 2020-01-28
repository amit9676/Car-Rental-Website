import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesManagerService {

  constructor() { }

  public getYear(date: Date): number {
    if(date){
      return date.getFullYear();
    }
    else return undefined;
  }

  public getMonth(date: Date): string {
    if(date){
      let m = date.getMonth();
      if (m < 9) {
        return '0' + String(m + 1);
      }
      else {
        return String(m + 1);
      }
    }
    else return undefined;
    

  }

  public getDay(date: Date): string {
    if(date){
      var d = date.getDate();

      if (d < 10) {
        return '0' + String(d);
      }
      else {
        return String(d);
      }
    }
    else return undefined;
  }

  public checkYearInput(year: number):string{
    if(year > 99 && year < 1000){
      return '0' + String(year);
    }
    else if(year > 9 && year < 100){
      return '00' + String(year);
    }
    else if(year > 0 && year < 10){
      return '000' + String(year);
    }
    else{ return String(year);}
  }

  public editDate(inputDate: HTMLInputElement): Date{

    if(inputDate.value){
      
      return new Date(inputDate.value);
      
    }
    else{
      return null;
    }
  }

  public checkDate(inputDate: any): boolean{
    let dateToCheck: Date;
    if(inputDate instanceof HTMLInputElement){
      dateToCheck = new Date(inputDate.value);
    }
    else{
      dateToCheck = new Date(inputDate);;
    }

    let today= new Date();
    let tommorow = new Date(today);
    tommorow.setDate(today.getDate() + 1);
    tommorow.setHours(0,0,0);

    if(dateToCheck >= tommorow){
      return true;
    }
    else{
      return false;
    }
  }

  public getDaysDifference(start: Date, end: Date, isActual?: boolean): number{

    let startDate = new Date(start);
    startDate.setHours(0,0,0,1);

    let endDate: Date;
    if(end){
      endDate = new Date(end);
      
      endDate.setHours(0,0,0,1);
      if(isActual){

        endDate.setHours(23,59,59,999);
      }
      if(startDate.getTime() >= endDate.getTime()){
        return 0;
      }
    }

    if(!end){
      if(new Date() > startDate){
        endDate = new Date();
        endDate.setHours(23,59,59,999);
        
      }
      else{
        return 0;
      }
    }

    let diff = Math.abs(startDate.getTime() - endDate.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
}
