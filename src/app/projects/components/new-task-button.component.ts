import { Component, Output, EventEmitter } from '@angular/core';

import { ModalService } from '../../core/modal.service';
import { TaskForm } from '../../api/task-form';
import { NewTaskModalComponent } from '../modals/new-task-modal.component';

@Component({
  selector: 'my-new-task-button',
  templateUrl: './new-task-button.component.html',
  styleUrls: ['./new-task-button.component.css']
})
export class NewTaskButtonComponent {
  @Output()
  submit = new EventEmitter<TaskForm>();

  constructor(private modals: ModalService) { }

  openModal(): void {
    this.modals.open<TaskForm>(NewTaskModalComponent).then(task => this.submit.emit(task)).catch(() => {});
  }

}
