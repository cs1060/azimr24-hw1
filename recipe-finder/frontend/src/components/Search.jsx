import { useState } from 'react';
import styles from './Search.module.css';

const Search = ({ 
    initialQuery = '', 
    initialNumber = 4, 
    initialSort = '', 
    initialSortDir = 'desc',
    onSearch }) => {
    const [query, setQuery] = useState(initialQuery);
    const [number, setNumber] = useState(initialNumber);
    const [sortBy, setSortBy] = useState(initialSort);
    const [sortDirection, setSortDirection] = useState(initialSortDir);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim(), number, sortBy, sortDirection);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
            type="text"
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for recipes..."
        />
        <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
        >
            <option value="">Sort By</option>
            <option value="meta-score">Meta Score</option>
            <option value="popularity">Popularity</option>
            <option value="healthiness">Healthiness</option>
            <option value="time">Cooking Time</option>
            <option value="calories">Calories</option>
            <option value="protein">Protein</option>
            <option value="carbs">Carbs</option>
            <option value="fat">Fat</option>
            {/* Add other sorting options as needed */}
        </select>

        <select
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
            className={styles.select}
        >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
        </select>

        <input
            type="number"
            min="1"
            max="100"
            value={number}
            onChange={(e) => setNumber(Math.min(100, Math.max(1, e.target.value)))}
            className={styles.numberInput}
        />
        <button className={styles.button} type="submit">Search</button>
        </form>
    );
};

export default Search;

