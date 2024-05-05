import { ChordMap, NoteMap, Scale } from './types/types';
import * as C_Major from './scale-maps/C_Major';

export const getScaleMaps = (scale: Scale): [NoteMap, ChordMap] => {
  if (scale.root === 'C' && scale.type === 'major') {
    return [C_Major.Notes, C_Major.Chords];
  }

  return [{} as NoteMap, {} as ChordMap];
};
