import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'subString'})
export class SubStringPipe implements PipeTransform {
  transform(description: string): any {
    return (description.substring(0,50)+"...");
  }
}