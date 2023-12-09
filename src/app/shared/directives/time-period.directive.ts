import { Directive, Input } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { ValidationService } from '../services/validation.service';


@Directive({
  selector: '[appTimePeriod]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TimePeriodDirective, multi: true }]
})
export class TimePeriodDirective  implements Validator{
  @Input('appTimePeriod') timePeriod: string[] = [];
  constructor(private validator: ValidationService) { }
 

  validate(formGroup: FormGroup): ValidationErrors | null {
    return this.validator.validateDuration(this.timePeriod[0], this.timePeriod[1])(formGroup);
  }
}
