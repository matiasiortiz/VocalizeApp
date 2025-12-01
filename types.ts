export type Note = string; // e.g., "C4", "D#4"

export interface Scale {
  id: string;
  name: string;
  notes: Note[]; // Array of notes in the scale
  type: 'predefined' | 'custom';
}

export interface Settings {
  midiSound: string;
  notifications: boolean;
}