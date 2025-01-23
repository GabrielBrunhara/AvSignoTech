import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

import { Background, Form } from './style';
import { ReturnHome } from '../utils/ReturnHome';

export const NewSurvey = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [options, setOptions] = useState(['', '', '']);

  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          start_date: startDate,
          end_date: endDate,
          options,
        }),
      });

      if (response.ok) {
        alert('Enquete criada com sucesso!');
        navigate('/');
      } else {
        const data = await response.json();
        alert(data.error || 'Erro ao criar a enquete.');
      }
    } catch (error) {
      console.error('Erro ao criar a enquete:', error);
      alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <Background>
      <ReturnHome />
      <Form onSubmit={handleSubmit}>
        <h2>Criar Nova Enquete</h2>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Melhores países da Europa"
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Data de Início:</label>
          <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="endDate">Data de Término:</label>
          <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </div>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Opções:</label>
          {options.map((option, index) => (
            <div key={index} className="optionInput">
              <input
                type="text"
                id={`option-${index}`}
                value={option}
                placeholder="Escreva uma opção..."
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
              {index > 2 && (
                <button type="button" onClick={() => handleRemoveOption(index)}>
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            Adicionar Opção
          </button>
        </div>

        <button type="submit">Criar Enquete</button>
      </Form>
    </Background>
  );
};
