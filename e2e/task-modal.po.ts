import { by } from 'protractor';

import { Modal } from './modal.po';
import { TextInput, Select } from './form-util';

export class TaskModal extends Modal {

  summaryInput = new TextInput('summary');
  prioritySelect = new Select('priority');
  // private tagsInput = this.body.element(by.name('tag-input'));
  private submitButton = this.footer.element(by.css('.btn-primary'));
  private cancelButton = this.footer.element(by.css('.btn-secondary'));

  selectPriority(priority: string) {
    return this.prioritySelect.choose(priority);
  }

  clear() {
    return this.summaryInput.clear();
  }

  get canSubmit() {
    return this.submitButton.isEnabled();
  }

  submit() {
    return this.submitButton.click().then(() => this.waitUntilClosed());
  }

  cancel() {
    return this.cancelButton.click().then(() => this.waitUntilClosed());
  }

}
