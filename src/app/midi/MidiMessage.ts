export type MidiMessage = {
  status: 'Note On' | 'Note Off';
  note: number;
};
