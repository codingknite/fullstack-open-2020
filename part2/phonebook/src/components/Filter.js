import React from 'react'

const Filter = ({ nameFilter, filterHandler }) => {
    return (
        <form onSubmit={nameFilter}>
            <div>
                Filter Names By: <input onChange={filterHandler} />
            </div>
        </form>
    )
}

export default Filter