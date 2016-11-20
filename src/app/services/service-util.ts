import { Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Error } from '../api/error';

export class ServiceUtil {
  protected headers = new Headers({'Content-Type': 'application/json'});

  constructor(private baseUrl: string) { }

  private constructQueryString(params: Object): string {
    const keys = Object.keys(params);
    if (keys.length === 0) {
      return '';
    }
    return '?' + keys.map(k => {
      let value = params[k];
      return value instanceof Array ? (value as any[]).map(v => k + '=' + v).join('&') : k + '=' + value;
    }).join('&');
  }

  protected url(path: string | number = '', params: Object = {}): string {
    return this.baseUrl + path + this.constructQueryString(params);
  }

  protected handleError(error: any): Promise<any> {
    if (error instanceof Response) {
      return Promise.reject(error.json() as Error);
    }
    console.error('An unexpected error occurred: ', error);
    return Promise.reject(error.message || error);
  }
}
