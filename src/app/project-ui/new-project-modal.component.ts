import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectSpec } from '../api/project-spec';

@Component({
  selector: 'new-project-modal',
  templateUrl: './new-project-modal.component.html'
})
export class NewProjectModalComponent {
  project = new ProjectSpec();

  constructor(public activeModal: NgbActiveModal) { }

  submit(project: ProjectSpec): void {
    this.activeModal.close(project);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
