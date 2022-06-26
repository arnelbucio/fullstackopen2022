import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from '../types';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

interface Props {
  entry: OccupationalHealthcareEntryType;
}
const OccupationalHealthcareEntry = ({entry}: Props) => {
  return (
    <div className='entry'>
      <p>
        {entry.date} <HealthAndSafetyIcon />
        <em>{entry.employerName}</em>
      </p>
      <p><em>{entry.description}</em></p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHealthcareEntry;