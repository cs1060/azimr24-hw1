import styles from './RecipeCard.module.css';
import placeholderImage from './placeholder-food.jpg'; // Add a placeholder image to your project

const RecipeCard = ({ recipe, onClick }) => {
  // Check if the image is valid or meets minimum size requirements
  const imageUrl = recipe.image

  return (
    <div className={styles.recipeCard} onClick={onClick}>
      <img 
        src={imageUrl} 
        alt={recipe.title}
        className={styles.image}
        loading="lazy"
        onError={(e) => e.target.src = placeholderImage} 
      />
      {recipe.summary && (
        <h3 
          className={styles.title}
          dangerouslySetInnerHTML={{ 
            __html: recipe.title.replace(/<[^>]*>/g, '').substring(0, 20) + '...'
          }} 
        />
      )}
      {recipe.summary && (
        <p 
          className={styles.summary}
          dangerouslySetInnerHTML={{ 
            __html: recipe.summary.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
          }} 
        />
      )}
      <button className={styles.button}>View Ingredients</button>
    </div>
  );
};

export default RecipeCard;