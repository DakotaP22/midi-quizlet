import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'study-action-bar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './study-action-bar.component.html',
  styleUrl: './study-action-bar.component.scss'
})
export class StudyActionBarComponent {

  totalCards = signal<number>(7);
  currentCard = signal(1);

  onNextCardClick() {
    this.currentCard.update((value: number) => Math.min(value + 1, this.totalCards()));
  }

  onPrevCardClick() {
    this.currentCard.update((value: number) =>
      Math.max(value - 1, 0)
    );
  }

}
