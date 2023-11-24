import {Injectable} from '@angular/core';
import {Task} from './shared/models/task.model';
// @ts-ignore
import {init_tasks} from '../assets/todo-list.json';

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {

  tasks: Task[] = [];

  initialized = false;

  constructor() {
  }

  getTasks(): Task[] {
    this.init();
    return this.tasks;
  }

  delete(id: number): boolean {
    const remainingTasks = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.tasks.length; i++) {
      const currentTask = this.tasks[i];

      // we found the task to remove, we do not include it in our new array
      if (id === currentTask.id) {
        console.log('Skipping tash[' + currentTask.title + ']');
        continue;
      }

      remainingTasks.push(this.tasks[i]);
    }
    this.tasks = remainingTasks;
    return true;
  }

  get(id: number): Task | null {

    this.init();

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];

      // we found the task to remove, we do not include it in our new array
      if (task.id !== id) {
        continue;
      }
      return task;
    }

    return null;
  }

  add(title: string, note: string): void {
    const task = new Task(title, note, this.getHighestId() + 1);
    this.tasks.push(task);
  }

  update(id: number, title: string, note: string): Task | null {
    const task = this.get(id);
    if (task) {
      task.title = title;
      task.note = note;

      return task;
    }
    return null;
  }

  init(): void {
    if (this.initialized) {
      console.log('Already initialized');
      return;
    }
    console.log('Loading data from json file');

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < init_tasks.length; i++) {
      this.tasks.push(
        new Task(
          init_tasks[i].title,
          init_tasks[i].note,
          init_tasks[i].id)
      );
    }

    this.initialized = true;
  }

  getHighestId(): number {
    let highest = 0;
    this.init();
    this.tasks.forEach((currentTask: Task) => {
      if (currentTask.id < highest) {
        return;
      }
      highest = currentTask.id;
    });
    return highest;
  }

}
