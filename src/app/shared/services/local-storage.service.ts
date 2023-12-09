import { Injectable } from '@angular/core';
import { Task } from 'src/app/core/models/task.model';



// TODO Feature
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveTask(taskKey: string, value: Task): void {
    localStorage.setItem(taskKey, JSON.stringify(value));
  }

  saveData(value: Array<Task>) {
    const arrayOfTasks = value.concat();
    arrayOfTasks.forEach((item, index) => {
      localStorage.setItem(index.toString(), JSON.stringify(item))
    });
  }

}
