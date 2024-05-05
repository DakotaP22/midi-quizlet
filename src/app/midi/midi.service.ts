import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounce,
  debounceTime,
  filter,
  map,
  of,
  scan,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import * as midiUtils from './midi-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as Piano from '../midi/instruments/Piano';
import { MidiMessage } from './MidiMessage';

@Injectable({ providedIn: 'root' })
export class MidiService {
  error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    null
  );

  midiAccess$: BehaviorSubject<MIDIAccess | null> =
    new BehaviorSubject<MIDIAccess | null>(null);

  midiInputs$ = this.midiAccess$.pipe(
    map((midiAccess) => (midiAccess ? midiUtils.getInputs(midiAccess) : []))
  );
  selectedMidiInput$: BehaviorSubject<MIDIInput | null> =
    new BehaviorSubject<MIDIInput | null>(null);

  // notePress$ = this.selectedMidiInput$.pipe(tap((data) => console.log(data)));
  private noteValues = new Subject<MidiMessage>();
  noteEvent$: Observable<MidiMessage | null> = this.selectedMidiInput$.pipe(
    switchMap((input: MIDIInput | null) => {
      if (!input) return of(null);
      return midiUtils.listenTo$(input, this.noteValues);
    }),
    filter((msg) => !!msg),
    shareReplay()
  );

  notesDown$ = this.noteEvent$.pipe(
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
    shareReplay()
  );

  notes$ = this.notesDown$.pipe(
    map((notes) => {
      if (!notes || notes.length < 1) return null;
      return Piano.getNotes(notes, { root: { note: 'C' }, type: 'major' });
    }),
    shareReplay()
  );

  notePlayed$ = this.notesDown$.pipe(
    map((notes) => {
      if (notes.length != 1) return null;

      return Piano.getNote(notes[0], { root: { note: 'C' }, type: 'major' });
    }),
    shareReplay()
  );

  chordPlayed$ = this.notesDown$.pipe(
    map((notes) => {
      if (notes.length < 3) return null;

      return Piano.getChord(notes, { root: { note: 'C' }, type: 'major' });
    }),
    shareReplay()
  );

  setMidiAccess(access: MIDIAccess) {
    this.midiAccess$.next(access);
  }

  selectMidiInput(input: MIDIInput | null) {
    this.selectedMidiInput$.next(input);
  }

  throwError(error: string) {
    this.error$.next(error);
  }
}
