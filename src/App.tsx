import { ProjectPreview } from 'pages/entities/project';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { CommonBase, NotFound } from './components';
import { Main } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<CommonBase />}>
          <Route index element={<Main />} />

          <Route path="projects">
            {/* <Route index element={<SociotekaProjects />} /> */}

            <Route path=":id" element={<ProjectPreview />} />
            <Route path=":id/info" element={<ProjectPreview isFull />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
