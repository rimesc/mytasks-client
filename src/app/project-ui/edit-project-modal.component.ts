import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectForm } from '../api/project-form';

@Component({
  selector: 'my-edit-project-modal',
  templateUrl: './edit-project-modal.component.html'
})
export class EditProjectModalComponent {
  project: ProjectForm;

  constructor(public activeModal: NgbActiveModal) { }

  submit(project: ProjectForm): void {
    this.activeModal.close(project);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
