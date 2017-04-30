import { element, by, ElementFinder } from 'protractor';

import { AnyPage } from './any.po';

export class ProjectsPage extends AnyPage {
  path = '/projects';

  get items() {
    return this.findAll(by.css('.list-group-item'));
  }

}

export class ProjectItem {

  constructor(private elem: ElementFinder) { }

}
