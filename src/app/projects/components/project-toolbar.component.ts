import { Component, Output, EventEmitter } from '@angular/core';

import { TaskForm } from '../../api/task-form';

@Component({
  selector: 'my-project-toolbar',
  templateUrl: './project-toolbar.component.html',
  styleUrls: ['./project-toolbar.component.css']
})
export class ProjectToolbarComponent {
  @Output()
  edit = new EventEmitter<void>();
  @Output()
  newTask = new EventEmitter<TaskForm>();
  @Output()
  delete = new EventEmitter<void>();

}
