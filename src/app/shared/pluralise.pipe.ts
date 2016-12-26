import * as pluralize from 'pluralize';

import { Pipe, PipeTransform } from '@angular/core';

/**
 * Format a number of things taking into account plural forms.
 */
@Pipe({name: 'pluralise'})
export class PluralisePipe implements PipeTransform {
  transform(value: any, thing?: string): any {
    if (!thing) {
      return '' + value;
    }
    return (value === 0 ? 'no' : value) + ' ' + pluralize(thing, value);
  }
}

