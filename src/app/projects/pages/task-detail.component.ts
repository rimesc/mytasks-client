import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

import { MessagesService } from '../services/messages.service';
import { ModalService } from '../../core/modal.service';
import { CanDeactivateComponent } from '../../core/unsaved-changes-guard.service';
import { EditTaskModalComponent } from '../modals/edit-task-modal.component';
import { DeleteTaskModalComponent } from '../modals/delete-task-modal.component';
import { NotesComponent } from '../../shared/components/notes.component';

import { Error } from '../../api/error';
import { Task } from '../../api/task';
import { TaskForm } from '../../api/task-form';
import { Priority } from '../../api/priority';
import { State } from '../../api/state';
import { TaskService } from '../../services/task.service';

// TODO move these onto the API
const transitions: Transition[] = [
  { label: 'Start work', from: State.TO_DO, to: State.IN_PROGRESS },
  { label: 'Pause work', from: State.IN_PROGRESS, to: State.ON_HOLD },
  { label: 'Done', from: State.IN_PROGRESS, to: State.DONE },
  { label: 'Resume work', from: State.ON_HOLD, to: State.IN_PROGRESS }
];

@Component({
  selector: 'my-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, CanDeactivateComponent {

  @ViewChild(NotesComponent)
  private notesComponent: NotesComponent;

  task: Task;
  priorities = Priority;

  constructor(private taskService: TaskService,
              private modals: ModalService,
              private messages: MessagesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTask();
  }

  canDeactivate(): Promise<boolean> {
    return this.notesComponent.tryCancel().then(() => true).catch(() => false);
  }

  getTask(): void {
    this.route.data.subscribe(
      (data: { task: Task }) => {
        this.task = data.task;
      },
      (error: Error) => this.messages.error(error.code, error.message)
    );
  }

  updateTask(form: TaskForm): void {
    this.taskService.updateTask(this.task.id, form).then(task => this.task = task);
  }

  deleteTask(): void {
    this.modals.open(DeleteTaskModalComponent)
      .then(() => this.taskService.deleteTask(this.task.id))
      .then(() => this.router.navigate(['projects/' + this.task.project.id + '/tasks']), () => {});
  }

  editTask(): void {
    this.modals.open(EditTaskModalComponent, {
      summary: this.task.summary,
      priority: this.task.priority,
      tags: this.task.tags.slice(0)
    })
    .then((task: TaskForm) => {
      Object.assign(this.task, task);
      this.updateTask(task);
    })
    .catch(() => { });
  }

  availableTransitions(): Transition[] {
    return transitions.filter(t => t.from === this.task.state);
  }

  performTransition(transition: Transition) {
    this.taskService.updateState(this.task.id, transition.to).then(task => this.task = task);
  }

  updateNotes(markdown: string): void {
    this.taskService.updateNotes(this.task.id, markdown).then(notes => this.task.notes = notes);
  }

}

interface Transition {
  label: string;
  from: State;
  to: State;
}
