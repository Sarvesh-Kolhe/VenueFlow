import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import React from 'react';

// Mock gemini to avoid async state updates during test
vi.mock('../lib/gemini', () => ({
  generateStadiumInsights: vi.fn().mockResolvedValue('Mocked Insight'),
  ai: {}
}));

describe('App Component', () => {
  it('renders VenueFlow name', async () => {
    await act(async () => {
      render(<App />);
    });
    const appNameElements = screen.getAllByText(/VenueFlow/i);
    expect(appNameElements.length).toBeGreaterThan(0);
  });

  it('renders management section in sidebar', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText(/Management/i)).toBeInTheDocument();
  });
});
