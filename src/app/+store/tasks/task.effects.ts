import { map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { addTask, addTaskFailure, addTaskSuccess, deleteTask, deleteTaskFailure, deleteTaskSuccess, editTask, editTaskFailure, editTaskSuccess, finishTask, finishTaskFailure, finishTaskSuccess, loadTasks, loadTasksByDate, loadTasksByDateFailure, loadTasksByDateSuccess, loadTasksFailure, loadTasksSuccess, } from './task.actions';
import { TaskService } from '../../shared/services/task.service';
import { Task } from 'src/app/core/models/task.model';
import { sortTasksByStartingTime } from 'src/app/core/utils/sorting';
@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private taskService: TaskService,
  ) {}

  // loadTasks$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadTasks),
  //     mergeMap((action) =>
  //       this.taskService.getAllTasks().pipe(
  //         map(({ data }: any) => {
  //           console.log('vikaaaaaa bez data')
  //           return loadTasksSuccess({ tasks: data.allTasks as Task[] });
  //         }),
  //         catchError((error : any) => {
  //           return of(loadTasksFailure({ error }));
  //         })
  //       )
  //     )
  //   )
  // );

  loadTasksByDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasksByDate),
      mergeMap((action) => {
        return this.taskService.getTasksByDate(action.date).pipe(
          map(({ data }: any) => {
            const tasks =  sortTasksByStartingTime([...data.allTasks]);
            return loadTasksByDateSuccess({
              tasks: tasks as Task[],
            });
          }),
          catchError((error: any) => {
            return of(loadTasksByDateFailure({ error }));
          })
        );
      })
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      mergeMap((action) =>
        this.taskService.deleteTask(action.id).pipe(
          map(({ data }: any) => {
            const id = data.removeTask.id;
            return deleteTaskSuccess({ id });
          }),
          catchError((error: any) => {
            return of(deleteTaskFailure({ error }));
          })
        )
      )
    )
  );

  addTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTask),
        mergeMap((action) => {

         return this.taskService.addTask({ ...action }).pipe(
            map(({ data }: any) => {
              return addTaskSuccess(data.createTask);
            }),
            catchError((error: any) => {
              return of(addTaskFailure({ error }));
            })
          )}
        )
      ),
    // {
    //   dispatch: false,
    // }
  );

  editTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editTask),
        mergeMap((action) =>
          this.taskService.editTask({ ...action }).pipe(
            map(({ data }: any) => {
              return editTaskSuccess(data.updateTask);
            }),
            catchError((error: any) => {
              return of(editTaskFailure({ error }));
            })
          )
        )
      ),
  );

  finishTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(finishTask),
        mergeMap((action) =>
          this.taskService.finishTask(action.id, action.isDone).pipe(
            map(({ data }: any) => {
              const id = data.updateTask.id;
              const isDone = data.updateTask.done;
              return finishTaskSuccess({ id, isDone });
            }),
            catchError((error: any) => {
              return of(finishTaskFailure({ error }));
            })
          )
        )
      ),
  );
}
