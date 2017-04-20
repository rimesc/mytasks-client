import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Priority } from '../api/priority';
import { TaskForm } from '../api/task-form';

class Tag {
  value: string;
  display: string;
}

@Component({
  selector: 'my-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input()
  action: string;

  @Input()
  task: TaskForm;

  priorities = Priority;

  allTags = []; // TODO load tags from API

  @Output()
  submit = new EventEmitter<TaskForm>();

  @Output()
  cancel = new EventEmitter<void>();

  doSubmit(): void {
    this.submit.emit(this.task);
  }

}
