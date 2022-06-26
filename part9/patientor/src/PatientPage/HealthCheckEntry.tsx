import { HealthCheckEntry as HealthCheckEntryType } from '../types';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HealthCheckRatingIcon from './HealthCheckRatingIcon';

interface Props {
  entry: HealthCheckEntryType;
}

const HealthCheckEntry = ({entry}: Props) => {
  return (
    <div className='entry'>
      <p>{entry.date} <MedicalInformationIcon /></p>
      <p><em>{entry.description}</em></p>
      <p><HealthCheckRatingIcon
        rating={entry.healthCheckRating} />
      </p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntry;