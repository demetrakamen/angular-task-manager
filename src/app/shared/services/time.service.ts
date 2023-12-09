import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  constructor() {}

  transformTime(form: NgForm, date: Date): { startTime: Date; endTime: Date } {
    let dateStartControl = new Date(date);
    let dateEndControl = new Date(date);

    const startHours = form?.value?.duration?.starts.split(':')[0];
    const startMinutes = form?.value?.duration?.starts
      .split(':')[1]
      .split(' ')[0];
    // am or pm - 12 hours format
    let format = form?.value?.duration?.starts.split(':')[1].split(' ')[1];
    let time = this.transformIn24Format(startHours, startMinutes, format);
    dateStartControl.setHours(time.hours, time.minutes);

    const endHours = form?.value?.duration?.ends.split(':')[0];
    const endMinutes = form?.value?.duration?.ends.split(':')[1].split(' ')[0];

    format = form?.value?.duration?.ends.split(':')[1].split(' ')[1];
    time = this.transformIn24Format(endHours, endMinutes, format);

    dateEndControl.setHours(time.hours, time.minutes);

    // debugger
    return {
      startTime: dateStartControl,
      endTime: dateEndControl,
    };
  }

  transformIn24Format(
    hours: string,
    minutes: string,
    format: string
  ): { hours: number; minutes: number } {
    let time = { hours: +hours, minutes: +minutes };

    if (format.toLowerCase() === 'am' && hours === '12') {

      time.hours = 0;
    }
  
    if (format.toLowerCase() === 'pm') {
      let h = +hours;
      if (+hours !== 12) {
        h += 12;
      }
      time = { hours: h, minutes: +minutes };
      return time;
    }

    return time;
  }
}
