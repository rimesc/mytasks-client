import { Injectable } from '@angular/core';

@Injectable()
export class ModalServiceStub {
  open = jasmine.createSpy('open');
  ask = jasmine.createSpy('ask');
}
