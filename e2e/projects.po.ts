import { element, by, ElementFinder } from 'protractor';

import { AnyPage } from './any.po';
import { ProjectModal } from './project-modal.po';

export class ProjectsPage extends AnyPage {
  path = '/projects';
  newProjectModal = new ProjectModal();

  get items() {
    return this.findAll(by.css('.list-group-item'), e => new ProjectItem(e));
  }

  item(index: number) {
    return this.items.then(items => items[index]);
  }

  get newProjectButton() {
    return element(by.css('.page-header button'));
  }

}

export class ProjectItem {

  constructor(private elem: ElementFinder) { }

  get name() {
    return this.titleElement.getText();
  }

  get link() {
    return this.titleElement.getAttribute('href');
  }

  get description() {
    return this.elem.element(by.css('p')).getText();
  }

  get openTasks() {
    return this.elem.element(by.css('.badge')).getText().then(text => +text);
  }

  go() {
    return this.titleElement.click();
  }

  private get titleElement() {
    return this.elem.element(by.css('h5 a'));
  }

}
