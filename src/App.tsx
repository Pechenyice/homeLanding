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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
