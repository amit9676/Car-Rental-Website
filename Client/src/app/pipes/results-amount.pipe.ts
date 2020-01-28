import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resultsAmountPipe'
})
export class ResultsAmountPipe implements PipeTransform {

  transform(value: any, args?: any[]): any {
    if (!value){
      return "לא נמצאו תוצאות";
      
    }
    else if(value === 1){
      return "נמצאה תוצאה 1";
    }
    return "נמצאו " + value + " תוצאות";
  }

}
