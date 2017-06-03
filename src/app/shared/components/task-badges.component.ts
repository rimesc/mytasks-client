import { Component, Input } from '@angular/core';

import { Task } from '../../api/task';

@Component({
  selector: 'my-task-badges',
  templateUrl: './task-badges.component.html',
  styleUrls: ['./task-badges.component.scss']
})
export class TaskBadgesComponent {
  @Input()
  task: Task;
}
