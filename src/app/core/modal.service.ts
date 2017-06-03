import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalContent } from './modal-content';

@Injectable()
export class ModalService {
  constructor(private modalService: NgbModal) { }

  /**
   * Opens a large modal dialog suitable for presenting a form.
   * @param content component to use for the content of the modal
   * @param form initial form data with which to populate the dialog
   */
  open<T>(content: any, form?: T): Promise<T> {
    let ref = this.modalService.open(content);
    if (form) {
      (ref.componentInstance as ModalContent<T>).form = Object.assign({}, form);
    }
    return ref.result;
  }

  /**
   * Opens a small modal dialog suitable for asking for confirmation of an operation.
   * @param content component to use for the content of the modal
   */
  ask(content: any): Promise<void> {
    return this.modalService.open(content, { size: 'sm' }).result;
  }
}
