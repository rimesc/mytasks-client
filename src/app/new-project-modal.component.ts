import { Component, Input } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { ProjectService } from './project.service';

@Component({
  selector: 'new-project-modal',
  templateUrl: './new-project-modal.component.html',
  styleUrls: ['./new-project-modal.component.css']
})
export class NewProjectModalComponent {
  name: string;
  description: string;

  constructor(public activeModal: NgbActiveModal,
              private projectService: ProjectService) { }

  submit(): void {
    this.projectService.createProject(this.name, this.description).then(project => this.activeModal.close(project));
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
