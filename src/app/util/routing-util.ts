import { ActivatedRouteSnapshot } from '@angular/router';

export function routeParam(route: ActivatedRouteSnapshot, key: string): any {
  return !!route ? (route.params[key] || routeParam(route.parent, key)) : undefined;
}
