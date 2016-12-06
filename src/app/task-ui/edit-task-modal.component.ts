import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskSpec } from '../api/task-spec';

@Component({
  selector: 'edit-task-modal',
  templateUrl: './edit-task-modal.component.html'
})
export class EditTaskModalComponent {
  task: TaskSpec;

  constructor(public activeModal: NgbActiveModal) { }

  submit(task: TaskSpec): void {
    this.activeModal.close(task);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
