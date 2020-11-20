import React from 'react'
import Content from './Content'

const Course = ({ course }) => {
    return (
        <div>
            <Content course={course} />
        </div>
    );
};

export default Course