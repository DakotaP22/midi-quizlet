import { Observable, Subject } from 'rxjs';
import { MidiMessage } from './MidiMessage';

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

export const listInputsAndOutputs = (midiAccess: MIDIAccess) => {
  midiAccess.inputs.forEach((input) => {
    console.log(
      `Input port [type:'${input.type}']` +
        ` id:'${input.id}'` +
        ` manufacturer:'${input.manufacturer}'` +
        ` name:'${input.name}'` +
        ` version:'${input.version}'`
    );
  });

  midiAccess.outputs.forEach((output) => {
    console.log(
      `Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`
    );
  });
};

export const listenTo$ = (input: MIDIInput): Observable<MidiMessage> => {
  const values$ = new Subject<MidiMessage>();
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
