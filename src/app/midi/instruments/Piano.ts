import { getScaleMaps } from './ScaleFactory';
import { Chord, Note, Scale } from './types';

export const getNoteOrChord = (notes: number[], scale: Scale): Note | Chord => {
  notes = notes.sort((a, b) => a - b).map((note) => note % 12);

  const [noteMap, chordMap] = getScaleMaps(scale);

  console.log(notes);

  if (notes.length === 1) {
    return noteMap[notes[0]];
  } else {
    return chordMap[notes.join(',')];
  }
};
