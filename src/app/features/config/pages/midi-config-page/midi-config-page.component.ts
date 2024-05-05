import { Component, Signal, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { filter, first, map, switchMap, take } from 'rxjs';
import * as midiUtils from '../../../../midi/midi-utils';
import { MidiService } from '../../../../midi/services/midi.service';

@Component({
  selector: 'app-midi-config-page',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './midi-config-page.component.html',
  styleUrl: './midi-config-page.component.scss'
})
export class MidiConfigPageComponent {
  midiSvc = inject(MidiService);

  availableMidiInputs: Signal<MIDIInput[]> = toSignal(this.midiSvc.midiInputs$, {initialValue: [] });
  selectedInput: Signal<MIDIInput | null> = toSignal(this.midiSvc.selectedMidiInput$, {initialValue: null});

  midiConfigForm = inject(FormBuilder).group({
    midiInputId: new FormControl<string | null>(null)
  })

  selectedMidiInputId$ = this.midiConfigForm.valueChanges.pipe(
    map(({ midiInputId }) => midiInputId ?? null)
  );

  constructor() {
    this.selectedMidiInputId$
      .pipe(
        takeUntilDestroyed(),
        switchMap((midiInputId) => this.midiSvc.midiInputs$.pipe(map((inputs) => inputs.find((input) => input.id === midiInputId)))),
      ).subscribe((midiInput) => {
        this.midiSvc.selectMidiInput(midiInput ?? null);
      });

    this.midiSvc.selectedMidiInput$
      .pipe(
        takeUntilDestroyed(),
        filter((midiInput) => !!midiInput),
        first()
      )
      .subscribe((midiInput) => {
        if(!midiInput?.id ) return;
        this.midiConfigForm.patchValue({ midiInputId: midiInput.id });
      });
  }

}
