export const loadSurveys = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000');

    if (!response.ok) {
      throw new Error('Erro ao carregar as pesquisas');
    }

    const surveys = await response.json();
    return surveys;
  } catch (error) {
    console.error('Erro ao buscar as pesquisas:', error);
    return [];
  }
};
