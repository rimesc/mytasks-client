import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Priority } from '../api/priority';
import { TaskSpec } from '../api/task-spec';

@Component({
  selector: 'new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})
export class NewTaskModalComponent {
  task = new TaskSpec();
  priorities = Priority;

  constructor(public activeModal: NgbActiveModal) { }

  submit(): void {
    this.activeModal.close(this.task);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
