import * as C_Major from './scale-maps/C_Major';
import { ChordMap } from './types/Chord';
import { NoteMap } from './types/Note';
import { Scale } from './types/Scale';

export const getScaleMaps = (scale: Scale): [NoteMap, ChordMap] => {
  if (scale.root.note === 'C' && scale.type === 'major') {
    return [C_Major.Notes, C_Major.Chords];
  }

  return [{} as NoteMap, {} as ChordMap];
};
