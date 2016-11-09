import { Component, Output, EventEmitter } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EditProjectModalComponent } from './edit-project-modal.component'

import { Project } from '../api/project';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'project-toolbar',
  templateUrl: './project-toolbar.component.html',
  styleUrls: ['./project-toolbar.component.css']
})
export class ProjectToolbarComponent {
  @Output()
  edit = new EventEmitter<void>();
  @Output()
  newTask = new EventEmitter<void>();
  @Output()
  delete = new EventEmitter<void>();

}
