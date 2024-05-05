import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { Chord } from './midi/instruments/types/Chord';
import { Note } from './midi/instruments/types/Note';
import * as midiUtils from './midi/midi-utils';
import { MidiService } from './midi/midi.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  midiSvc = inject(MidiService);
  note = signal<Note | null>(null);
  chord = signal<Chord | null>(null);
  notes = toSignal(
    this.midiSvc.notes$.pipe(map((notes) => notes?.map((note) => note.note)))
  );

  constructor() {
    midiUtils
      .getMidiController()
      .then((midiAccess) => {
        this.midiSvc.setMidiAccess(midiAccess);
        this.midiSvc.selectMidiInput(midiUtils.getInputs(midiAccess)[0]); // DONT SET INPUT
      })
      .catch((error) => this.midiSvc.throwError(error.message));

    this.midiSvc.notePlayed$.pipe(takeUntilDestroyed()).subscribe({
      next: (note) => {
        this.note.set(note);
      },
    });

    this.midiSvc.chordPlayed$.pipe(takeUntilDestroyed()).subscribe({
      next: (chord) => {
        this.chord.set(chord);
      },
    });

    effect(() => {
      this.note();
      this.notes();
      this.chord();
    });
  }
}
