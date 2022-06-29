import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { useStateValue } from '../state';
import { Patient, Diagnosis, NewEntry, Entry } from '../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import EntryDetails from '../PatientPage/EntryDetails';
import AddEntryModal from './AddEntryModal';

const PatientPage = () => {
  const { id } = useParams<{ id: string}>();
  const [{patients, diagnoses}, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    if (!id) {
      setError("No patient id");
      return;
    }

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_ENTRY", payload: {
        entry: newEntry,
        patientId: id,
      }});
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
          </Button>
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