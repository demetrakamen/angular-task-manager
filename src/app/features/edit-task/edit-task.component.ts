import { Component, Inject, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/app/core/models/task.model';
import { Store } from '@ngrx/store';
import { TimeService } from 'src/app/shared/services/time.service';
import { editTask } from 'src/app/+store/tasks/task.actions';

interface DialogData {
  date: Date;
  task: Task;
  timeSpan: string
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  @ViewChild('taskForm') form!: NgForm;
  @Input() days!: number;
  @Input() date!: Date;

  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<{ tasks: any }>,
    private time: TimeService
  ) {}


  ngOnInit(): void {
    const priority = this.data?.task?.priority?.toLowerCase();
    const starts = this.data.timeSpan.split(' - ')[0];
    const ends = this.data.timeSpan.split(' - ')[1];
   
    setTimeout(() => {
      this.form.setValue({
        color: 'blue',
        description: this.data.task.description,
        notes: this.data.task.notes,
        notification: this.data.task.alert ? true: false,
        duration: {
          ends: ends,
          starts: starts,
        },
        priority: priority,
        title: this.data.task.title,
        days: this.data.task.duration,
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
      const task: Task = {
        id: this.data.task.id,
        overlapping: [],
        upcoming: false,
        done: false,
        user_id: 1,
        ...form.value,
        duration: 1,
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

      this.store.dispatch(editTask({ ...task }));
    }
  }
}
