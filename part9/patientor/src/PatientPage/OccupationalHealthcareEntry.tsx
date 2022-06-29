import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from '../types';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { useStateValue } from '../state';

interface Props {
  entry: OccupationalHealthcareEntryType;
}

const OccupationalHealthcareEntry = ({entry}: Props) => {
  const [{diagnoses}] = useStateValue();

  return (
    <div className='entry'>
      <p>
        {entry.date} <HealthAndSafetyIcon />
        <em>{entry.employerName}</em>
      </p>
      <p><em>{entry.description}</em></p>
      <p>diagnose by {entry.specialist}</p>

      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>{code} {diagnoses[code]?.name}</li>
        )}
      </ul>
    </div>
  );
};

export default OccupationalHealthcareEntry;