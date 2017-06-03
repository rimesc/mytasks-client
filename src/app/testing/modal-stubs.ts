/* tslint:disable:directive-selector-prefix use-host-property-decorator no-input-rename */

import { Injectable } from '@angular/core';

@Injectable()
export class ModalServiceStub {
  contentName: string;
  initialForm: any;
  private _userInput: any;

  open<T>(content: any, form?: T): Promise<T> {
    this.contentName = content.name;
    this.initialForm = form;
    return this.userInput ? Promise.resolve(this.userInput) : Promise.reject({});
  }

  ask(content: any): Promise<void> {
    this.contentName = content.name;
    return this.userInput ? Promise.resolve() : Promise.reject({});
  }

  set userInput(form: any) {
    this._userInput = form;
  }

  get userInput() {
    return this._userInput;
  }
}
