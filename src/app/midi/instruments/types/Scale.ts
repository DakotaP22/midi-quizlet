import { Note } from './Note';

export type ScaleType = 'major' | 'minor' | 'diminished' | 'augmented';

export type Scale = {
  root: Note;
  type: ScaleType;
};
