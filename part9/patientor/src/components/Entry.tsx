import { useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Entry as EntryType } from '../types';
import { Diagnosis } from '../types';
import { useStateValue } from '../state';

interface Props {
  entry: EntryType
}

const Entry = ({ entry }: Props) => {
  const [{diagnoses}, dispatch] = useStateValue();

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

  return (
    <div>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>{code} {diagnoses[code]?.name}</li>
        )}
      </ul>
    </div>
  );
};

export default Entry;