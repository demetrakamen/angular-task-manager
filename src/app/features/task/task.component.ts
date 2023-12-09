import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addTask, deleteTask, finishTask } from 'src/app/+store/tasks/task.actions';
import { Task } from 'src/app/core/models/task.model';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements AfterViewInit {
  @ViewChild('timeIn12') timeIn12!: ElementRef;
  @Input() task!: Task ;
  @Input() selectedDate!: Date;
  color!: string;
  isVisible: boolean = true;
 
  constructor(private store: Store<{ tasks: any }>, public dialog: MatDialog,) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onEditTask(task: Task): void {
    
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '50%',
      data: { date: this.selectedDate, task: task, timeSpan: this.timeIn12.nativeElement.innerText},
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    // });
  }

  onAddTask(): void {
    const task = {
      id: -1,
      title: "Cool Project Expert",
      color: "blue",
      starts: new Date("November 21, 2023 05:15:00"),
      ends: new Date("November 21, 2023 05:30:00"),
      duration: 0.0,
      priority: "high",
      alert: true,
      done: false,
      upcoming: true,
      description: "Some description about it...",
      notes: [
        "Some thind 1",
        "Look at the YT video",
        "Ask for advise",
        "Learn about...",
      ],
      user_id: 1,
      overlapping: []
    }
    this.store.dispatch(addTask({...task}));
  }

  onRemoveTask(task: Task): void {
    this.store.dispatch(deleteTask({ id: task.id })) ;
  }

  onChangeVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  onFinishTask(id: number, isDone: boolean | undefined) {
    // TODO: Check why the done property can be undefined
    // If it is undefined, it will transform the value into boolean with !!
    isDone = !(!!isDone);
    this.store.dispatch(finishTask({ id: id, isDone: isDone }))
  }
  
  // private generateRandomColor() {
  //   const randomColor = (Math.floor(Math.random() * 2 ** 24)).toString(16).padStart(6, '0');
  //   return  '#' + randomColor;
  // }

  //   identify(index: number, item: Task): TrackByFunction<string>{
  //     return item ? item.id.toString() : undefined;
  // }
}
