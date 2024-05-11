import { Component, computed, signal } from '@angular/core';
import { Chord } from '../../../../midi/instruments/types/Chord';
import { Note } from '../../../../midi/instruments/types/Note';
import * as Piano from '../../../../midi/instruments/Piano';

@Component({
  selector: 'piano-sample',
  standalone: true,
  imports: [],
  templateUrl: './piano-sample.component.html',
  styleUrl: './piano-sample.component.scss'
})
export class PianoSampleComponent {
  // expected = signal<Note | Chord>({root: {note: 'C', octave: 0}, type: 'major'} as Chord);
  expected = signal<Note | Chord>({note: 'C', octave: 3} as Note);

  keys = computed<number[]>(() => {
    const noteOrChord = this.expected();
    const note = noteOrChord as Note;
    const chord = noteOrChord as Chord;

    const padKeys = (keys: number[]) => {
      const min = Math.min(...keys);
      const max = Math.max(...keys);

      const padded = Array.from({length: max - min + 3}, (_, i) => i + min - 1);
      if(Piano.keyIsAccidental(padded[0])) {
        padded.unshift(padded[0] - 1);
      }

      if(Piano.keyIsAccidental(padded[padded.length - 1])) {
        padded.push(padded[padded.length - 1] + 1);
      }
      return padded;
    }

    if(chord?.root) {
      // chord
      chord.root.octave = 3;
      return padKeys(Piano.getKeys(chord))
    } else {
      // note
      return padKeys([Piano.getKey(note)]);
    }
  });
}
