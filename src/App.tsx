import { useLibraryWords } from 'hooks/queries/library/useLibraryWords';
import { ClubPreview } from 'pages/entities/club';
import { SociotekaClubs } from 'pages/entities/club/SociotekaClubs/SociotekaClubs';
import { EducationPreview } from 'pages/entities/education';
import { SociotekaEducation } from 'pages/entities/education/SociotekaEducation/SociotekaEducation';
import { MethodologiesPreview } from 'pages/entities/methodology';
import { SociotekaMethodologies } from 'pages/entities/methodology/SociotekaMethodologies/SociotekaMethodologies';
import { ProjectPreview } from 'pages/entities/project';
import { SociotekaProjects } from 'pages/entities/project/SociotekaProjects/SociotekaProjects';
import { SocialPreview } from 'pages/entities/social';
import { SociotekaSocial } from 'pages/entities/social/SociotekaSocial/SociotekaSocial';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { CommonBase, NotFound } from './components';
import { Main } from './pages';

function App() {
  // to load library for users
  useLibraryWords();

  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<CommonBase />}>
          <Route index element={<Main />} />

          <Route path="projects">
            <Route index element={<SociotekaProjects />} />

            <Route path=":id" element={<ProjectPreview />} />
            <Route path=":id/info" element={<ProjectPreview isFull />} />
          </Route>

          <Route path="education">
            <Route index element={<SociotekaEducation />} />

            <Route path=":id" element={<EducationPreview />} />
            <Route path=":id/info" element={<EducationPreview isFull />} />
          </Route>

          <Route path="social">
            <Route index element={<SociotekaSocial />} />

            <Route path=":id" element={<SocialPreview />} />
            <Route path=":id/info" element={<SocialPreview isFull />} />
          </Route>

          <Route path="clubs">
            <Route index element={<SociotekaClubs />} />

            <Route path=":id" element={<ClubPreview />} />
            <Route path=":id/info" element={<ClubPreview isFull />} />
          </Route>

          <Route path="methodologies">
            <Route index element={<SociotekaMethodologies />} />

            <Route path=":id" element={<MethodologiesPreview />} />
            <Route path=":id/info" element={<MethodologiesPreview isFull />} />
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
