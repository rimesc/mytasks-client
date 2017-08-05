import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Project } from '../../api/project';
import { TaskForm } from '../../api/task-form';

@Component({
  selector: 'my-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss']
})
export class ProjectHeaderComponent {
  @Input()
  project: Project;

  @Output()
  newTask = new EventEmitter<TaskForm>();
}
