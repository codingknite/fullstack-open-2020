import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';

const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE': {
      state.concat(action.data)
      return state
    }
    default:
      return state
  }
}

const store = createStore(noteReducer);

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  data: {
    id: 2
  }
})

const App = () => {
  return (
    <>
    <ul>
      {store.getState().map(note => (
        <li key={note.id}>
          {note.content} <strong>{note.important ? 'important' : ''}</strong>
        </li>
      ))}
    </ul>
    </>
  )
}

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

renderApp()
store.subscribe(renderApp)