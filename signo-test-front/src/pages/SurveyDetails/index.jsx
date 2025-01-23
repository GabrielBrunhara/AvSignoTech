import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as Styled from './style';
import { ReturnHome } from '../../utils/ReturnHome';
import { Loading } from '../../components/Loading';

export const SurveyDetails = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [optionColors, setOptionColors] = useState({});

  const isSurveyActive = () => {
    const now = new Date();
    const startDate = new Date(survey.start_date);
    const endDate = new Date(survey.end_date);
    now.setHours(0, 0, 0, 0);
    return now >= startDate && now <= endDate;
  };

  const isSurveyEnded = () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const endDate = new Date(survey.end_date);
    return now > endDate;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 8) + 2];
    }
    return color;
  };

  useEffect(() => {
    const loadSurveyDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/surveys/${id}`);
        const data = await response.json();
        setSurvey(data);
        setIsLoading(false);

        const colors = {};
        data.options.forEach((option) => {
          colors[option.id] = getRandomColor();
        });
        setOptionColors(colors);
      } catch (e) {
        setErrorMessage(e);
        setIsLoading(false);
      }
    };

    loadSurveyDetails();
  }, [id]);

  const handleVote = async (optionId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/surveys/${id}/vote/${optionId}`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setSurvey((prevSurvey) => {
          const updatedSurvey = { ...prevSurvey };
          const updatedOptions = updatedSurvey.options.map((option) =>
            option.id === optionId ? { ...option, votes_count: data.votes_count } : option,
          );
          updatedSurvey.options = updatedOptions;
          updatedSurvey.total_votes = updatedSurvey.options.reduce((total, option) => total + option.votes_count, 0);

          return updatedSurvey;
        });
        setErrorMessage(null);
      } else {
        setErrorMessage(data.message || 'Ocorreu um erro ao votar.');
      }
    } catch (e) {
      setErrorMessage(e);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Styled.Section>
      <ReturnHome />
      <Styled.Content>
        <h1>{survey.title}</h1>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <div>
          {!isSurveyActive() && !isSurveyEnded() && (
            <h3 style={{ color: 'rgb(0, 140, 255)' }}>A votação ainda não começou.</h3>
          )}

          {isSurveyActive() && (
            <>
              <h3>Opções de Votação:</h3>
              {survey.options.map((option) => (
                <div key={option.id}>
                  <Styled.VoteButton onClick={() => handleVote(option.id)} $randomBackground={optionColors[option.id]}>
                    <p>{option.option_text}</p>
                  </Styled.VoteButton>
                </div>
              ))}
            </>
          )}

          {isSurveyEnded() && <h3 style={{ color: 'rgb(0, 140, 255)' }}>Votação encerrada.</h3>}
        </div>

        <Styled.Total>
          <strong>Total de Votos:</strong> {survey.total_votes}
        </Styled.Total>
      </Styled.Content>

      <Styled.Graphic>
        {survey.options.map((option) => (
          <div key={option.id}>
            <Styled.ExternDiv onClick={() => handleVote(option.id)}>
              <h2>{option.option_text}</h2>
              <p>{option.votes_count} votos</p>
              <p>{((option.votes_count / survey.total_votes) * 100).toFixed(2)}%</p>
              <Styled.InternDiv
                $height={((option.votes_count / survey.total_votes) * 100).toFixed(2)}
                $randomBackground={optionColors[option.id]}
              />
            </Styled.ExternDiv>
          </div>
        ))}
      </Styled.Graphic>
    </Styled.Section>
  );
};
