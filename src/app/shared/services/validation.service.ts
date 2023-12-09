import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import {} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  validateDuration(starts: string, ends: string) {
    return (formGroup: FormGroup) => {
      const startsControl = formGroup.controls[starts];
      const endsControl = formGroup.controls[ends];
      let startHours = 0;
      let startMinutes = 0;
      let endHours = 0;
      let endMinutes = 0;
      let middayStartControl = '';
      let middayEndControl = '';

      if (startsControl?.value && endsControl?.value) {
        startHours = +startsControl.value.split(':')[0];
        startMinutes = +startsControl.value.split(':')[1].split(' ')[0];
        endHours = +endsControl.value.split(':')[0];
        endMinutes = +endsControl.value.split(':')[1].split(' ')[0];
        middayStartControl = startsControl.value.split(' ')[1].toUpperCase();
        middayEndControl = endsControl.value.split(' ')[1].toUpperCase();
      }

      if (!startsControl || !endsControl) {
        return null;
      }

      if (
        formGroup.errors &&
        !formGroup.errors['hoursDifference'] &&
        !formGroup.errors['minutesDifference']
      ) {
        return null;
      }

      if (middayEndControl === 'AM' && endHours === 12 && startHours !== 12) {
        formGroup.setErrors({ hoursDifference: true });
        return { hoursDifference: true } as ValidationErrors;
      }

      if (middayStartControl === 'AM' && startHours === 12) {
        return null;
      }

      if (
        middayStartControl === 'PM' &&
        startHours === 12 &&
        middayEndControl === 'PM'
      ) {
        return null;
      }

      if (middayStartControl === 'PM' && middayEndControl === 'AM') {
        return { hoursDifference: true } as ValidationErrors;
      }

      if (endHours < startHours && middayEndControl === middayStartControl) {
        formGroup.setErrors({ hoursDifference: true });
        return { hoursDifference: true } as ValidationErrors;
      } else if (
        startHours === endHours &&
        endMinutes < startMinutes &&
        middayEndControl === middayStartControl
      ) {
        formGroup.setErrors({ minutesDifference: true });
        return { minutesDifference: true } as ValidationErrors;
      } else {
        formGroup.setErrors(null);
        return null;
      }
    };
  }
}
