import React from 'react'

const DisplayNumbers = ({ keys, name, number }) => {
    return (
        <p key={keys}>
            {name} - {number}
        </p>
    )
}

export default DisplayNumbers