import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Library from './pages/Library';
import CreateScale from './pages/CreateScale';
import PlayScale from './pages/PlayScale';
import Settings from './pages/Settings';
import Exercises from './pages/Exercises';
import BottomNav from './components/BottomNav';
import { Scale } from './types';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    // Only show bottom nav on main pages
    const showNav = ['/', '/settings', '/exercises'].includes(location.pathname);
    
    return (
        <>
            {children}
            {showNav && <BottomNav />}
        </>
    );
}

const App: React.FC = () => {
  const [customScales, setCustomScales] = useState<Scale[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('myScales');
    if (saved) {
        try {
            setCustomScales(JSON.parse(saved));
        } catch(e) { console.error(e); }
    }
  }, []);

  const saveScale = (newScale: Scale) => {
    const updated = [...customScales, newScale];
    setCustomScales(updated);
    localStorage.setItem('myScales', JSON.stringify(updated));
  };

  return (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Library customScales={customScales} />} />
                <Route path="/create" element={<CreateScale onSave={saveScale} />} />
                <Route path="/play/:id" element={<PlayScale />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Layout>
    </Router>
  );
};

export default App;