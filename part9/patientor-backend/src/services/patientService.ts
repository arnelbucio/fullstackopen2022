import patients from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry } from '../types';

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries
};