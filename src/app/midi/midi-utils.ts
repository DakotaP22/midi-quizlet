import { Observable, Subject } from 'rxjs';

export type MidiMessage = {
  status: 'Note On' | 'Note Off';
  note: number;
};

export const getMidiPermissionStatus = async () => {
  const result = await navigator.permissions.query({
    name: 'midi' as PermissionName,
  });
  return result.state;
};

export const getMidiController = (): Promise<MIDIAccess> => {
  return new Promise((resolve, reject) => {
    navigator
      .requestMIDIAccess()
      .then((midiAccess) => resolve(midiAccess), reject);
  });
};

export const getInputs = (midiAccess: MIDIAccess): MIDIInput[] => {
  const inputs = [] as MIDIInput[];
  midiAccess.inputs.forEach((input) => inputs.push(input));
  return inputs;
};

export const listenTo$ = (input: MIDIInput, values$: Subject<MidiMessage>): Observable<MidiMessage> => {
  input.onmidimessage = (event: MIDIMessageEvent) => {
    if (!event.data) {
      return;
    }
    const [statusCode, note] = event.data;
    const status = statusCode == 144 ? 'Note On' : 'Note Off';
    const msg = { status, note } as MidiMessage;
    values$.next(msg);
  };
  // values$.subscribe({ next: (value) => console.log('Value:', value) });
  return values$;
};
