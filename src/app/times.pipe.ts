import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'times',
})
export class TimesPipe implements PipeTransform {
  transform(time: number, ...args: unknown[]): number[] {
    const res = new Array(time).fill(null).map((_, index) => index);
    return res;
  }
}
