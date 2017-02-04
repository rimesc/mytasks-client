/* tslint:disable:directive-selector-prefix use-host-property-decorator no-input-rename */

import { Directive, Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// See https://angular.io/docs/ts/latest/guide/testing.html#!#routed-component
@Injectable()
export class ActivatedRouteStub {

  private paramsSubject = new BehaviorSubject({});
  private dataSubject = new BehaviorSubject({});

  params = this.paramsSubject.asObservable();
  data = this.dataSubject.asObservable();

  set testParams(params: {}) {
    this.paramsSubject.next(params);
  }

  set testData(data: {}) {
    this.dataSubject.next(data);
  }

  set testError(error: {}) {
    this.dataSubject.error(error);
  }

  get snapshot() {
    return { params: this.paramsSubject.getValue(), data: this.dataSubject.getValue() };
  }
}

@Injectable()
export class RouterStub {

  lastNavigatedTo: any[];

  navigate(commands: any[]) {
    this.lastNavigatedTo = commands;
  }

}

// See https://angular.io/docs/ts/latest/guide/testing.html#router-link-stub
@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
