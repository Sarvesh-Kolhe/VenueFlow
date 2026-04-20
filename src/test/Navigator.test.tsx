import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SmartFlowNavigator } from '../modules/Navigator';
import React from 'react';

// Mock d3 for the Navigator test
vi.mock('d3', () => {
  const mockD3 = {
    select: vi.fn(() => mockD3),
    selectAll: vi.fn(() => mockD3),
    remove: vi.fn(() => mockD3),
    append: vi.fn(() => mockD3),
    attr: vi.fn(() => mockD3),
    data: vi.fn(() => mockD3),
    enter: vi.fn(() => mockD3),
    join: vi.fn(() => mockD3),
    style: vi.fn(() => mockD3),
    text: vi.fn(() => mockD3),
    on: vi.fn(() => mockD3),
    range: vi.fn(() => [1, 2, 3]),
    scaleSequential: vi.fn(() => {
      const s = vi.fn(() => '#000000');
      (s as any).domain = vi.fn().mockReturnValue(s);
      return s;
    }),
    interpolateGreens: vi.fn(),
    line: vi.fn(() => {
      const l = vi.fn(() => 'M0,0');
      (l as any).curve = vi.fn().mockReturnValue(l);
      return l;
    }),
    curveBasis: vi.fn(),
  };
  return mockD3;
});

describe('SmartFlowNavigator Component', () => {
  it('renders correctly and allows route selection', async () => {
    await act(async () => {
      render(<SmartFlowNavigator />);
    });
    
    expect(screen.getByText(/SmartFlow/i)).toBeInTheDocument();
    
    // Check for a route button
    const gate4Btn = screen.getByText(/Gate 4/i);
    expect(gate4Btn).toBeInTheDocument();
    
    await act(async () => {
      fireEvent.click(gate4Btn);
    });
    
    // Should show "Reset Analysis" after selection
    expect(screen.getByText(/Reset Analysis/i)).toBeInTheDocument();
  });
});
