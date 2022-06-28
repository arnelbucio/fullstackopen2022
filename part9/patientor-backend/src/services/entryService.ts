import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Entry, NewEntry } from '../types';

const addEntry = (entry: NewEntry, patientId: string): Entry => {
  const patient = patients.find(patient => patient.id === patientId);
  if (!patient) {
    throw new Error('Patient does not exist');
  }

  const id = uuid();
  const newEntry = {
    id,
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  addEntry
};
