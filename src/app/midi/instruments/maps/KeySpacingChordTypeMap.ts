import { ChordType } from "../types/Chord";

export const KeySpacingChordTypeMap: { [key in ChordType]: number[] } = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    diminished: [0, 3, 6],
    augmented: [0, 4, 8],
}
