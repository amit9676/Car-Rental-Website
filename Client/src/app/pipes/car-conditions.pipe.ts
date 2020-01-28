import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carConditions'
})
export class CarConditionsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value){
      return "כן";
    }

    return "לא";
  }

}
