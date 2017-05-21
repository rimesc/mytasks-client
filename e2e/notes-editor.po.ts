import { browser, element, by, ExpectedConditions } from 'protractor';

import { TextInput } from './form-util';

export class NotesEditor {

  markdownInput = new TextInput('markdown');
  private saveButton = element(by.css('my-markdown-card .btn-primary'));
  private cancelButton = element(by.css('my-markdown-card .btn-secondary'));

  clear() {
    return this.markdownInput.clear();
  }

  get canSave() {
    return this.saveButton.isEnabled();
  }

  save() {
    return this.saveButton.click().then(() => browser.wait(ExpectedConditions.invisibilityOf(this.markdownInput.input)));
  }

  cancel() {
    return this.cancelButton.click().then(() => browser.wait(ExpectedConditions.invisibilityOf(this.markdownInput.input)));
  }

}
