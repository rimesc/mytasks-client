import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectService } from './project.service';

@Component({
  selector: 'edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.css']
})
export class EditProjectModalComponent {
  name: string;
  description: string;

  constructor(public activeModal: NgbActiveModal,
              private projectService: ProjectService) { }

  submit(): void {
    this.activeModal.close({name: this.name, description: this.description});
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
