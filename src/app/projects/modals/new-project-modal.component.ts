import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalContent } from '../../core/modal-content';
import { ProjectForm } from '../../api/project-form';

@Component({
  selector: 'my-new-project-modal',
  templateUrl: './new-project-modal.component.html'
})
export class NewProjectModalComponent extends ModalContent<ProjectForm> {
  constructor(activeModal: NgbActiveModal) {
    super(activeModal);
    this.project = new ProjectForm();
  }

  set project(project: ProjectForm) {
    this.form = project;
  }

  get project() {
    return this.form;
  }
}
