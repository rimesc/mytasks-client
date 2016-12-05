import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskSpec } from '../api/task-spec';

@Component({
  selector: 'new-task-modal',
  templateUrl: './new-task-modal.component.html',
})
export class NewTaskModalComponent {
  task = new TaskSpec();

  constructor(public activeModal: NgbActiveModal) { }

  submit(task: TaskSpec): void {
    this.activeModal.close(task);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
