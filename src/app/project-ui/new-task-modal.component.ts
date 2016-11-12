import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EnumValues } from 'enum-values';

import { Priority } from '../api/priority';
import { TaskForm } from './task-form';

@Component({
  selector: 'new-task-modal',
  templateUrl: './new-task-modal.component.html',
  styleUrls: ['./new-task-modal.component.css']
})
export class NewTaskModalComponent {
  task = new TaskForm();
  priorities = Priority;

  constructor(public activeModal: NgbActiveModal) { }

  submit(): void {
    this.activeModal.close(this.task);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
