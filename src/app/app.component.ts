import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import * as MIDI from './midi/midi-utils';
import { MidiService } from './midi/midi.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  midiSvc = inject(MidiService);

  constructor() {
    MIDI.getMidiController()
      .then((midiAccess) => {
        this.midiSvc.setMidiAccess(midiAccess);
        this.midiSvc.selectMidiInput(MIDI.getInputs(midiAccess)[0]);
      })
      .catch((error) => this.midiSvc.throwError(error.message));
  }
}
