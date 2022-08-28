import { ClubPreview } from 'pages/entities/club';
import { ProjectPreview } from 'pages/entities/project';
import { Toaster } from 'react-hot-toast';
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

          {/* <Route path="projects">
            // <Route index element={<SociotekaProjects />} />

            <Route path=":id" element={<ProjectPreview />} />
            <Route path=":id/info" element={<ProjectPreview isFull />} />
          </Route> */}

          <Route path="clubs">
            {/* <Route index element={<SociotekaProjects />} /> */}

            <Route path=":id" element={<ClubPreview />} />
            <Route path=":id/info" element={<ClubPreview isFull />} />
          </Route>
        </Route>
      </Routes>

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            color: '#414feb',
          },
        }}
      />
    </Router>
  );
}

export default App;
