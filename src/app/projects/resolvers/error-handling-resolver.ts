import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Error, isError } from '../../api/error';

export interface Resolved<T> {
  handle(onSuccess: (T) => void, onError?: (Error) => void);
}

export function resolve<T>(result: T): Resolved<T> {
  return new SuccessResolved(result);
};

export function fail<T>(error: Error): Resolved<T> {
  return new ErrorResolved(error);
};

class SuccessResolved<T> implements Resolved<T> {
  constructor(private object: T) { }

  handle(onSuccess: (T) => void, onError?: (Error) => void): void {
    return onSuccess(this.object);
  }
}

class ErrorResolved<T> implements Resolved<T> {
  constructor(private error: Error) { }

  handle(onSuccess: (T) => void, onError?: (Error) => void): void {
    return onError && onError(this.error);
  }
}

/**
 * Resolver that resolves to an object containing either the resulting object
 * or an error.
 */
export abstract class ErrorHandlingResolver<T> implements Resolve<Resolved<T>> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Resolved<T>> {
    return this.doResolve(route, state).then(this.handleSuccess).catch(this.handleError);
  }

  /**
   * Perform the actual resolution.  If the observable returned has an error, this will be
   * caught and handled by this class.
   */
  abstract doResolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<T>;

  private handleSuccess(result: T): Resolved<T> {
    return new SuccessResolved(result);
  }

  private handleError(error: any): Promise<Resolved<T>> {
    return isError(error) ? Promise.resolve(new ErrorResolved(error)) : Promise.reject(error);
  }

}
