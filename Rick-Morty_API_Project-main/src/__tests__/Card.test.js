/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '../components/Card'; // Adjust the import path as necessary
import { getStatusColor } from '../utils/helper';

// Mock the getStatusColor function
jest.mock('../utils/helper', () => ({
  getStatusColor: jest.fn()
}));

const mockItem = {
  id: 1,
  image: 'https://via.placeholder.com/150',
  name: 'Character Name',
  status: 'Alive',
  species: 'Human',
  location: { name: 'Earth' },
  episodeDetails: { name: 'Episode 1' }
};

describe('Card component', () => {
  beforeEach(() => {
    getStatusColor.mockReturnValue('green'); // Mock the return value of getStatusColor
  });

  test('renders correctly with given props', () => {
    render(
      <MemoryRouter>
        <Card item={mockItem} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: /char-img/i })).toHaveAttribute('src', mockItem.image);
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockItem.status}-${mockItem.species}`)).toBeInTheDocument();
    expect(screen.getByText(/last known location/i)).toBeInTheDocument();
    expect(screen.getByText(mockItem.location.name)).toBeInTheDocument();
    expect(screen.getByText(/first seen in/i)).toBeInTheDocument();
    expect(screen.getByText(mockItem.episodeDetails.name)).toBeInTheDocument();
  });

  test('links to the correct profile URL', () => {
    render(
      <MemoryRouter>
        <Card item={mockItem} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', `/profile/${mockItem.id}`);
  });

  test('displays the correct status color', () => {
    render(
      <MemoryRouter>
        <Card item={mockItem} />
      </MemoryRouter>
    );

    expect(screen.getByText(`${mockItem.status}-${mockItem.species}`)).toBeInTheDocument();
    expect(screen.getByTestId('status-color')).toHaveStyle(`background-color: green`);
  });

  test('handles missing optional props gracefully', () => {
    const incompleteItem = {
      id: 2,
      name: 'Incomplete Character'
    };

    render(
      <MemoryRouter>
        <Card item={incompleteItem} />
      </MemoryRouter>
    );

    expect(screen.getByText(incompleteItem.name)).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeInTheDocument();
    expect(screen.queryByText(/last known location/i)).toBeInTheDocument();
    expect(screen.queryByText(/first seen in/i)).toBeInTheDocument();
  });
});
