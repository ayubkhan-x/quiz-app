import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    // Загружаем результаты из LocalStorage при монтировании компонента
    const savedLeaders = JSON.parse(localStorage.getItem('leaders')) || [];
    setLeaders(savedLeaders);
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaders.map((leader, index) => (
          <li key={index}>
            {leader.name}: {leader.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
