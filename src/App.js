import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainNavbar from './components/MainNavbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import OverMijPage from './pages/OverMijPage';
import DienstenPage from './pages/DienstenPage';
import ContactPage from './pages/ContactPage';
import AlternatieveOpmaakPage from './pages/alternatives/AlternatieveOpmaakPage';
import SinglePageOpmaakPage from './pages/alternatives/SinglePageOpmaakPage';
import TegelOpmaakPage from './pages/alternatives/TegelOpmaakPage';
import TijdlijnOpmaakPage from './pages/alternatives/TijdlijnOpmaakPage';
import FocusOpmaakPage from './pages/alternatives/FocusOpmaakPage';
import MinimalOpmaakPage from './pages/alternatives/MinimalOpmaakPage';
import ExecutiveOpmaakPage from './pages/alternatives/ExecutiveOpmaakPage';
import EditorialOpmaakPage from './pages/alternatives/EditorialOpmaakPage';
import ContrastOpmaakPage from './pages/alternatives/ContrastOpmaakPage';
import GridOpmaakPage from './pages/alternatives/GridOpmaakPage';
import SereneOpmaakPage from './pages/alternatives/SereneOpmaakPage';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ThemeSwitcher />
      <MainNavbar />
      <main className="flex-fill" style={{ paddingTop: '4.5rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/over-mij" element={<OverMijPage />} />
          <Route path="/diensten" element={<DienstenPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/alternatieve-opmaak" element={<AlternatieveOpmaakPage />} />
          <Route path="/alternatieve-opmaak/singlepage" element={<SinglePageOpmaakPage />} />
          <Route path="/alternatieve-opmaak/tegels" element={<TegelOpmaakPage />} />
          <Route path="/alternatieve-opmaak/tijdlijn" element={<TijdlijnOpmaakPage />} />
          <Route path="/alternatieve-opmaak/focus" element={<FocusOpmaakPage />} />
          <Route path="/alternatieve-opmaak/minimaal" element={<MinimalOpmaakPage />} />
          <Route path="/alternatieve-opmaak/executive" element={<ExecutiveOpmaakPage />} />
          <Route path="/alternatieve-opmaak/editorial" element={<EditorialOpmaakPage />} />
          <Route path="/alternatieve-opmaak/contrast" element={<ContrastOpmaakPage />} />
          <Route path="/alternatieve-opmaak/grid" element={<GridOpmaakPage />} />
          <Route path="/alternatieve-opmaak/serene" element={<SereneOpmaakPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
