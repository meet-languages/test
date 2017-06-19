import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numNewMsg'})
export class numNewMsg implements PipeTransform {
  transform(array: any): number {
    return (array.messages.filter(this.isRead).length);
  }

  isRead(x: any) {
    if (!x.read)
      return true ;
  }
}