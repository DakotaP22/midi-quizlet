import { Note } from './Note';

export type ChordType = 'major' | 'minor' | 'diminished' | 'augmented';

export type Chord = {
  root: Note;
  type: ChordType;
  rootOctave?: number;
};

export type ChordMap = { [key: string]: Chord };
