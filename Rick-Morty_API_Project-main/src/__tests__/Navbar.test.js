/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import Navbar from '../components/Navbar';

describe('Navbar component', () => {
  const renderNavbar = () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  test('renders with menu closed initially', () => {
    renderNavbar();
    expect(screen.getByRole('navigation')).toHaveClass('navbar');
    expect(screen.queryByRole('list')).not.toHaveClass('open');
  });

  test('opens the menu when toggle button is clicked', () => {
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { name: /☰/ }));
    expect(screen.getByRole('list')).toHaveClass('open');
  });

  test('closes the menu when toggle button is clicked again', () => {
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { name: /☰/ }));
    expect(screen.getByRole('list')).toHaveClass('open');
    fireEvent.click(screen.getByRole('button', { name: /☰/ }));
    expect(screen.getByRole('list')).not.toHaveClass('open');
  });

  test('closes the menu when a link is clicked', () => {
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { name: /☰/ }));
    expect(screen.getByRole('list')).toHaveClass('open');
    fireEvent.click(screen.getByText(/Home/i));
    expect(screen.getByRole('list')).not.toHaveClass('open');
  });
});
