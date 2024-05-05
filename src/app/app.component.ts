import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, RouterOutlet } from '@angular/router';
import * as MIDI from './midi/midi-utils';
import { MidiService } from './midi/midi.service';
import { Note, Chord, Scale } from './midi/instruments/types';
import { tap } from 'rxjs';

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
  notes = toSignal(this.midiSvc.notes$);

  constructor() {
    MIDI.getMidiController()
      .then((midiAccess) => {
        this.midiSvc.setMidiAccess(midiAccess);
        this.midiSvc.selectMidiInput(MIDI.getInputs(midiAccess)[0]);
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
