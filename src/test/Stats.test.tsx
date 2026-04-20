import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LivePulseDashboard } from '../modules/Stats';
import React from 'react';

describe('LivePulseDashboard Component', () => {
  it('renders correctly and shows live telemetry', async () => {
    await act(async () => {
      render(<LivePulseDashboard />);
    });
    
    expect(screen.getByText(/LivePulse/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Telemetry/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/System Health/i)).toBeInTheDocument();
  });
});
