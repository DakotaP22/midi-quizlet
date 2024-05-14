import { Pipe, PipeTransform } from '@angular/core';
import { PianoSize } from './piano-overlay.types';

@Pipe({
  name: 'pianoSizeClass',
  standalone: true,
})

export class PianoSizeClassPipe implements PipeTransform {
  transform(pianoSize: PianoSize): any {
    return `piano keys-${pianoSize}`;
  }
}
