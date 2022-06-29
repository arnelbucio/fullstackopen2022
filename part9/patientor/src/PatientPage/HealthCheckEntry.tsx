import { HealthCheckEntry as HealthCheckEntryType } from '../types';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HealthCheckRatingIcon from './HealthCheckRatingIcon';
import { useStateValue } from '../state';

interface Props {
  entry: HealthCheckEntryType;
}

const HealthCheckEntry = ({entry}: Props) => {
  const [{diagnoses}] = useStateValue();

  return (
    <div className='entry'>
      <p>{entry.date} <MedicalInformationIcon /></p>
      <p><em>{entry.description}</em></p>
      <p><HealthCheckRatingIcon
        rating={entry.healthCheckRating} />
      </p>
      <p>diagnose by {entry.specialist}</p>

      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>{code} {diagnoses[code]?.name}</li>
        )}
      </ul>
    </div>
  );
};

export default HealthCheckEntry;