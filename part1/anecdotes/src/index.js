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
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(6).fill(0));

  const generateRandom = () => Math.floor(Math.random() * (6 - 0) + 0);
  const randomNumber = generateRandom();

  const handleAnecdote = () => {
    setSelected(selected + 1);
  };

  const handleVotes = () => {
    votes[randomNumber] += 1;
  };

  const votesCopy = [...votes];

  const highestVote = votesCopy.sort((a, b) => a - b)[votes.length - 1];
  const mostVoted = votes.indexOf(highestVote);
  const currentVotes = votes[randomNumber];

  return (
    <div>
      <Header header="Anecdote of the day" />
      <Anecdote anecdote={props.anecdotes[randomNumber]} vote={currentVotes} />
      <Button handleClick={handleVotes} text="Vote" />
      <Button handleClick={handleAnecdote} text="New Anecdote" />
      <Header header="Anecdote with most votes" />
      <Anecdote anecdote={props.anecdotes[mostVoted]} vote={highestVote} />
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
