import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: {
      patientId: string;
      entry: Entry;
    }
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES":
    return {
      ...state,
      diagnoses: {
        ...action.payload.reduce(
          (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
          {}
        ),
        ...state.diagnoses
      }
    };
    case "ADD_PATIENT":
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const entry = action.payload.entry;
      const patientId = action.payload.patientId;
      const patient = state.patients[patientId];
      patient.entries.push(entry);
        return state;
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};
