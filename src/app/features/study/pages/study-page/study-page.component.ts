import { Component } from '@angular/core';
import { PianoOverlayComponent } from '../../../../shared/components/piano-overlay/piano-overlay.component';

@Component({
  selector: 'app-study-page',
  standalone: true,
  imports: [PianoOverlayComponent],
  templateUrl: './study-page.component.html',
  styleUrl: './study-page.component.scss'
})
export class StudyPageComponent {

}
