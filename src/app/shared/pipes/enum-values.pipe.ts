import { Pipe, PipeTransform } from '@angular/core';
import { EnumValues } from 'enum-values';

@Pipe({name: 'values'})
export class EnumValuesPipe implements PipeTransform {
  transform(value: any, args: string[]): any {
    return EnumValues.getValues(value);
  }
}
