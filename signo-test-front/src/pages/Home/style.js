import Styled from 'styled-components';

export const Section = Styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 50px;
  color: white;
  background: var(--background);

  @media (max-width: 768px) {
    gap: 60px;
  }
`;

export const ButtonNewSurvey = Styled.button`
  position: absolute;
  top: 30px;
  left: 30px;
  border: none;
  background: none;
  color: var(--accent);
  cursor: pointer;

  &:hover {
    color: var(--hover-accent);
  }

  @media (max-width: 768px) {
    top: 65px;
    left: 5px;
  }
`;

export const FilterContainer = Styled.div`
  position: relative;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  gap: 25px;

  @media (max-width: 768px) {
    margin-top: 10px;
    gap: 5px;
  }
`;

export const FilterButton = Styled.button`
  font-weight: bold;
  padding: 10px;
  border: solid 2px white;
  border-radius: 30px;
  background: none;
  color: white;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background: white;
    color:  var(--background);
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 10px;
  }
`;
