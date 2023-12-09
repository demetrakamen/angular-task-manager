import { createAction, props } from '@ngrx/store';
import { Task } from '../../core/models/task.model';


export const addTask = createAction(
  '[Tasks Page] Add Task',
  props<Task>()
);

export const addTaskSuccess = createAction(
  '[Tasks Page] Add Task Success',
  props<Task>()
);

export const addTaskFailure = createAction(
  '[Tasks Page] Add Task Failure',
  props<{ error: string }>()
); 

export const editTask = createAction(
  '[Tasks Page] Edit Task',
  props<Task>()
);

export const editTaskSuccess = createAction(
  '[Tasks Page] Edit Task Success',
  props<Task>()
);

export const editTaskFailure = createAction(
  '[Tasks Page] Edit Task Failure',
  props<{ error: string }>()
); 

export const finishTask = createAction(
  '[Tasks Page] Finish Task',
  props<{ id: number, isDone: boolean }>()
);

export const finishTaskSuccess = createAction(
  '[Tasks Page] Finish Task Success',
  props<{ id: number, isDone: boolean }>()
);

export const finishTaskFailure = createAction(
  '[Tasks Page] Finish Task Failure',
  props<{ error: string }>()
); 


export const deleteTask = createAction(
  '[Tasks Page] Delete Task',
  props<{ id: number }>()
);

export const deleteTaskSuccess = createAction(
  '[Tasks Page] Delete Task Success',
  props<{ id: number }>()
);

export const deleteTaskFailure = createAction(
  '[Tasks Page] Delete Task Failure',
  props<{ error: string }>()
); 

export const loadTasks = createAction(
  '[Tasks Page] Load Tasks'
);

export const loadTasksSuccess = createAction(
  '[Tasks Page] Load Tasks Success',
  props< { tasks: Array<Task> } >()
);

export const loadTasksFailure = createAction(
  '[Tasks Page] Load Tasks  Failure',
  props<{ error: string }>()
);

export const loadTasksByDate = createAction(
  '[Tasks Page] Load Tasks By Date',
  props<{date: Date}>()
);

export const loadTasksByDateSuccess = createAction(
  '[Tasks Page] Load Tasks By Date Success',
  props< { tasks: Array<Task> } >()
);

export const loadTasksByDateFailure = createAction(
  '[Tasks Page] Load Tasks By Date Failure',
  props<{ error: string }>()
);