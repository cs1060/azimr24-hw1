import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './RecipeInstructions.module.css';

const RecipeInstructions = ({ recipeId }) => {
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipes/${recipeId}/instructions`,
          { params: { stepBreakdown: true } }
        );
        setInstructions(response.data[0]?.steps || []);
      } catch (err) {
        setError('Failed to load instructions');
      } finally {
        setLoading(false);
      }
    };

    fetchInstructions();
  }, [recipeId]);

  if (loading) return <p>Loading instructions...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!instructions.length) return <p>No instructions available</p>;

  return (
    <div className={styles.instructions}>
      <h3>Cooking Instructions</h3>
      <ol className={styles.steps}>
        {instructions.map((step) => (
          <li key={step.number} className={styles.step}>
            <div className={styles.stepContent}>
              <span className={styles.stepNumber}>Step {step.number}</span>
              <p>{step.step}</p>
              {step.ingredients.length > 0 && (
                <div className={styles.meta}>
                  <strong>Ingredients:</strong>
                  <ul>
                    {step.ingredients.map((ingredient) => (
                      <li key={ingredient.id}>{ingredient.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {step.equipment.length > 0 && (
                <div className={styles.meta}>
                  <strong>Equipment:</strong>
                  <ul>
                    {step.equipment.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeInstructions;