import {AbstractControl, ValidatorFn} from '@angular/forms';

export function testValidator(err: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return err;
  };
}
