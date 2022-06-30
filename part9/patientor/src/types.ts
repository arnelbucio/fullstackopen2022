export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

// https://www.typescriptlang.org/docs/handbook/enums.html#numeric-enums
export enum HealthCheckRating {
  "Healthy" = 1,
  "LowRisk",
  "HighRisk",
  "CriticalRisk",
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

type Discharge = {
  date: string;
  criteria: string;
};

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge
}

type SickLeave = {
  startDate: string;
  endDate: string;
};

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewEntry = UnionOmit<Entry, 'id'>;

export interface NewEntryFormFields {
  type: "Hospital" | "HealthCheck" | "OccupationalHealthcare";
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: string[];
  healthCheckRating?: number;
  discharge?: Discharge;
  employerName?: string;
  sickLeave?: SickLeave;
}