import { getScaleMaps } from './ScaleFactory';
import { Chord, Note, Scale } from './types/types';

export const getNote = (note: number, scale: Scale): Note | null => {
  const [noteMap] = getScaleMaps(scale);
  const newNote = noteMap[note % 12];

  if (!newNote) return null;

  newNote.octave = Math.floor(note / 12);
  return newNote;
};

export const getChord = (notes: number[], scale: Scale): Chord | null => {
  const [_, chordMap] = getScaleMaps(scale);
  const newChord =
    chordMap[
      notes
        .sort((a, b) => a - b)
        .map((note) => note % 12)
        .join(',')
    ];

  if (!newChord) return null;

  newChord.rootOctave = Math.floor(notes[0] / 12);
  return newChord;
};

export const getNotes = (notes: number[], scale: Scale): Note[] => {
  return notes
    .sort((a, b) => a - b)
    .map((note) => note % 12)
    .map((note) => getNote(note, scale))
    .filter((note) => !!note) as Note[];
};
