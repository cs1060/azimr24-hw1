import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './RecipeDetail.module.css';
import RecipeInstructions from './RecipeInstructions';

const RecipeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { query, number, sortBy } = location.state || {};
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(true);
  const [errorIngredients, setErrorIngredients] = useState('');

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipes/${id}/ingredients`
        );
        setIngredients(response.data.ingredients);
      } catch (err) {
        setErrorIngredients('Failed to load ingredients');
      } finally {
        setLoadingIngredients(false);
      }
    };

    fetchIngredients();
  }, [id]);

  const handleBack = () => {
    navigate('/', { state: { query, number, sortBy } }) // Go back to the previous page with preserved state
  };

  return (
    <div className={styles.recipeDetail}>
      <button onClick={handleBack} className={styles.backButton}>
        &larr; Back to Recipes
      </button>

      <div className={styles.sections}>
        <section className={styles.section}>
          <h2>Ingredients</h2>
          {loadingIngredients && <p>Loading ingredients...</p>}
          {errorIngredients && <p className={styles.error}>{errorIngredients}</p>}
          <ul className={styles.ingredientsList}>
            {ingredients.map((ingredient, index) => (
              <li key={index} className={styles.ingredientItem}>
                {ingredient}
              </li>
            ))}
          </ul>
          {!loadingIngredients && ingredients.length === 0 && !errorIngredients && (
            <p>No ingredients information available</p>
          )}
        </section>

        <section className={styles.section}>
          <RecipeInstructions recipeId={id} />
        </section>
      </div>
    </div>
  );
};

export default RecipeDetail;