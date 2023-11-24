import {Component, OnInit} from '@angular/core';
import {Task} from '../shared/models/task.model';
import {TaskStorageService} from '../task-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  task: Task | null = null;

  constructor(
    private storage: TaskStorageService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const paramId = params.get('id');
      if (paramId) {
        this.task = this.storage.get(parseInt(paramId, 0));
      }
    });
  }

  delete(id: number): void {
    if (this.task) {
      this.storage.delete(this.task.id);
      this.router.navigate(['/tasks']);
    }
  }
}
