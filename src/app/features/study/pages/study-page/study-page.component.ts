import { Component } from '@angular/core';
import { PianoOverlayComponent } from '../../../../shared/components/piano-overlay/piano-overlay.component';
import { StudyCardComponent } from '../../components/study-card/study-card.component';
import { StudyCardData } from '../../components/study-card/study-card.types';

@Component({
  selector: 'app-study-page',
  standalone: true,
  imports: [PianoOverlayComponent, StudyCardComponent],
  templateUrl: './study-page.component.html',
  styleUrl: './study-page.component.scss'
})
export class StudyPageComponent {
  cardData: StudyCardData = {
    isChord: true,
    chordOrNoteName: 'C Major',
    notes: ['C', 'E', 'G'],
  }
}
