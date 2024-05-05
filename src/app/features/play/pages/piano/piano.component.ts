import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { InsturmentService } from '../../../../midi/instrument.service';
import { MidiService } from '../../../../midi/midi.service';

@Component({
  selector: 'app-piano',
  standalone: true,
  imports: [],
  templateUrl: './piano.component.html',
  styleUrl: './piano.component.scss',
})
export class PianoComponent {
  midiSvc = inject(MidiService);
  instrumentSvc = inject(InsturmentService);

  note = toSignal(this.instrumentSvc.notePlayed$, {
    initialValue: null,
  });
  chord = toSignal(this.instrumentSvc.chordPlayed$, {
    initialValue: null,
  });
  notes = toSignal(
    this.instrumentSvc.notes$.pipe(
      map((notes) => notes?.map((note) => note.note))
    ),
    { initialValue: [] }
  );

  constructor() {
    effect(() => {
      this.notes();
    });
  }
}
