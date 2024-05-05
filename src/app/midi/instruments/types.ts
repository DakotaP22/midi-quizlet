export type BaseNote = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type incindentals = 'b' | '#' | '';
export type ChordType = 'major' | 'minor' | 'diminished' | 'augmented';
export type ScaleType = 'major' | 'minor' | 'diminished' | 'augmented';

export type Note = `${BaseNote}${incindentals}`;

export type Chord = {
  root: Note;
  type: ChordType;
};

export type Scale = {
  root: Note;
  type: ScaleType;
};

export type ChordMap = { [key: string]: Chord };
export type NoteMap = { [key: number]: Note };
