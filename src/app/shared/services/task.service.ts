import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GET_TASK, GET_ALL_TASKS, DELETE_TASK, ADD_TASK, UPDATE_TASK, GET_TASKS_BY_DATE, MARK_TASK_DONE, } from '../../graphql.operations';
import { Task } from 'src/app/core/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private apollo: Apollo) {}

  getTask(): Observable<unknown> {
    return this.apollo.watchQuery({ query: GET_TASK }).valueChanges;
  }

  getAllTasks(): Observable<unknown> {
    return this.apollo.watchQuery({ query: GET_ALL_TASKS }).valueChanges;
  }

  getTasksByDate(date: Date): Observable<unknown> {  
    return this.apollo.watchQuery({ query: GET_TASKS_BY_DATE, variables: { date: date } })
      .valueChanges;
  }

  deleteTask(id: number): Observable<unknown> {
    return this.apollo.mutate({
      mutation: DELETE_TASK,
      variables: {
        id: id,
      },
    });
  }

  addTask(task: Task): Observable<unknown> {
    return this.apollo.mutate({
      mutation: ADD_TASK,
      variables: {
        ...task,
      },
    });
  }

  editTask(task: Task): Observable<unknown> {
    const res = this.apollo.mutate({
      mutation: UPDATE_TASK,
      variables: {
        ...task,
      },
    });
    return res;
  }

  finishTask(id: number, isDone: boolean): Observable<unknown> {
    const res = this.apollo.mutate({
      mutation: MARK_TASK_DONE,
      variables: {
        id: id,
        done: isDone
      },
    });
    return res;
  }
}

// return  this.apollo.watchQuery({ query: GET_TASK }).valueChanges.subscribe(({data, error}: any) => {
//   this.task = data.Task as Task
//   this.error = error;
// });
