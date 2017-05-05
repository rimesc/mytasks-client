import { by } from 'protractor';

import { Modal } from './modal.po';
import { TextInput } from './form-util';

export class NotesModal extends Modal {

  markdownInput = new TextInput('markdown');
  private submitButton = this.footer.element(by.css('.btn-primary'));
  private cancelButton = this.footer.element(by.css('.btn-secondary'));

  clear() {
    return this.markdownInput.clear();
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
