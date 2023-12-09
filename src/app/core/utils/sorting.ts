import { Task } from '../models/task.model';

export const sortTasksByStartingTime = function (
  data: Array<Task>
): Array<Task> {

  let tasks = [...data].sort(
    (a, b): any => new Date(a.starts).getTime() - new Date(b.starts).getTime()
  );
  tasks = getOverrappingTasks(tasks);
  
  return tasks;
};

function getOverrappingTasks(data: Array<Task>) {
  const arrOfTasks = [...data];
  const tasks = arrOfTasks.map((a) => {
    const firstTaskEndingTime = new Date(a.ends).getTime();
    const firrstTaskStartingTime = new Date(a.starts).getTime();

    arrOfTasks.forEach((b) => {
      if (a.id !== b.id) {
        const secondTaskEndingTime = new Date(b.ends).getTime();
        const secondTaskStartingTime = new Date(b.starts).getTime();

        if (
          firrstTaskStartingTime > secondTaskStartingTime &&
          firrstTaskStartingTime < secondTaskEndingTime
        ) {
          // debugger
          const overlappingArr = a?.overlapping?.concat([b?.id?.toString()]);
          a = { ...a, overlapping: overlappingArr };
        } else if (
          firstTaskEndingTime <= secondTaskEndingTime &&
          firstTaskEndingTime > secondTaskStartingTime
        ) {
          //  debugger
          const overlappingArr = a?.overlapping?.concat([b?.id?.toString()]);
          a = { ...a, overlapping: overlappingArr };
        }

        if (
          firrstTaskStartingTime <= secondTaskStartingTime &&
          firstTaskEndingTime > secondTaskEndingTime
        ) {
          //  debugger
          const overlappingArr = a?.overlapping?.concat([b?.id?.toString()]);
          a = { ...a, overlapping: overlappingArr };
        }
      }
    });
    a = { ...a, overlapping: [...new Set(a.overlapping)].filter(x => x !== null) };
    return a;
  });

  // console.log(tasks);
  return tasks.concat([]);
}
