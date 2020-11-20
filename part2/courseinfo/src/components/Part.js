import React from 'react'


const Part = ({ course }) => {
    const part = course.map((course) => {
        return course.parts.map((part) => {
            return (
                <div key={part.id}>
                    <h2>{part.name}</h2>
                    <p>
                        {part.name} {part.exercises}
                    </p>
                    <p>Number of exercises {part.exercises}</p>
                </div>
            );
        });
    });
    return <>{part}</>;
};

export default Part;