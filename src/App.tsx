import { MemoryRouter, Routes, Route } from 'react-router';
import { Home } from './pages/Home.js';
import { ButtonExamples } from './pages/ButtonExamples.js';

export function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/button-examples" element={<ButtonExamples />} />
      </Routes>
    </MemoryRouter>
  );
}
