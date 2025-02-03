import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    sessionStorage.removeItem('persistedQuery');
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;