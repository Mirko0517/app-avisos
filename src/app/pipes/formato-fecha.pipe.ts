import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'formatoFecha'
})
export class FormatoFechaPipe implements PipeTransform {
  transform(value: Date): string {
    if (isNaN(value.getTime())) { // Check if the date is invalid
      console.warn('Invalid date provided to formatoFecha pipe');
      return 'Invalid date'; // Return a placeholder or an empty string
    }
    return new Intl.DateTimeFormat('es-ES').format(value);
  }
}
