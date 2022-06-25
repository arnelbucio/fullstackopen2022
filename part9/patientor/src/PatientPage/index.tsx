import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Box } from '@material-ui/core';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { useStateValue } from '../state';
import { Patient } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Entry from '../components/Entry';

const PatientPage = () => {
  const { id } = useParams<{ id: string}>();
  const [{patients}, dispatch] = useStateValue();

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
            <Entry key={entry.id} entry={entry} />
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