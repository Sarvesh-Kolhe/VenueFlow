import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import React from 'react';

// Mock AuthContext
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { displayName: 'Test User', email: 'test@example.com' },
    signIn: vi.fn(),
    logout: vi.fn(),
    loading: false
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
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
