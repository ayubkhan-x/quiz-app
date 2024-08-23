import React, { useState, useEffect } from 'react';

const Quiz = ({ onFinish }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Загружаем вопросы из LocalStorage
    const savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(savedQuestions);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    } else {
      setIsFinished(true);
      onFinish(score + (selectedOption === questions[currentQuestionIndex].answer ? 1 : 0));
    }
  };

  if (isFinished) {
    return <h2>Your final score: {score}</h2>;
  }

  if (questions.length === 0) {
    return <h2>No questions available. Please add some in the admin panel.</h2>;
  }

  return (
    <div>
      <h2>{questions[currentQuestionIndex].question}</h2>
      <ul>
        {questions[currentQuestionIndex].options.map((option) => (
          <li key={option}>
            <button onClick={() => handleOptionSelect(option)}>{option}</button>
          </li>
        ))}
      </ul>
      <button onClick={handleNextQuestion} disabled={!selectedOption}>
        Next
      </button>
    </div>
  );
};

export default Quiz;
