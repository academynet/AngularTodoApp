import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TaskStorageService} from '../task-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  title = new FormControl('');
  note = new FormControl('');

  constructor(
    private storage: TaskStorageService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  createTask(): void {
    this.storage.add(this.title.value, this.note.value);
    this.router.navigate(['/tasks']);
  }

}
