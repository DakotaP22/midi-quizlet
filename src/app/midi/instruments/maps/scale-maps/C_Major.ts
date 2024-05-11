import { ChordMap } from '../../types/Chord';
import { NoteMap } from '../../types/Note';

export const Notes: NoteMap = {
  0: { note: 'C' },
  2: { note: 'D' },
  4: { note: 'E' },
  5: { note: 'F' },
  7: { note: 'G' },
  9: { note: 'A' },
  11: { note: 'B' },
};

export const Chords: ChordMap = {
  //compose key of comma separated notes and value of the chord name for C Major scale
  '0,4,7': { root: { note: 'C' }, type: 'major' },
  '2,5,9': { root: { note: 'D' }, type: 'minor' },
  '4,7,11': { root: { note: 'E' }, type: 'minor' },
  '5,9,0': { root: { note: 'F' }, type: 'major' },
  '7,11,2': { root: { note: 'G' }, type: 'major' },
  '9,0,4': { root: { note: 'A' }, type: 'minor' },
  '11,2,5': { root: { note: 'B' }, type: 'diminished' },
};
