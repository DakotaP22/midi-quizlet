import { Pipe, PipeTransform } from '@angular/core';
import {keyIsAccidental, getNote } from '../../../../midi/instruments/Piano';
import { Scale } from '../../../../midi/instruments/types/Scale';
import { Note } from '../../../../midi/instruments/types/Note';

@Pipe({
  name: 'pianoKeyClass',
  standalone: true,
})
export class PaianoKeyClassPipe implements PipeTransform {
  transform(key: number, keysToPress: number[]): string {
    return `piano-keys ${keyIsAccidental(key) ? 'piano-keys black-key' : 'white-key'} ${keysToPress.includes(key) ? 'selected' : 'unselected'}`;
  }
}

@Pipe({
  name: 'keyToNote',
  standalone: true,
})
export class KeyToNotePipe implements PipeTransform {
  transform(key: number, scale: Scale): Note | null {
    return getNote(key, scale);
  }
}
