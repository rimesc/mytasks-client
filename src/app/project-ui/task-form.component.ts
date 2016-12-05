import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Priority } from '../api/priority';
import { TaskSpec } from '../api/task-spec';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input()
  action: string;

  @Input()
  task: TaskSpec;

  priorities = Priority;

  @Output()
  submit = new EventEmitter<TaskSpec>();

  @Output()
  cancel = new EventEmitter<void>();

  doSubmit(): void {
    this.submit.emit(this.task);
  }
}
