import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  map,
  of,
  shareReplay,
  switchMap
} from 'rxjs';
import { MidiMessage } from './MidiMessage';
import * as midiUtils from './midi-utils';

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

  private noteValues = new Subject<MidiMessage>();
  midiMessage$: Observable<MidiMessage | null> = this.selectedMidiInput$.pipe(
    switchMap((input: MIDIInput | null) => {
      if (!input) return of(null);
      return midiUtils.listenTo$(input, this.noteValues);
    }),
    filter((msg) => !!msg),
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
