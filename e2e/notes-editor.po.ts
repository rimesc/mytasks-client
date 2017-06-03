import { browser, element, by, ExpectedConditions } from 'protractor';

import { TextInput } from './form-util';

export class NotesEditor {

  markdownInput = new TextInput('markdown');
  private saveButton = element(by.css('my-notes .btn-primary'));
  private cancelButton = element(by.css('my-notes .btn-secondary'));

  clear() {
    return this.markdownInput.clear();
  }

  get canSave() {
    return this.saveButton.isEnabled();
  }

  save() {
    return this.saveButton.click().then(() => this.waitUntilClosed());
  }

  cancel() {
    // this method can't wait until closed because the user might need to confirm
    return this.cancelButton.click();
  }

  waitUntilClosed() {
    browser.wait(ExpectedConditions.invisibilityOf(this.markdownInput.input));
  }

}
