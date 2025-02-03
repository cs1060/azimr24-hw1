import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../components/Search';

describe('Search Component', () => {
  test('submits search query', async () => {
    const mockSearch = jest.fn();
    render(<Search onSearch={mockSearch} />);
    
    await userEvent.type(
      screen.getByPlaceholderText('Search for recipes...'), 
      'pasta'
    );
    await userEvent.click(screen.getByRole('button', { name: /search/i }));
    
    expect(mockSearch).toHaveBeenCalledWith('pasta', 4, "", 'desc');
  });
});