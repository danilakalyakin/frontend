import { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:3000/api/data';

export default function App() {
  // Поля для отправки
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [statusColor, setStatusColor] = useState('green');

  // Поля для загрузки
  const [result, setResult] = useState('');

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

  const handleLoad = async () => {
    try {
      const response = await axios.get(API_URL);
      setResult(response.data.content || '(файл пуст)');
    } catch (err) {
      setResult('Ошибка: ' + err.message);
    }
  };

  return (
    <div className="container">
      <h1>Frontend v2.0 (React)</h1>

      <div className="section">
        <h2>Отправка данных</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите текст"
        />
        <button onClick={handleSend}>Отправить</button>
        <p style={{ color: statusColor }}>{status}</p>
      </div>

      <div className="section">
        <h2>Просмотр данных</h2>
        <button onClick={handleLoad}>Загрузить данные с сервера</button>
        <textarea
          value={result}
          readOnly
          placeholder="Здесь появится содержимое data.txt"
        />
      </div>
    </div>
  );
}