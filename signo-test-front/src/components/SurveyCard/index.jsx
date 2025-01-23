import P from 'prop-types';

import * as Styled from './style';

export const SurveyCard = ({ title, startDate, endDate, id, onClick, onEdit, onDelete }) => {
  const currentDate = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  let status = '';
  currentDate.setHours(0, 0, 0, 0);
  if (currentDate < start) {
    status = 'Não Iniciada';
  } else if (currentDate >= start && currentDate <= end) {
    status = 'Em Andamento';
  } else {
    status = 'Finalizada';
  }

  return (
    <Styled.SurveyCardContainer onClick={onClick}>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Text>
        <p>
          <strong>Início:</strong> {start.toLocaleDateString()}
        </p>
        <p>
          <strong>Fim:</strong> {end.toLocaleDateString()}
        </p>
      </Styled.Text>
      <Styled.Status className={status.toLowerCase().replace(' ', '-')}>{status}</Styled.Status>

      {/* Exibir ícone de edição somente para status "Não Iniciada" */}
      {status === 'Não Iniciada' && (
        <Styled.Icon
          $position={'left'}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(id);
          }}
        >
          <Styled.EditIcon />
        </Styled.Icon>
      )}
      <Styled.Icon
        $position={'right'}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
      >
        <Styled.DeleteIcon />
      </Styled.Icon>
    </Styled.SurveyCardContainer>
  );
};

SurveyCard.propTypes = {
  title: P.string.isRequired,
  startDate: P.string.isRequired,
  endDate: P.string.isRequired,
  id: P.number.isRequired,
  onClick: P.func.isRequired,
  onEdit: P.func.isRequired,
  onDelete: P.func.isRequired,
};
