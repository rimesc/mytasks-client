import { by } from 'protractor';

import { Modal } from './modal.po';

export class DeleteModal extends Modal {

  private deleteButton = this.footer.element(by.css('.btn-danger'));
  private cancelButton = this.footer.element(by.css('.btn-secondary'));

  confirm() {
    return this.deleteButton.click().then(() => this.waitUntilClosed());
  }

  cancel() {
    return this.cancelButton.click().then(() => this.waitUntilClosed());
  }

}
