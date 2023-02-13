import { Pipe, PipeTransform } from '@angular/core';
import { Priority } from './priority';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  transform(key: string): string {
    switch(parseInt(key)) {
      case Priority.Unselected:
        return 'Unselected';
      case Priority.Low:
        return 'Low Priority';
      case Priority.Medium:
        return 'Medium Priority';
      case Priority.High:
        return 'High Priority';
      default:
        return 'error';
    }
  }

}
