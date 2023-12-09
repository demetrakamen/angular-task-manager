import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';
import { loadTasksByDate } from 'src/app/+store/tasks/task.actions';
import { sellectAllTasks } from 'src/app/+store/tasks/task.selectors';
import { Task } from 'src/app/core/models/task.model';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TimeService } from 'src/app/shared/services/time.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  get selectedDate(): Date {
    return this._selectedDate;
  }
  set selectedDate(date: Date) {
    this._selectedDate = new Date(
      date.toLocaleString('en-us', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
      })
    );
    this.onSelectedDate(
      new Date(
        date.toLocaleString('en-us', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        })
      )
    );
  }
  _selectedDate!: Date;
  task!: Task | null;
  error: any;
  tasks$ = this.store.select(sellectAllTasks);
  tasks: Task[] = [];
  overlappingTasks: string[] = [];
  subscription!: Subscription;
  constructor(
    private store: Store<{ tasks: any }>,
    public dialog: MatDialog,
    private timeService: TimeService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.subscription = this.tasks$
      .pipe(
        mergeMap((data) => {
          data.forEach((task,i, arr) => {
            const overlappingArr = [...task.overlapping];
            this.overlappingTasks = overlappingArr.map((id) => {
              console.log(arr)
              let title = arr.find((task) => +task.id === +id)?.title;
              title = `Number: ${id}: ${title}`;
              return title;
            });
          });
          return data;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCreateTask(): void {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '50%',
      data: { date: this.selectedDate, tasks: this.tasks },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    // });
  }

  onSelectedDate(date: Date): void {
    this.store.dispatch(loadTasksByDate({ date }));
  }
}
