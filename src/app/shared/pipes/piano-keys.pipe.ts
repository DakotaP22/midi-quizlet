import { Pipe, PipeTransform } from "@angular/core";
import { keyIsAccidental } from "../../midi/instruments/Piano";

@Pipe({
  name: 'pianoKeyClass',
  standalone: true,
})
export class PianoKeyClassPipe implements PipeTransform {
  transform(key: number, selected: boolean = false): string {
    return `piano-keys ${
      keyIsAccidental(key) ? 'piano-keys black-key' : 'white-key'
    } ${selected ? 'selected' : 'unselected'}`;
  }
}
