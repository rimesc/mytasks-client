import { element, by } from 'protractor';

import { AnyPage } from './any.po';
import { DeleteModal } from './delete-modal.po';
import { NotesModal } from './notes-modal.po';
import { ProjectModal } from './project-modal.po';
import { TaskModal } from './task-modal.po';

export class ProjectPage extends AnyPage {

  editProjectModal = new ProjectModal();
  deleteProjectModal = new DeleteModal();
  newTaskModal = new TaskModal();
  editNotesModal = new NotesModal();

  constructor(id: number) {
    super();
    this.path = '/projects/' + id;
  }

  get description() {
    return element(by.css('.lead')).getText();
  }

  get openTasks() {
    return element(by.css('.open-tasks')).getText().then(text => +(text.split(' ')[0]));
  }

  get notes() {
    return element(by.css('.card-block')).getText();
  }

  get newTaskButton() {
    return element(by.css('.project-toolbar button.btn-primary'));
  }

  get editProjectButton() {
    return element(by.css('.project-toolbar')).element(by.partialButtonText('Edit'));
  }

  get deleteProjectButton() {
    return element(by.css('.project-toolbar')).element(by.partialButtonText('Delete'));
  }

  get editNotesButton() {
    return element(by.css('.btn.edit'));
  }

}
