import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  openCalendar: boolean = true;
  selectedDate: Date = new Date();
  
  constructor(private store: Store<{ tasks: any }>) {
  }
  
  onOpenCalendar(): void {
    this.openCalendar = !this.openCalendar;
  }
}
