import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home/Home';
import { SurveyDetails } from './pages/SurveyDetails';
import { SurveyEdit } from './pages/SurveyEdit';
import { NewSurvey } from './pages/NewSurvey';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey/:id" element={<SurveyDetails />} />
        <Route path="/survey/new" element={<NewSurvey />} />
        <Route path="/survey/edit/:id" element={<SurveyEdit />} />
      </Routes>
    </>
  );
}

export default App;
