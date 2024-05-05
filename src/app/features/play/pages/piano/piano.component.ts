import { Component, effect, inject, signal } from '@angular/core';
import { MidiService } from '../../../../midi/midi.service';
import { BaseNote, Note } from '../../../../midi/instruments/types/Note';
import { Chord } from '../../../../midi/instruments/types/Chord';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-piano',
  standalone: true,
  imports: [],
  templateUrl: './piano.component.html',
  styleUrl: './piano.component.scss',
})
export class PianoComponent {
  midiSvc = inject(MidiService);

  note = toSignal(this.midiSvc.notePlayed$, {
    initialValue: null,
  });
  chord = toSignal(
    this.midiSvc.chordPlayed$,
    {
      initialValue: null,
    }
  );
  notes = toSignal(
    this.midiSvc.notes$.pipe(map((notes) => notes?.map((note) => note.note))),
    { initialValue: [] }
  );

  constructor() {
    effect(() => {
      this.notes();
    });
  }
}
