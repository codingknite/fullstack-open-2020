import React from 'react';

const Part = ({ course }) => {
  const part = course.map((course) => {
    const courseName = course.name;
    const courseID = course.id;

    const subCourse = course.parts.map((part) => {
      return (
        <div key={part.id}>
          <h3>{part.name}</h3>
          <p>
            {part.name} {part.exercises}
          </p>
          <p>Number of exercises {part.exercises}</p>
        </div>
      );
    });

    return (
      <div key={courseID}>
        <h2>{courseName}</h2>
        <div>{subCourse}</div>
      </div>
    );
  });

  return <> {part} </>;
};

export default Part;
