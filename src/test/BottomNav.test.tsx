import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BottomNav } from '../components/BottomNav';
import React from 'react';

describe('BottomNav Component', () => {
  const mockOnModuleChange = vi.fn();

  it('renders all navigation tabs', () => {
    render(<BottomNav activeModule="dashboard" onModuleChange={mockOnModuleChange} />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Flow/i)).toBeInTheDocument();
    expect(screen.getByText(/Eats/i)).toBeInTheDocument();
  });

  it('calls onModuleChange when a tab is clicked', () => {
    render(<BottomNav activeModule="dashboard" onModuleChange={mockOnModuleChange} />);
    const flowTab = screen.getByText(/Flow/i).parentElement;
    if (flowTab) {
      fireEvent.click(flowTab);
    }
    expect(mockOnModuleChange).toHaveBeenCalledWith('navigator');
  });

  it('highlights the active tab', () => {
    render(<BottomNav activeModule="navigator" onModuleChange={mockOnModuleChange} />);
    const flowButton = screen.getByLabelText(/Go to Flow/i);
    expect(flowButton).toHaveAttribute('aria-current', 'page');
  });
});
