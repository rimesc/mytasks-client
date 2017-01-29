import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class ModalContent<T> {

  form: T;

  constructor(private activeModal: NgbActiveModal) { }

  submit = (form: T) => this.activeModal.close(form);

  cancel = () => this.activeModal.dismiss();

}
