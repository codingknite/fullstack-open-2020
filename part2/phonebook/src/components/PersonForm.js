import React from 'react'

const PersonForm = ({ submitHandler, nameValue, numberValue, personHandler, numberHandler }) => {
    return (
        <form onSubmit={submitHandler}>
            <div>
                name: <input value={nameValue} onChange={personHandler} />
            </div>
            <div>
                Number: <input value={numberValue} onChange={numberHandler} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm