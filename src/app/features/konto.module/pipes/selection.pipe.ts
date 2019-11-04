import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'selection'
})
export class SelectionPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    if (!value) {
      return JSON.stringify([]);
    } else if (typeof value === 'string') {
      return JSON.stringify([value]);
    } else if (typeof value === 'object') {
      return JSON.stringify(value.map(konto => konto.id));
    }
    return JSON.stringify([]);
  }
}
