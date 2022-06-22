interface ContentProps {
  courseParts: Array<Course>;
}

interface Course {
  name: string;
  exerciseCount: number;
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(course => (
        <p key={course.name}>
          {course.name} {course.exerciseCount}
        </p>
      ))}

    </div>
  )
}

export default Content;