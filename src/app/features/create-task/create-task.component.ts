import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addTask } from 'src/app/+store/tasks/task.actions';
import { Task } from 'src/app/core/models/task.model';
import { TimeService } from 'src/app/shared/services/time.service';

interface DialogData {
  date: Date;
  tasks: Task[];
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit, AfterViewInit {
  @ViewChild('taskForm') form!: NgForm;
  @Input() days!: number;
  @Input() date!: Date;
  constructor(
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<{ tasks: any }>,
    private time: TimeService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.form.setValue({
        color: 'blue',
        description: '',
        notes: '',
        notification: false,
        duration: {
          ends: '11:15 AM',
          starts: '11:00 AM',
        },
        priority: 'low',
        title: '',
        days: 1,
      });
    });
  }

  ngAfterViewInit(): void {}

  getErrorMessage() {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onFormSubmit(form: NgForm): void {
    if (form.value?.duration?.starts && form.value?.duration?.ends) {
      const timeSpan = this.time.transformTime(form, this.data.date);
      const breakpoints = /\, |\,\n/;
      const task: Task = {
        id: -1,
        overlapping: [],
        upcoming: false,
        done: false,
        user_id: 1,
        ...form.value,
        notes: form.value.notes.split(breakpoints),
        duration: 0,
        starts: timeSpan.startTime,
        ends: timeSpan.endTime,
        date: new Date(
          this.data.date.toLocaleString('en-us', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
          })
        ),
      };

      this.store.dispatch(addTask({ ...task }));
    }
  }
}
