import {FormControl, FormGroup} from '@angular/forms';

export class FormUtils {
  static getErrors(formGroup: FormGroup): any {
    return Object.entries(formGroup.controls)
      .map(([name, control]) => {
        if (control instanceof FormControl) {
          return ({[name]: control.errors});
        } else {
          return {[name]: FormUtils.getErrors(control as FormGroup)};
        }
      }).reduce((a, b) => ({...a, ...b}));
  }

  static formGroupHasValidation(formGroup: FormGroup, validation: string): boolean {
    return Object.entries(formGroup.controls)
      .map(([name, control]) => {
        if (control instanceof FormControl) {
          return FormUtils.formControlhasValidation(control, validation);
        } else {
          return FormUtils.formGroupHasValidation(control as FormGroup, validation);
        }
      }).reduce((a, b) => a || b);
  }

  static formControlhasValidation(control: FormControl, validation: string): boolean {
    if (control.errors === null) {
      return false;
    }
    return Object.values(control.errors).filter(({type}) => type === validation).length > 0;
  }
}
