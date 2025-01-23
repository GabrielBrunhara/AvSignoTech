import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importando os ícones diretamente aqui

export const SurveyCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border: solid 2px white;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
  gap: 10px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 300px;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 1.6rem;
  color: white;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  color: #ffffffc5;

  p {
    margin: 5px;
  }
`;

export const Status = styled.p`
  font-weight: bold;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  text-align: center;

  &.não-iniciada {
    border: solid 2px #f5b7b1;
    color: #c0392b;
  }

  &.em-andamento {
    border: solid 2px #f9e79f;
    color: #f39c12;
  }

  &.finalizada {
    border: solid 2px #a3e4d7;
    color: #1e8449;
  }
`;

export const Icon = styled.button`
  background: none;
  position: absolute;
  border: none;
  padding: none;
  top: 15px;
  cursor: pointer;
  font-size: 20px;
  color: var(--accent);
  ${(props) => (props.$position === 'left' ? 'left: 15px;' : 'right: 15px;')}

  &:hover {
    color: var(--hover-accent);
  }
`;

export const EditIcon = styled(FaEdit)`
  left: 15px;
`;

export const DeleteIcon = styled(FaTrash)`
  right: 15px;
`;
