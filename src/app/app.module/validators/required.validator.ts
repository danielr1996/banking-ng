import {AbstractControl, ValidatorFn} from '@angular/forms';

export function required(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    const vorhanden: boolean = control.value !== null && control.value !== undefined && control.value !== '';
    return !vorhanden ? {required: {type: 'error'}} : null;
  };
}
