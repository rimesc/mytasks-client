import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalContent } from './modal-content';

@Injectable()
export class ModalService {
  constructor(private modalService: NgbModal) { }

  open<T>(content: any, form?: T): Promise<T> {
    let ref = this.modalService.open(content);
    if (form) {
      (ref.componentInstance as ModalContent<T>).form = Object.assign({}, form);
    }
    return ref.result;
  }
}
