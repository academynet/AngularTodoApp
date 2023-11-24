import {Component, OnInit} from '@angular/core';
import {Task} from '../shared/models/task.model';
import {TaskStorageService} from '../task-storage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private storage: TaskStorageService) {
  }

  ngOnInit(): void {
    this.storage.init();
    this.tasks = this.storage.getTasks();
  }

  delete(id: number): void {
    this.storage.delete(id);
    this.tasks = this.storage.getTasks();
  }

}
