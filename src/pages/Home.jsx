import React, { useState } from 'react';
import Quiz from '../components/Quiz';
import Leaderboard from '../components/Leaderboard';

const Home = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [score, setScore] = useState(null);

  const handleQuizFinish = (finalScore) => {
    const name = prompt('Enter your name for the leaderboard:');
    const leaders = JSON.parse(localStorage.getItem('leaders')) || [];
    leaders.push({ name, score: finalScore });
    localStorage.setItem('leaders', JSON.stringify(leaders));
    setScore(finalScore);
  };

  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      {isQuizStarted ? (
        <Quiz onFinish={handleQuizFinish} />
      ) : (
        <button onClick={() => setIsQuizStarted(true)}>Start Quiz</button>
      )}
      {score !== null && <h2>Your Score: {score}</h2>}
      <Leaderboard />
    </div>
  );
};

export default Home;
