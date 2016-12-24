import { Component, Output, EventEmitter } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EditProjectModalComponent } from './edit-project-modal.component'

import { Project } from '../api/project';
import { TaskForm } from '../api/task-form';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'project-toolbar',
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
