import Styled from 'styled-components';

export const Section = Styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 100px;
  color: white;
  background: var(--background);

  @media (max-width: 768px) {
    gap: 50px;
    flex-wrap: nowrap;
    flex-direction: column;
  }
`;

export const Content = Styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 10px;
  padding-inline: 20px;
  @media (max-width: 768px) {
    margin-top: 50px;
  }
  `;

export const Graphic = Styled.div`
  padding-inline: 20px;
  position: relative;
  display: flex;
  gap: 10px;
  height: 300px;
  padding: 0;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const ExternDiv = Styled.div`
  padding: 10px;
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 300px;
  min-width: 100px;
  border: solid 3px white;
  border-radius: 30px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding-inline: 20px;
    width: 50px;
  }
  `;

export const InternDiv = Styled.div`
  z-index: -1;
  position: absolute;
  bottom: 0;
  height: ${(props) => props.$height}%;
  width: 100%;
  background: ${(props) => props.$randomBackground};
`;

export const Total = Styled.p`
  font-size: 15px;
`;

export const VoteButton = Styled.button`
  min-width: 60px;
  height: 30px;
  margin-block: 10px;
  width: 100%;
  height: fit-content;
  color: white;
  background: transparent;
  border: solid 2px white;
  border-radius: 0 30px 30px 0;
  padding: 10px;
  background: ${(props) => props.$randomBackground};
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }

  p{
    margin: 0;
    padding: 0;
  }
`;
