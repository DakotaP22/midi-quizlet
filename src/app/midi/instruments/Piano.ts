import { getScaleMaps } from './ScaleFactory';
import { Chord, Note, Scale } from './types';

export const getNote = (note: number, scale: Scale): Note => {
  const [noteMap] = getScaleMaps(scale);
  return noteMap[note % 12];
};

export const getChord = (notes: number[], scale: Scale): Chord => {
  const [_, chordMap] = getScaleMaps(scale);
  return chordMap[
    notes
      .sort((a, b) => a - b)
      .map((note) => note % 12)
      .join(',')
  ];
};

export const getNotes = (notes: number[], scale: Scale): Note[] => {
  return notes
    .sort((a, b) => a - b)
    .map((note) => note % 12)
    .map((note) => getNote(note, scale));
};
