import { getScaleMaps } from './maps/scale-maps/ScaleFactory';
import { Chord } from './types/Chord';
import { BaseNote, Note } from './types/Note';
import { Scale } from './types/Scale';
import { NoteToKeyMap } from './maps/NoteToKeyMap';

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

export const getKeys = (notes: Note[]): number[] => {
  return notes.map((note) => getKey(note));
};
