import Header from './Header';
import Content from './Content';

const Course = ({course}) => {
  const total = course.parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0)

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <strong>total of {total} exercises</strong>
    </div>
  )
}

export default Course