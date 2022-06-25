import { Entry as EntryType } from '../types';

interface Props {
  entry: EntryType
}

const Entry = ({ entry }: Props) => {
  return (
    <div>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map(code =>
          <li key={code}>{code}</li>
        )}
      </ul>
    </div>
  );
};

export default Entry;