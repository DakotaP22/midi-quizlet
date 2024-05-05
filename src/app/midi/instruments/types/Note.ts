export type BaseNote = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type accidental = 'b' | '#' | '';

export type Note = {
  note: `${BaseNote}${accidental}`;
  octave?: number;
};

export type NoteMap = { [key: number]: Note };
