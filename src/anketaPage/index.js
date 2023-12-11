// Form.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css'

const FormPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Отправка данных на сервер
    try {
      await axios.post('http://127.0.0.1:5000/api/save-data', { name, age });
      console.log('Данные успешно отправлены');
    } catch (error) {
      console.error('Ошибка при отправке данных', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* Your form fields here */}
        <label>
          Имя:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Возраст:
          <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <br />
        <button type="submit">Отправить</button>
      </form>

      {/* Add a styled button for navigating to the statistics page */}
      <button onClick={() => navigate('/statistic')}>К статистике</button>
    </div>
  );
};

export { FormPage };