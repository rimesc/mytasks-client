import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectSpec } from '../api/project-spec';

@Component({
  selector: 'edit-notes-modal',
  templateUrl: './edit-notes-modal.component.html'
})
export class EditNotesModalComponent {
  markdown: string;

  constructor(public activeModal: NgbActiveModal) { }

  doSubmit(): void {
    this.activeModal.close(this.markdown);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}