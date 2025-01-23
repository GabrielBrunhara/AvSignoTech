import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import styled from 'styled-components';

const Home = styled.button`
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
    top: 10px;
    left: 5px;
  }
`;

export const ReturnHome = () => {
  const navigate = useNavigate();

  return (
    <Home
      onClick={() => {
        navigate('/');
      }}
    >
      <FaHome size={35} />
    </Home>
  );
};
