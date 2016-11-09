import { Component, Input } from '@angular/core';

import { Task } from '../api/task';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent  {
  @Input()
  task: Task;

  isModified(): boolean {
    return this.task.updated !== this.task.created;
  }

}
