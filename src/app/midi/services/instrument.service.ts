import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  scan,
  shareReplay,
  tap
} from 'rxjs';
import * as Piano from '../instruments/Piano';
import { Scale } from '../instruments/types/Scale';
import { MidiService } from './midi.service';

@Injectable({ providedIn: 'root' })
export class InsturmentService {
  midiSvc = inject(MidiService);
  scale$ = new BehaviorSubject<Scale>({ root: { note: 'C' }, type: 'major' });

  notesDown$ = this.midiSvc.midiMessage$.pipe(
    scan((acc, curr) => {
      if (!curr) return acc;

      if (curr.status === 'Note Off') {
        return acc.filter((note) => note !== curr.note);
      } else {
        acc.push(curr.note);
      }
      return acc;
    }, [] as number[]),
    debounceTime(50),
    shareReplay(),
  );

  notes$ = combineLatest({
    notes: this.notesDown$,
    scale: this.scale$,
  }).pipe(
    map(({ notes, scale }) => {
      if (!notes || notes.length < 1) return null;
      return Piano.getNotes(notes, scale);
    }),
    shareReplay()
  );

  notePlayed$ = combineLatest({
    notes: this.notesDown$,
    scale: this.scale$,
  }).pipe(
    map(({ notes, scale }) => {
      if (notes.length != 1) return null;
      return Piano.getNote(notes[0], scale);
    }),
    shareReplay()
  );

  chordPlayed$ = combineLatest({
    notes: this.notesDown$,
    scale: this.scale$,
  }).pipe(
    map(({ notes, scale }) => {
      if (notes.length < 3) return null;

      return Piano.getChord(notes, scale);
    }),
    shareReplay()
  );
}
