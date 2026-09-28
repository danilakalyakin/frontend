import { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:3000/api/data';

export default function App() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('green');

  const handleSend = async () => {
    if (!text.trim()) {
      setStatus('Введите текст');
      setStatusColor('red');
      return;
    }
    try {
      const response = await axios.post(API_URL, { text });
      setStatus(response.data.message || 'Успешно');
      setStatusColor('green');
      setText('');
    } catch (err) {
      setStatus('Ошибка: ' + err.message);
      setStatusColor('red');
    }
  };

  return (
    <div className="container">
      <h1>Frontend v1.0 (React)</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст"
      />
      <button onClick={handleSend}>Отправить</button>
      <p style={{ color: statusColor }}>{status}</p>
    </div>
  );
}