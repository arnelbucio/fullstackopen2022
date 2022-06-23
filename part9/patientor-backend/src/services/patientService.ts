import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatientInfo } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getAllPublicPatientInfo = (): Array<PublicPatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientInfo = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
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
  getAllPublicPatientInfo,
  getPatientInfo,
  addPatient
};
