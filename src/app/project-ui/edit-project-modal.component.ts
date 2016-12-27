import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectForm } from '../api/project-form';
import { ModalContent } from '../shared/modal-content';

@Component({
  selector: 'my-edit-project-modal',
  templateUrl: './edit-project-modal.component.html'
})
export class EditProjectModalComponent extends ModalContent<ProjectForm> {
  constructor(activeModal: NgbActiveModal) {
    super(activeModal);
  }

  set project(project: ProjectForm) {
    this.form = project;
  }

  get project() {
    return this.form;
  }
}
