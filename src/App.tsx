import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';
import { AnalysisProvider } from './context/AnalysisContext';

// Direct imports instead of lazy loading to fix blank page issue
import UploadPage from './pages/UploadPage';
import UploadImagePage from './pages/UploadImagePage';
import ResultsPage from './pages/ResultsPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <AnalysisProvider>
      <Router>
        <SmoothScrollProvider>
          <div className="min-h-screen bg-white transform-gpu">
            <Header />
            <main className="container mx-auto px-4 max-w-7xl ultra-smooth">
              <Routes>
                <Route path="/" element={<UploadPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/upload-image" element={<UploadImagePage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
            <ScrollToTop />
          </div>
        </SmoothScrollProvider>
      </Router>
    </AnalysisProvider>
  );
}

export default App;