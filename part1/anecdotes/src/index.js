import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Header = (props) => <h1>{props.header}</h1>;

const Anecdote = (props) => {
  return (
    <div>
      {props.anecdote}
      <p>Has {props.vote} votes</p>
    </div>
  );
};

const App = (props) => {

  const initialState = {
    '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0,
  }
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({ ...initialState });
  const [highestVote, setHighestVote] = useState(0);


  const nextAnecdote = () => {
    const generateRandom = () => Math.floor(Math.random() * (6 - 0) + 0);
    const randomNumber = generateRandom();
    setSelected(randomNumber);
  };

  const vote = () => {
    const currentVote = votes[selected];

    setVotes({
      ...votes,
      [selected]: currentVote + 1,
    })

    if (currentVote > highestVote) {
      setHighestVote(currentVote);
    }
  };

  const mostVotedAnec = () => {
    let anecdote;
    for (const anec in votes) {
      if (votes[anec] === highestVote + 1) {
        anecdote = anec;
      }
    }
    return anecdote;
  }


  const mostVoted = mostVotedAnec() || 0;
  const latestVotes = votes[selected];

  return (
    <div>
      <Header header="Anecdote of the day" />
      <Anecdote anecdote={props.anecdotes[selected]} vote={latestVotes} />
      <Button handleClick={vote} text="Vote" />
      <Button handleClick={nextAnecdote} text="Next Anecdote" />
      <Header header="Anecdote with most votes" />
      <Anecdote anecdote={props.anecdotes[mostVoted]} vote={highestVote + 1} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
