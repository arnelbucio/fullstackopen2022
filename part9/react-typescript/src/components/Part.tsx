import { CoursePart } from '../types'
import { assertNever } from '../helpers'

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p><em>{part.description}</em></p>
        </div>
      )
    case 'groupProject':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case 'submission':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p><em>{part.description}</em></p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      )
    case 'special':
    return (
      <div>
        <h3>{part.name} {part.exerciseCount}</h3>
        <p><em>{part.description}</em></p>
        <p>required skills: {part.requirements.join(', ')}</p>
      </div>
    )
    default:
      return assertNever(part);
  }
}

export default Part;