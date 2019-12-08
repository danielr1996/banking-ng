import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'saldo'
})
export class SaldoPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string | number {
    if (value === undefined || value === null) {
      return '—';
    }
    return value;
  }

}
