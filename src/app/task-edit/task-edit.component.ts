import {Component, OnInit} from '@angular/core';
import {TaskStorageService} from '../task-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Task} from '../shared/models/task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {

  task: Task | null = null;
  id = 0;
  title = new FormControl('');
  note = new FormControl('');

  constructor(private storage: TaskStorageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paramId = params.get('id');
      if (paramId) {
        this.task = this.storage.get(parseInt(paramId, 0));
        if (this.task) {
          this.id = this.task.id;
          this.note.setValue(this.task.note);
          this.title.setValue(this.task.title);
        }
      }
    });
  }

  updateTask(): void {
    this.task = this.storage.update(this.id, this.title.value, this.note.value);
    this.router.navigate(['/tasks']);
  }
}
