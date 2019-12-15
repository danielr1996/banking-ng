import {AbstractControl, ValidatorFn} from '@angular/forms';

export function recommended(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    const vorhanden: boolean = control.value !== null && control.value !== undefined && control.value !== '';
    return !vorhanden ? {recommended: {type: 'warning'}} : null;
  };
}
