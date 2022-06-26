import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Box } from '@material-ui/core';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { useStateValue } from '../state';
import { Patient, Diagnosis } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryDetails from '../PatientPage/EntryDetails';

const PatientPage = () => {
  const { id } = useParams<{ id: string}>();
  const [{patients, diagnoses}, dispatch] = useStateValue();

  useEffect(() => {
    if (!id) return;
    // don't fetch patient again
    if (patients[id] && ('ssn' in patients[id])) return;

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);

  useEffect(() => {
    if (diagnoses && Object.keys(diagnoses).length) return;
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
          );
          dispatch({ type: "SET_DIAGNOSES", payload: diagnosesFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [dispatch]);

  if (id && patients[id]) {
    return (
      <div className="App">
        <Box>
          <h2>
            {patients[id].name}
            {patients[id].gender === 'male' &&
              <MaleIcon />
            }
            {patients[id].gender === 'female' &&
              <FemaleIcon />
            }
          </h2>
          <p>ssn: {patients[id].ssn}</p>
          <p>occupation: {patients[id].occupation}</p>

          <h4>entries</h4>
          {patients[id].entries?.map((entry) =>
            <EntryDetails key={entry.id} entry={entry} />
          )}

        </Box>
      </div>
    );
  }

  return (
    <div>
      loading...
    </div>
  );
};

export default PatientPage;