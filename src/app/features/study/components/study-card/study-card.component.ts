import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StudyCardData } from './study-card.types';

@Component({
  selector: 'study-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './study-card.component.html',
  styleUrl: './study-card.component.scss'
})
export class StudyCardComponent {

  data = input.required<StudyCardData>();
  isCorrect = input<boolean | undefined>(undefined);
  outlineClass = computed(() => {
    const isCorrect = this.isCorrect();
    let outlineClass = '';
    if(isCorrect === undefined) {
      outlineClass = '';
    } else {
      outlineClass = isCorrect ? 'correct' : 'incorrect';
    }
    return `study-card ${outlineClass}`;
  });

  isFlipped = signal(false);



  flipCard() {
    this.isFlipped.update(curr => !curr);
  }
}


