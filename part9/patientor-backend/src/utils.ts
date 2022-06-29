import {
  NewPatientInfo,
  Gender,
  Entry,
  NewEntry,
  HealthCheckRating,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  Discharge,
  SickLeave,
  Diagnosis
} from './types';
import diagnoses from '../data/diagnoses';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }

  return date;
};

const parseSSN = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing SSN');
  }
  return name;
};

const parseOccupation = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing occupation');
  }
  return name;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): boolean => {
  if (entry && entry.type) {
    return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(entry.type as string);
  }
  return false;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (entries && Array.isArray(entries)) {
    if (!entries.length) {
      return [];
    }
    if (entries.every(entry => isEntry(entry))) {
      return entries as Entry[];
    }
  }
  throw new Error('Incorrect entries');
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isRating(rating)) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }
  return rating;
};

const isDiagnosisCodesArray = (arr: unknown[]): boolean => {
  if (arr.every(value => isString(value))) {
    const diagnosesCodes = diagnoses.map(diagnosis => diagnosis.code);
    if (arr.every(diagnosisCode => diagnosesCodes.includes(diagnosisCode as string))) {
      return true;
    }
  }
  return false;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> | undefined => {
  if (!diagnosisCodes) {
    return undefined;
  }

  if (Array.isArray(diagnosisCodes) && isDiagnosisCodesArray(diagnosisCodes)) {
    return diagnosisCodes as Array<Diagnosis['code']>;
  }

  throw new Error('Incorrect diagnosis codes');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (obj: any): obj is Discharge => {
  return (
    obj.date !== undefined && obj.criteria !== undefined &&
    isString(obj.date) && isString(obj.criteria) && isDate(obj.date as string)
  );
};

const parseDischarge = (discharge: unknown): Discharge =>  {
  if (discharge && (typeof discharge === 'object') && isDischarge(discharge)) {
    return discharge;
  }
  throw new Error('Incorrect or missing discharge');
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer');
  }
  return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (obj: any): obj is SickLeave => {
  if (obj.startDate && obj.endDate && isString(obj.startDate) && isString(obj.endDate)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return isDate(obj.startDate) && isDate(obj.endDate);
  }
  return false;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined =>  {
  if (!sickLeave) {
    return undefined;
  }

  if (sickLeave && (typeof sickLeave === 'object') && isSickLeave(sickLeave)) {
    return sickLeave;
  }
  throw new Error('Incorrect sick leave');
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientInfo = (object: any): NewPatientInfo => {
  const newPatientInfo: NewPatientInfo = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
  return newPatientInfo;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (entry: any): NewEntry => {
  if (entry && isEntry(entry)) {
    switch (entry.type) {
      case 'HealthCheck':
        const newHealthCheckEntry: NewHealthCheckEntry = {
          type: 'HealthCheck',
          description: parseDescription(entry.description),
          date: parseDate(entry.date),
          specialist: parseSpecialist(entry.specialist),
          healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
          diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
        };
        return newHealthCheckEntry;
      case 'Hospital':
        const newHospitalEntry: NewHospitalEntry = {
          type: 'Hospital',
          discharge: parseDischarge(entry.discharge),
          description: parseDescription(entry.description),
          date: parseDate(entry.date),
          specialist: parseSpecialist(entry.specialist),
          diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
        };
        return newHospitalEntry;
      case 'OccupationalHealthcare':
        const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
          type: 'OccupationalHealthcare',
          description: parseDescription(entry.description),
          date: parseDate(entry.date),
          specialist: parseSpecialist(entry.specialist),
          diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
          employerName: parseEmployerName(entry.employerName),
          sickLeave: parseSickLeave(entry.sickLeave)
        };
        return newOccupationalHealthcareEntry;
      default:
        throw new Error(
          `Incorrect or  unhandled entry type: ${entry.type}`
        );
    }
  }

  throw new Error('Incorrect or missing entry');
};