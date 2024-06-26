import { getScaleMaps } from './maps/scale-maps/ScaleFactory';
import { Chord } from './types/Chord';
import { BaseNote, Note } from './types/Note';
import { Scale } from './types/Scale';
import { NoteToKeyMap } from './maps/NoteToKeyMap';
import { KeySpacingChordTypeMap } from './maps/KeySpacingChordTypeMap';

export const getNote = (note: number, scale: Scale): Note | null => {
  const [noteMap] = getScaleMaps(scale);
  const newNote = noteMap[note % 12];

  if (!newNote) return null;

  newNote.octave = Math.floor(note / 12);
  return { ...newNote };
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
  return { ...newChord };
};

export const getNotes = (notes: number[], scale: Scale): Note[] => {
  const newNotes = notes
    .sort((a, b) => a - b)
    .map((note) => note % 12)
    .map((note) => getNote(note, scale))
    .filter((note) => !!note) as Note[];

  return [...newNotes];
};

export const getKey = (note: Note): number => {
  return NoteToKeyMap[note.note] + ((note?.octave ?? 0) * 12);
}

export const getKeys = (chord: Chord): number[] => {
  const rootKey = getKey(chord.root);
  const keys = KeySpacingChordTypeMap[chord.type].map((spacing) => rootKey + spacing);
  return keys;
};

export const keyIsAccidental = (key: number): boolean => {
  return [1, 3, 6, 8, 10].includes(key % 12);
};
