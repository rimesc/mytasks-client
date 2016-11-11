import { Component, Input } from '@angular/core';

import { Priority } from '../api/priority';
import { Task } from '../api/task';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent  {
  @Input()
  task: Task;

  priorities = Priority;

  isModified(): boolean {
    return this.task.updated !== this.task.created;
  }

}
