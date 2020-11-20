import React from 'react'
import Part from './Part'
import Header from './Header'

const Content = ({ course }) => {
    return (
        <div>
            <Header />
            <Part course={course} />
        </div>
    );
};


export default Content