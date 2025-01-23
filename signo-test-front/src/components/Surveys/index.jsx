import P from 'prop-types';

import { SurveyCard } from '../SurveyCard';
import * as Styled from './style';

export const Surveys = ({ surveys, onSurveyClick, onEdit, onDelete }) => {
  return (
    <Styled.SurveysContainer>
      {surveys.map((survey) => (
        <SurveyCard
          key={survey.id}
          id={survey.id}
          title={survey.title}
          startDate={survey.start_date}
          endDate={survey.end_date}
          onClick={() => onSurveyClick(survey.id)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Styled.SurveysContainer>
  );
};

Surveys.propTypes = {
  surveys: P.arrayOf(
    P.shape({
      title: P.string.isRequired,
      startDate: P.string.isRequired,
      endDate: P.string.isRequired,
      id: P.number.isRequired,
    }),
  ),
  onEdit: P.func.isRequired,
  onDelete: P.func.isRequired,
  onSurveyClick: P.func.isRequired,
};
