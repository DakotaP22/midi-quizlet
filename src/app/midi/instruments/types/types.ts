export type BaseNote = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type accidental = 'b' | '#' | '';
export type ChordType = 'major' | 'minor' | 'diminished' | 'augmented';
export type ScaleType = 'major' | 'minor' | 'diminished' | 'augmented';

export type Note = {
  note: `${BaseNote}${accidental}`;
  octave?: number;
};

export type Chord = {
  root: Note;
  type: ChordType;
  rootOctave?: number;
};

export type Scale = {
  root: Note;
  type: ScaleType;
};

export type ChordMap = { [key: string]: Chord };
export type NoteMap = { [key: number]: Note };
