import { Injectable } from '@angular/core';

@Injectable()
export class ModalServiceSpy {
  open = jasmine.createSpy('open');
  ask = jasmine.createSpy('ask');
}
