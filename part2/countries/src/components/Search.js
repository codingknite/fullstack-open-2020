import React from 'react'

const Search = (props) => {
    return (
        <div>
            <p>
                Find Country: <input onChange={props.inputHandler} />
            </p>
        </div>
    );
};

export default Search