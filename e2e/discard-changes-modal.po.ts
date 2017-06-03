import { by } from 'protractor';

import { Modal } from './modal.po';

export class DiscardChangesModal extends Modal {

  private submitButton = this.footer.element(by.css('.btn-primary'));
  private cancelButton = this.footer.element(by.css('.btn-secondary'));

  submit() {
    return this.submitButton.click().then(() => this.waitUntilClosed());
  }

  cancel() {
    return this.cancelButton.click().then(() => this.waitUntilClosed());
  }

}
