import { Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { InsturmentService } from '../../../midi/services/instrument.service';
import { PianoKeyClassPipe } from '../../pipes/piano-keys.pipe';
import { PianoSizeClassPipe } from './piano-overlay.pipe';
import {
  PianoOverlayKey,
  PianoSize,
  PianoSizeKeyOffset,
} from './piano-overlay.types';
import { startWith } from 'rxjs';

@Component({
  selector: 'piano-overlay',
  standalone: true,
  imports: [PianoKeyClassPipe, PianoSizeClassPipe],
  templateUrl: './piano-overlay.component.html',
  styleUrl: './piano-overlay.component.scss',
})
export class PianoOverlayComponent {
  instrumentSvc = inject(InsturmentService);

  pianoSize = signal<PianoSize>('49');
  offset = signal<PianoSizeKeyOffset>(36);
  selectedKeys = signal<number[]>([0, 4, 7]);

  keys = computed<PianoOverlayKey[]>(() => {
    const selectedKeys = this.selectedKeys().map((key) => key - this.offset());
    const offset = this.offset();
    return Array.from({ length: parseInt(this.pianoSize()) }, (_, i) => ({
      keyNumber: i,
      selected: selectedKeys?.includes(i) ?? false,
    }));
  });

  constructor() {
    this.instrumentSvc.notesDown$.pipe(takeUntilDestroyed()).subscribe({
      next: (notes) => {
        this.selectedKeys.set([...notes]);
      },
    });

    effect(() => {
      this.selectedKeys();
    });
  }
}
