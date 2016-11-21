import { Component, Output, EventEmitter } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EditProjectModalComponent } from './edit-project-modal.component'

import { Project } from '../api/project';
import { TaskSpec } from '../api/task-spec';
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
  newTask = new EventEmitter<TaskSpec>();
  @Output()
  delete = new EventEmitter<void>();

}
