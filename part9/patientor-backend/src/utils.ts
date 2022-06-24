import { NewPatientInfo, Gender, Entry } from './types';

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