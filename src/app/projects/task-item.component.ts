import { Component, Input } from '@angular/core';

import { Priority } from '../api/priority';
import { State } from '../api/state';
import { Task } from '../api/task';

@Component({
  selector: 'my-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent  {
  @Input()
  task: Task;

  states = State;
  priorities = Priority;

  isModified(): boolean {
    return !!this.task.updated;
  }

}
