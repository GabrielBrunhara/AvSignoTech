import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import { Surveys } from '../../components/Surveys';
import { loadSurveys } from '../../utils/load-surveys';
import { Loading } from '../../components/Loading';
import { ButtonNewSurvey, FilterButton, FilterContainer, Section } from './style';

export const Home = () => {
  const [allSurveys, setAllSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoadSurvey = useCallback(async () => {
    setIsLoading(true);
    const surveys = await loadSurveys();
    setAllSurveys(surveys);
    setFilteredSurveys(surveys);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    handleLoadSurvey();
  }, [handleLoadSurvey]);

  const handleFilterChange = (status) => {
    if (status === 'todos') {
      setFilteredSurveys(allSurveys);
    } else {
      setFilteredSurveys(
        allSurveys.filter((survey) => {
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          const start = new Date(survey.start_date);
          const end = new Date(survey.end_date);
          console.log(currentDate);

          if (status === 'não-iniciada' && currentDate < start) return true;
          if (status === 'em-andamento' && currentDate >= start && currentDate <= end) return true;
          if (status === 'finalizada' && currentDate > end) return true;
          return false;
        }),
      );
    }
  };

  const handleSurveyClick = (surveyId) => {
    navigate(`/survey/${surveyId}`);
  };

  const handleEdit = (id) => {
    navigate(`/survey/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta pesquisa?')) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/surveys/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Pesquisa excluída com sucesso!');
        await handleLoadSurvey();
      } else {
        const data = await response.json();
        alert(data.message || 'Erro ao excluir a pesquisa.');
      }
    } catch (error) {
      console.error('Erro ao excluir a pesquisa:', error);
      alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
    }
  };

  const handleNewSurvey = () => {
    navigate('/survey/new');
  };

  return (
    <Section>
      <FilterContainer>
        <FilterButton onClick={() => handleFilterChange('todos')}>Todos</FilterButton>
        <FilterButton onClick={() => handleFilterChange('finalizada')}>Finalizada</FilterButton>
        <FilterButton onClick={() => handleFilterChange('em-andamento')}>Em Andamento</FilterButton>
        <FilterButton onClick={() => handleFilterChange('não-iniciada')}>Não Iniciada</FilterButton>
      </FilterContainer>

      <ButtonNewSurvey onClick={handleNewSurvey}>
        <FaPlus size={35} />
      </ButtonNewSurvey>

      {isLoading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <Surveys
          surveys={filteredSurveys}
          onSurveyClick={handleSurveyClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Section>
  );
};

export default Home;
