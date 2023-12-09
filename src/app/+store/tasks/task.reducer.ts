import { createReducer, on } from '@ngrx/store';
import { Task } from '../../core/models/task.model';
import { addTask, addTaskFailure, addTaskSuccess, deleteTask, deleteTaskFailure, deleteTaskSuccess, editTask, editTaskFailure, editTaskSuccess, finishTask, finishTaskFailure, finishTaskSuccess, loadTasks, loadTasksByDate, loadTasksByDateFailure, loadTasksByDateSuccess, loadTasksFailure, loadTasksSuccess } from './task.actions';
import { sortTasksByStartingTime } from 'src/app/core/utils/sorting';

export interface TaskState {
  tasks: Array<Task>;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success' | string;
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
  status: 'pending',
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state: TaskState, task: Task) => ({
    ...state,
    status: 'adding',
    // tasks: [...state.tasks, { ...task }]
  })),
  on(addTaskSuccess, (state: TaskState, task: Task) => ({
    ...state,
    status: 'success adding',
    tasks: sortTasksByStartingTime([...state.tasks, { ...task }]),
  })),
  on(addTaskFailure, (state: TaskState, { error }) => ({
    ...state,
    error: error,
    status: 'error adding',
  })),
  on(editTask, (state: TaskState, task: Task) => ({
    ...state,
    status: 'editing',
  })),
  on(editTaskSuccess, (state: TaskState, task: Task) => ({
    ...state,
    status: 'success editing',
    // tasks: [...state.tasks.filter((task) => task.id !== task.id), { ...task }], // !!!!first filter the edited task and then add the task
    tasks: sortTasksByStartingTime([
      ...state.tasks.filter((i) => i.id !== task.id),
      { ...task },
    ]),
  })),
  on(editTaskFailure, (state: TaskState, { error }) => ({
    ...state,
    error: error,
    status: 'error editing',
  })),
  on(finishTask, (state: TaskState, { id, isDone }) => ({
    ...state,
    status: 'finishing Task',
  })),
  on(finishTaskSuccess, (state: TaskState, { id, isDone }) => ({
    ...state,
    status: 'success finishing task',
    tasks: state.tasks.map((task) => {
      if (task.id === id) {
        task =  { ...task, done: isDone};
      }
      return { ...task };
    }),
  })),
  on(finishTaskFailure, (state: TaskState, { error }) => ({
    ...state,
    error: error,
    status: 'error finishing',
  })),
  on(deleteTask, (state: TaskState, { id }) => ({
    ...state,
    status: 'deleting',
  })),
  on(deleteTaskSuccess, (state: TaskState, { id }) => ({
    ...state,
    status: 'success deleting',
    tasks: state.tasks.filter((task) => task.id !== id),
  })),
  on(deleteTaskFailure, (state: TaskState, { error }) => ({
    ...state,
    error: error,
    status: 'error deleting',
  })),
  on(loadTasksByDate, (state: TaskState) => ({
    ...state,
    status: 'loading tasks by date',
  })),
  on(loadTasksByDateSuccess, (state: TaskState, { tasks }) => ({
    ...state,
    tasks: [...tasks],
    error: null,
    status: 'success loading tasks by date',
  })),
  on(loadTasksByDateFailure, (state: TaskState, { error }) => ({
    ...state,
    error: error,
    status: 'error loading tasks by date',
  })),
  on(loadTasks, (state: TaskState) => ({
    ...state,
    status: 'loading',
  })),
  on(loadTasksSuccess, (state: TaskState, { tasks }) => ({
    ...state,
    tasks: tasks,
    error: null,
    status: 'success loading',
  })),
  on(loadTasksFailure, (state: TaskState, { error }) => ({
    ...state,
    error: error,
    status: 'error loading',
  }))
);
