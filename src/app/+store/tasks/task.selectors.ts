import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TaskState } from './task.reducer';

export const sellectAllTasks = createSelector(
  (state: AppState) => state.tasks,
  (state: TaskState) => {
    return state.tasks;
  }
);
