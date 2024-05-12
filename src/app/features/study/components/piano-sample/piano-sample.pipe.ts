import { Pipe, PipeTransform } from '@angular/core';
import {keyIsAccidental} from '../../../../midi/instruments/Piano';

@Pipe({
  name: 'pianoKeyClass',
  standalone: true,
})

export class PaianoKeyClassPipe implements PipeTransform {
  transform(key: number, keysToPress: number[]): string {
    return `piano-keys ${keyIsAccidental(key) ? 'piano-keys black-key' : 'white-key'} ${keysToPress.includes(key) ? 'selected' : ''}`;
  }
}
