import styled from 'styled-components';

// Estilos para o fundo da página
export const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background);
`;

// Estilos para o formulário
export const Form = styled.form`
  border: solid 2px white;
  color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;

  h2 {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  div {
    margin-bottom: 1rem;
    width: 100%;

    label {
      display: block;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border-radius: 4px;
      font-size: 1rem;
      border: solid 2px white;
      background: none;
      box-sizing: border-box;

      &:focus {
        border-color: var(--accent);
        outline: none;
      }
    }

    .optionInput {
      display: flex;

      button {
        width: fit-content;
        border: none;
        background: none;

        &:hover {
          background: none;
          color: var(--accent);
        }
      }
    }
  }

  button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    color: #ffffff;
    background-color: var(--accent);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--hover-accent);
    }

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }

    &[type='button'] {
      background-color: #6c757d;

      &:hover {
        background-color: #5a6268;
      }
    }
  }
`;
