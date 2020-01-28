import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullVal'
})
export class NullValPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value == null){
      return "---";
    }
    return value;
  }

}
