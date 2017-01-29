import { titleCase } from '../../../node_modules/change-case';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'titlecase'})
export class TitleCasePipe implements PipeTransform {
  transform(value: any, args: string[]): any {
    return titleCase(value.toLowerCase().split('_').join(' '));
  }
}

