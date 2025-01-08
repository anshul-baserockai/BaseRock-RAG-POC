import { describe, it, expect } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

// Mock the logo import
jest.mock('../../src/logo.svg', () => 'mocked-logo.svg');

// Mock the CSS import
jest.mock('../../src/App.css', () => ({}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/learn react/i)).toBeInTheDocument();
  });

  it('displays the correct logo', () => {
    render(<App />);
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', 'mocked-logo.svg');
    expect(logoElement).toHaveClass('App-logo');
  });

  it('contains the correct text content', () => {
    render(<App />);
    expect(screen.getByText(/edit/i)).toHaveTextContent('Edit src/App.js and save to reload.');
  });

  it('has a link to the React website', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toHaveAttribute('href', 'https://reactjs.org');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has the correct structure', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass('App');
    expect(container.querySelector('header')).toHaveClass('App-header');
  });
});