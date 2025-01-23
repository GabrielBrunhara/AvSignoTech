import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

import { Background, Form } from './style';
import { ReturnHome } from '../utils/ReturnHome';

export const SurveyEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState({
    title: '',
    start_date: '',
    end_date: '',
    options: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSurvey = async () => {
      const response = await fetch(`http://127.0.0.1:8000/surveys/${id}`);
      const data = await response.json();

      const formattedStartDate = new Date(data.start_date).toISOString().split('T')[0];
      const formattedEndDate = new Date(data.end_date).toISOString().split('T')[0];

      setSurvey({
        ...data,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      });

      setIsLoading(false);
    };

    loadSurvey();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      [name]: value,
    }));
  };

  const handleOptionChange = (e, index) => {
    const { value } = e.target;
    const updatedOptions = [...survey.options];

    updatedOptions[index] = { ...updatedOptions[index], option_text: value };

    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      options: updatedOptions,
    }));
  };

  const handleAddOption = () => {
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      options: [...prevSurvey.options, { option_text: '' }],
    }));
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = survey.options.filter((_, i) => i !== index);
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      options: updatedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Array.isArray(survey.options) || survey.options.length === 0) {
      alert('Por favor, adicione ao menos uma opção.');
      return;
    }

    const response = await fetch(`http://127.0.0.1:8000/surveys/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: survey.title,
        start_date: survey.start_date,
        end_date: survey.end_date,
        options: survey.options.map((option) => option.option_text),
      }),
    });

    if (response.ok) {
      navigate(`/survey/${id}`);
    } else {
      alert('Erro ao atualizar a pesquisa');
    }
  };

  if (isLoading) return <div>Carregando...</div>;

  return (
    <Background>
      <ReturnHome />
      <Form onSubmit={handleSubmit}>
        <h2>Editar Pesquisa</h2>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={survey.title}
            onChange={handleInputChange}
            placeholder="Ex: Melhores países da Europa"
            required
          />
        </div>
        <div>
          <label htmlFor="start_date">Data de Início:</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={survey.start_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="end_date">Data de Término:</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={survey.end_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Opções:</label>
          {survey.options.map((option, index) => (
            <div key={index} className="optionInput">
              <input
                type="text"
                value={option.option_text || ''}
                placeholder="Escreva uma opção..."
                onChange={(e) => handleOptionChange(e, index)}
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
        <button type="submit">Salvar</button>
      </Form>
    </Background>
  );
};
