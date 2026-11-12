import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { LessonWorkspace } from './pages/LessonWorkspace/index.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workspace/:trackId/:lessonId" element={<LessonWorkspace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}