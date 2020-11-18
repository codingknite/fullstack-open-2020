import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ header }) => <h1>{header}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ statName, statCount }) => (
  <tr>
    <td>
      {statName} {statCount}
    </td>
  </tr>
);

const Statistics = (props) => {
  if (props.good > 0 || props.neutral > 0 || props.bad > 0) {
    return (
      <table>
        <tbody>
          <Statistic statName="good" statCount={props.good} />
          <Statistic statName="neutral" statCount={props.neutral} />
          <Statistic statName="bad" statCount={props.bad} />
          <Statistic statName="all" statCount={props.all} />
          <Statistic statName="average" statCount={0} />
          <Statistic statName="positive" statCount={props.positive} />
        </tbody>
      </table>
    );
  }
  return <p>No feedback given</p>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = () => good + neutral + bad;
  const all = total();

  const calcPositive = () => (good > 0 ? (good / all) * 100 : 0);
  const positive = calcPositive() + ' %';

  const handleGood = () => {
    setGood(() => good + 1);
  };

  const handleNeutral = () => {
    setNeutral(() => neutral + 1);
  };

  const handleBad = () => {
    setBad(() => bad + 1);
  };

  return (
    <div>
      <Header header="give feedback" />

      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <Header header="statistics" />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        positive={positive}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
