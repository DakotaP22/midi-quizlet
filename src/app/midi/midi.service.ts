import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  debounce,
  debounceTime,
  map,
  of,
  scan,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import * as midiUtils from './midi-utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  noteEvent$ = this.selectedMidiInput$.pipe(
    switchMap((input: MIDIInput | null) => {
      // console.log(input);
      if (!input) return of();
      return midiUtils.listenTo$(input);
    }),
    shareReplay()
  );

  notesDown$ = this.noteEvent$.pipe(
    scan((acc, curr) => {
      if (curr.status === 'Note Off') {
        return acc.filter((note) => note !== curr.note);
      } else {
        acc.push(curr.note);
      }
      return acc;
    }, [] as number[]),
    debounceTime(50)
  );

  setMidiAccess(access: MIDIAccess) {
    this.midiAccess$.next(access);
  }

  selectMidiInput(input: MIDIInput) {
    this.selectedMidiInput$.next(input);
  }

  throwError(error: string) {
    this.error$.next(error);
  }

  constructor() {
    this.notesDown$.pipe(takeUntilDestroyed()).subscribe((notes) => {
      console.log('Notes down:', notes);
    });
  }
}
