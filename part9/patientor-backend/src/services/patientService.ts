import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatientInfo } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatientInfo = (): Array<NonSensitivePatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientInfo: NewPatientInfo): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patientInfo
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientInfo,
  addPatient
};
