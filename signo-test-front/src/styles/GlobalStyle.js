import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light dark;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;

    --background: rgb(41, 42, 43);
    --accent: rgb(0, 140, 255);
    --hover-accent:rgb(0, 86, 179);
  }

  body {
    min-height: 100vh;
    width: 100%;
    margin: 0 auto;
    background-color: black;
    font-family: 'Funnel Sans', sans-serif;
    background-color: var(--background);
  }
`;

export default GlobalStyle;
