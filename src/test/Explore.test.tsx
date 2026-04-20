import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dashboard } from '../modules/Explore';
import React from 'react';

describe('Dashboard Component', () => {
  it('renders stats and ai insights', async () => {
    await act(async () => {
      render(<Dashboard />);
    });
    
    expect(screen.getByText(/VenueFlow Intelligence/i)).toBeInTheDocument();
    expect(screen.getByText(/XP Progression/i)).toBeInTheDocument();
    expect(screen.getByText(/Fan Carbon Offset/i)).toBeInTheDocument();
  });
});
