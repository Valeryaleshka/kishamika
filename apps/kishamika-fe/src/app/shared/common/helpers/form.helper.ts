import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function matchValidator(
  matchTo: string,
  reverse?: boolean,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent as FormGroup | null;

    if (parent && reverse) {
      const matchControl = parent.get(matchTo);
      if (matchControl) {
        matchControl.updateValueAndValidity();
      }
      return null;
    }

    const matchControl = parent?.get(matchTo);
    return parent && matchControl && control.value === matchControl.value
      ? null
      : { matching: true };
  };
}
