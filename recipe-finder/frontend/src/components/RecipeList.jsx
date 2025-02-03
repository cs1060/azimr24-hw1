import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Search from './Search';
import RecipeCard from './RecipeCard';
import styles from './RecipeList.module.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Get the search query from the URL or state
  const initialQuery = location.state?.query || '';
  const [query, setQuery] = useState(initialQuery);
  const [number, setNumber] = useState(location.state?.number || 4);
  const [sortBy, setSortBy] = useState(location.state?.sortBy || 'popularity');
  const [sortDirection, setSortDirection] = useState(location.state?.sortDirection || 'desc');

  useEffect(() => {
    if (query) {
      searchRecipes(query, number, sortBy);
    }
  }, [query, number, sortBy]);

  // Clear the state when the user refreshes
  useEffect(() => {
    if (location.state) {
      navigate('.', { replace: true, state: {} }); // Clears state but keeps URL
    }
  // eslint-disable-next-line
  }, []);

  const searchRecipes = async (searchQuery, resultsNumber, sortOption, sortDir) => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/recipes', {
        params: { 
          query: searchQuery,
          number: resultsNumber,
          sort: sortOption,
          sortDirection: sortDir,
          addRecipeInformation: true
        }
      });
      setRecipes(response.data.results);
    } catch (err) {
      setError('Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery, newNumber, newSort, newSortDir) => {
    setQuery(newQuery);
    setNumber(newNumber);
    setSortBy(newSort);
    setSortDirection(newSortDir);
    navigate('.', { 
      state: { 
        query: newQuery,
        number: newNumber,
        sortBy: newSort,
        sortDirection: newSortDir
      } 
    });
  };

  const viewRecipe = (id) => {
    navigate(`/recipe/${id}`, { 
      state: { 
        query,
        number,
        sortBy,
        sortDirection
      }
    });
  };

  return (
    <div className={styles.recipeList}>
      <h1>Recipe Finder</h1>
      <Search 
        initialQuery={query}
        initialNumber={number}
        initialSort={sortBy}
        initialSortDir={sortDirection}
        onSearch={handleSearch}
      />
      
      {loading && <p className={styles.loading}>Loading recipes...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {recipes.map(recipe => (
          <RecipeCard 
            key={recipe.id}
            recipe={recipe}
            onClick={() => viewRecipe(recipe.id)}
          />
        ))}
      </div>

      {!loading && !error && recipes.length === 0 && (
        <p className={styles.noResults}>No recipes found. Try a search!</p>
      )}
    </div>
  );
};

export default RecipeList;