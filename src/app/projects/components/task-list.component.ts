import { Component, Input } from '@angular/core';

import { Priority } from '../../api/priority';
import { State } from '../../api/state';
import { Task } from '../../api/task';

@Component({
  selector: 'my-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  @Input()
  tasks: Task[];

  states = State;
  priorities = Priority;

  isModified(task: Task): boolean {
    return !!task.updated;
  }

}

