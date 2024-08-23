import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    // Загружаем вопросы из LocalStorage при монтировании компонента
    const savedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(savedQuestions);
  }, []);

  const handleAddQuestion = () => {
    const updatedQuestions = [
      ...questions,
      {
        id: questions.length + 1,
        question: newQuestion,
        options: newOptions,
        answer: newAnswer,
      },
    ];

    // Обновляем состояние и сохраняем новые вопросы в LocalStorage
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));

    setNewQuestion('');
    setNewOptions(['', '', '', '']);
    setNewAnswer('');
  };

  const handleRemoveQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter new question"
        />
        {newOptions.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => {
              const updatedOptions = [...newOptions];
              updatedOptions[index] = e.target.value;
              setNewOptions(updatedOptions);
            }}
            placeholder={`Option ${index + 1}`}
          />
        ))}
        <input
          type="text"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Enter the correct answer"
        />
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
      <h3>Current Questions</h3>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.question} (Answer: {question.answer})
            <button onClick={() => handleRemoveQuestion(question.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
