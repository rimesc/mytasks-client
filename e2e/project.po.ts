import { element, by } from 'protractor';

import { AnyPage } from './any.po';
import { ProjectHeaderPage } from './project-header.po';
import { DeleteModal } from './delete-modal.po';
import { NotesEditor } from './notes-editor.po';
import { ProjectModal } from './project-modal.po';
import { TaskModal } from './task-modal.po';
import { DiscardChangesModal } from './discard-changes-modal.po';

export class ProjectPage extends AnyPage {

  editProjectModal = new ProjectModal();
  deleteProjectModal = new DeleteModal();
  discardChangesModal = new DiscardChangesModal();
  newTaskModal = new TaskModal();
  notesEditor = new NotesEditor();
  header = new ProjectHeaderPage();

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
    return element(by.css('.project-nav button.btn-success'));
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
