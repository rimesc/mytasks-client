import { element, by, ElementFinder } from 'protractor';

import { AnyPage } from './any.po';

export class ProjectPage extends AnyPage {

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
    return element(by.css('.project-header button.btn-primary'));
  }

}
