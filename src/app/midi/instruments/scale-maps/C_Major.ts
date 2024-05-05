import { ChordMap, Note, NoteMap } from '../types';

export const Notes: NoteMap = {
  0: 'C',
  2: 'D',
  4: 'E',
  5: 'F',
  7: 'G',
  9: 'A',
  11: 'B',
};

export const Chords: ChordMap = {
  //compose key of comma separated notes and value of the chord name for C Major scale
  '0,4,7': { root: 'C', type: 'major' },
  '2,5,9': { root: 'D', type: 'minor' },
  '4,7,11': { root: 'E', type: 'minor' },
  '5,9,0': { root: 'F', type: 'major' },
  '7,11,2': { root: 'G', type: 'major' },
  '9,0,4': { root: 'A', type: 'minor' },
  '11,2,5': { root: 'B', type: 'diminished' },
};
