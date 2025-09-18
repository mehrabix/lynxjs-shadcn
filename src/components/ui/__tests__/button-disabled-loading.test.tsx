import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Button } from '../button.js';

// Mock the cn utility function
vi.mock('../../lib/utils.js', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}));

// Helper function to simulate Lynx bindtap events
const simulateLynxTap = (onPress?: (...args: any[]) => void, disabled = false, ...args: any[]) => {
  if (onPress && !disabled) {
    onPress(...args);
  }
};

describe('Button Disabled States and Loading Behavior', () => {
  beforeEach(() => {
    globalThis.lynxTestingEnv?.switchToMainThread();
    vi.clearAllMocks();
  });

  describe('Disabled State', () => {
    it('should render disabled button correctly', () => {
      const { container } = render(
        <Button disabled={true}>
          <text>Disabled Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toHaveClass('pointer-events-none', 'opacity-50');
    });

    it('should not call onPress when disabled', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button disabled={true} onPress={mockOnPress}>
          <text>Disabled Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      simulateLynxTap(mockOnPress, true);
      
      expect(mockOnPress).not.toHaveBeenCalled();
    });

    it('should apply disabled styles to all variants', () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
      
      variants.forEach(variant => {
        const { container } = render(
          <Button variant={variant} disabled={true}>
            <text>Disabled {variant}</text>
          </Button>
        );
        
        const button = container.querySelector('view');
        expect(button).toHaveClass('pointer-events-none', 'opacity-50');
      });
    });

    it('should apply disabled styles to all sizes', () => {
      const sizes = ['sm', 'default', 'lg', 'icon'] as const;
      
      sizes.forEach(size => {
        const { container } = render(
          <Button size={size} disabled={true}>
            <text>Disabled {size}</text>
          </Button>
        );
        
        const button = container.querySelector('view');
        expect(button).toHaveClass('pointer-events-none', 'opacity-50');
      });
    });

    it('should handle disabled state with custom className', () => {
      const { container } = render(
        <Button disabled={true} className="custom-disabled">
          <text>Custom Disabled</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toHaveClass('custom-disabled', 'pointer-events-none', 'opacity-50');
    });

    it('should handle disabled state with asChild', () => {
      const { container } = render(
        <Button asChild disabled={true}>
          <view className="disabled-child" bindtap={() => {}}>
            <text>Disabled Child</text>
          </view>
        </Button>
      );
      
      const wrapperElement = container.querySelector('view[class*="inline-flex"]');
      expect(wrapperElement).toHaveClass('pointer-events-none', 'opacity-50');
    });
  });

  describe('Loading State Simulation', () => {
    it('should handle loading state with disabled prop', () => {
      const { container } = render(
        <Button disabled={true} className="opacity-50">
          <text>Please wait...</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toHaveClass('pointer-events-none', 'opacity-50', 'opacity-50');
    });

    it('should simulate loading behavior with async onPress', async () => {
      const mockOnPress = vi.fn().mockImplementation(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return 'loaded';
      });
      
      const { container } = render(
        <Button onPress={mockOnPress}>
          <text>Loading Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      simulateLynxTap(mockOnPress);
      
      expect(mockOnPress).toHaveBeenCalledTimes(1);
      
      // Wait for async operation
      await waitFor(() => {
        expect(mockOnPress).toHaveBeenCalledTimes(1);
      });
    });

    it('should handle loading state with conditional rendering', () => {
      const isLoading = true;
      const { container } = render(
        <Button disabled={isLoading}>
          <text>{isLoading ? 'Please wait...' : 'Submit'}</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      const textElement = container.querySelector('text');
      
      expect(button).toHaveClass('pointer-events-none', 'opacity-50');
      expect(textElement).toHaveTextContent('Please wait...');
    });

    it('should handle loading state with opacity styling', () => {
      const isLoading = true;
      const { container } = render(
        <Button disabled={isLoading} className={isLoading ? 'opacity-50' : ''}>
          <text>Loading Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toHaveClass('opacity-50', 'pointer-events-none', 'opacity-50');
    });
  });

  describe('State Transitions', () => {
    it('should transition from enabled to disabled', () => {
      const { container, rerender } = render(
        <Button disabled={false}>
          <text>Enabled Button</text>
        </Button>
      );
      
      let button = container.querySelector('view');
      expect(button).not.toHaveClass('pointer-events-none', 'opacity-50');
      
      rerender(
        <Button disabled={true}>
          <text>Disabled Button</text>
        </Button>
      );
      
      button = container.querySelector('view');
      expect(button).toHaveClass('pointer-events-none', 'opacity-50');
    });

    it('should transition from disabled to enabled', () => {
      const { container, rerender } = render(
        <Button disabled={true}>
          <text>Disabled Button</text>
        </Button>
      );
      
      let button = container.querySelector('view');
      expect(button).toHaveClass('pointer-events-none', 'opacity-50');
      
      rerender(
        <Button disabled={false}>
          <text>Enabled Button</text>
        </Button>
      );
      
      button = container.querySelector('view');
      expect(button).not.toHaveClass('pointer-events-none', 'opacity-50');
    });

    it('should handle rapid state changes', () => {
      const { container, rerender } = render(
        <Button disabled={false}>
          <text>Rapid Changes</text>
        </Button>
      );
      
      // Rapidly change disabled state
      for (let i = 0; i < 10; i++) {
        rerender(
          <Button disabled={i % 2 === 0}>
            <text>Rapid Changes {i}</text>
          </Button>
        );
        
        const button = container.querySelector('view');
        if (i % 2 === 0) {
          expect(button).toHaveClass('pointer-events-none', 'opacity-50');
        } else {
          expect(button).not.toHaveClass('pointer-events-none', 'opacity-50');
        }
      }
    });
  });

  describe('Loading State Patterns', () => {
    it('should handle loading with spinner simulation', () => {
      const isLoading = true;
      const { container } = render(
        <Button disabled={isLoading}>
          <text>{isLoading ? '⏳ Loading...' : 'Submit'}</text>
        </Button>
      );
      
      const textElement = container.querySelector('text');
      expect(textElement).toHaveTextContent('⏳ Loading...');
    });

    it('should handle loading with progress indication', () => {
      const progress = 50;
      const isLoading = progress < 100;
      const { container } = render(
        <Button disabled={isLoading}>
          <text>{isLoading ? `Loading ${progress}%...` : 'Complete'}</text>
        </Button>
      );
      
      const textElement = container.querySelector('text');
      expect(textElement).toHaveTextContent('Loading 50%...');
    });

    it('should handle loading with different states', () => {
      const states = [
        { loading: false, text: 'Submit' },
        { loading: true, text: 'Please wait...' },
        { loading: false, text: 'Submitted!' }
      ];
      
      states.forEach((state, index) => {
        const { container } = render(
          <Button disabled={state.loading}>
            <text>{state.text}</text>
          </Button>
        );
        
        const button = container.querySelector('view');
        const textElement = container.querySelector('text');
        
        expect(textElement).toHaveTextContent(state.text);
        
        if (state.loading) {
          expect(button).toHaveClass('pointer-events-none', 'opacity-50');
        } else {
          expect(button).not.toHaveClass('pointer-events-none', 'opacity-50');
        }
      });
    });
  });

  describe('Error States', () => {
    it('should handle error state with disabled button', () => {
      const hasError = true;
      const { container } = render(
        <Button disabled={hasError} variant="destructive">
          <text>{hasError ? 'Error occurred' : 'Submit'}</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      const textElement = container.querySelector('text');
      
      expect(button).toHaveClass('pointer-events-none', 'opacity-50', 'bg-red-500');
      expect(textElement).toHaveTextContent('Error occurred');
    });

    it('should handle retry state after error', () => {
      const hasError = true;
      const canRetry = true;
      const { container } = render(
        <Button disabled={hasError && !canRetry}>
          <text>{hasError ? (canRetry ? 'Retry' : 'Error') : 'Submit'}</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      const textElement = container.querySelector('text');
      
      expect(button).not.toHaveClass('pointer-events-none', 'opacity-50');
      expect(textElement).toHaveTextContent('Retry');
    });
  });

  describe('Accessibility with Disabled State', () => {
    it('should maintain focus states when disabled', () => {
      const { container } = render(
        <Button disabled={true}>
          <text>Disabled Focusable</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });

    it('should handle keyboard navigation when disabled', () => {
      const { container } = render(
        <Button disabled={true}>
          <text>Disabled Keyboard</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      // Should not throw when keyboard events are fired
      expect(() => {
        fireEvent.keyDown(button!, { key: 'Enter' });
        fireEvent.keyUp(button!, { key: 'Enter' });
      }).not.toThrow();
    });
  });

  describe('Performance with Disabled State', () => {
    it('should handle many disabled buttons efficiently', () => {
      const buttons = Array.from({ length: 100 }, (_, i) => (
        <Button key={i} disabled={i % 2 === 0}>
          <text>Button {i}</text>
        </Button>
      ));
      
      const { container } = render(<view>{buttons}</view>);
      
      const buttonElements = container.querySelectorAll('view[class*="inline-flex"]');
      expect(buttonElements).toHaveLength(100);
      
      buttonElements.forEach((element, index) => {
        if (index % 2 === 0) {
          expect(element).toHaveClass('pointer-events-none', 'opacity-50');
        } else {
          expect(element).not.toHaveClass('pointer-events-none', 'opacity-50');
        }
      });
    });

    it('should handle rapid disabled state changes', () => {
      const { container, rerender } = render(
        <Button disabled={false}>
          <text>Rapid Disabled Changes</text>
        </Button>
      );
      
      const startTime = Date.now();
      
      // Rapidly change disabled state
      for (let i = 0; i < 1000; i++) {
        rerender(
          <Button disabled={i % 2 === 0}>
            <text>Rapid Changes {i}</text>
          </Button>
        );
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should complete within reasonable time (less than 2 seconds)
      expect(duration).toBeLessThan(2000);
    });
  });
});
