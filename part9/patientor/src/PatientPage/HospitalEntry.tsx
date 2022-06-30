import { HospitalEntry as HospitalEntryType } from '../types';
import { useStateValue } from '../state';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HospitalEntryType;
}

const HospitalEntry = ({entry}: Props) => {
  const [{diagnoses}] = useStateValue();

  return (
    <div className='entry'>
      <p>
        {entry.date} <em>{entry.description}</em>
        <LocalHospitalIcon />
      </p>

      <p>Discharge: {entry.discharge.date} {entry.discharge.criteria}</p>

      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>{code} {diagnoses[code]?.name}</li>
        )}
      </ul>
    </div>
  );
};

export default HospitalEntry;