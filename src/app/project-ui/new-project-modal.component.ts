import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectForm } from '../api/project-form';

@Component({
  selector: 'new-project-modal',
  templateUrl: './new-project-modal.component.html'
})
export class NewProjectModalComponent {
  project = new ProjectForm();

  constructor(public activeModal: NgbActiveModal) { }

  submit(project: ProjectForm): void {
    this.activeModal.close(project);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
