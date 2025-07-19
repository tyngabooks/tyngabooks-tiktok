import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [topics, setTopics] = useState(['Book Boyfriends', 'Trope Roulette', 'Spicy Scenes']);
  const [newTopic, setNewTopic] = useState('');
  const [selected, setSelected] = useState(null);

  const addTopic = () => {
    if (newTopic.trim()) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic('');
    }
  };

  const getRandomTopic = () => {
    if (topics.length === 0) return;
    const randomIndex = Math.floor(Math.random() * topics.length);
    setSelected(topics[randomIndex]);
  };

  return (
    <div className="section">
      <h1>🎥 Tynga’s TikTok Topic Picker</h1>
      <input
        type="text"
        value={newTopic}
        onChange={(e) => setNewTopic(e.target.value)}
        placeholder="Add a new topic"
      />
      <button onClick={addTopic}>Add Topic</button>

      <div style={{ marginTop: '20px' }}>
        <button onClick={getRandomTopic}>Pick Random Topic</button>
        {selected && <h2 style={{ marginTop: '20px' }}>🎯 {selected}</h2>}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Current Topics:</h3>
        <ul>
          {topics.map((topic, idx) => (
            <li key={idx}>{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
