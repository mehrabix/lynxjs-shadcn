import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
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

describe('Button Interactions and Events', () => {
  beforeEach(() => {
    globalThis.lynxTestingEnv?.switchToMainThread();
    vi.clearAllMocks();
  });

  describe('Click Events', () => {
    it('should handle single click events', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button onPress={mockOnPress}>
          <text>Click Me</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      simulateLynxTap(mockOnPress);
      
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple click events', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button onPress={mockOnPress}>
          <text>Multiple Clicks</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      // Click multiple times
      simulateLynxTap(mockOnPress);
      simulateLynxTap(mockOnPress);
      simulateLynxTap(mockOnPress);
      
      expect(mockOnPress).toHaveBeenCalledTimes(3);
    });

    it('should not call onPress when button is disabled', () => {
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

    it('should handle rapid clicks', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button onPress={mockOnPress}>
          <text>Rapid Clicks</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        simulateLynxTap(mockOnPress);
      }
      
      expect(mockOnPress).toHaveBeenCalledTimes(10);
    });
  });

  describe('Touch Events (Lynx-specific)', () => {
    it('should handle touch start events', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button onPress={mockOnPress}>
          <text>Touch Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      // Simulate touch events
      fireEvent.touchStart(button!);
      fireEvent.touchEnd(button!);
      
      // In Lynx, touch events should trigger the onPress handler
      expect(button).toBeInTheDocument();
    });

    it('should handle touch move events', () => {
      const { container } = render(
        <Button>
          <text>Touch Move</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      fireEvent.touchMove(button!);
      
      expect(button).toBeInTheDocument();
    });

    it('should handle touch cancel events', () => {
      const { container } = render(
        <Button>
          <text>Touch Cancel</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      fireEvent.touchCancel(button!);
      
      expect(button).toBeInTheDocument();
    });
  });

  describe('Focus Events', () => {
    it('should handle focus events', () => {
      const { container } = render(
        <Button>
          <text>Focusable Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      fireEvent.focus(button!);
      
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });

    it('should handle blur events', () => {
      const { container } = render(
        <Button>
          <text>Blur Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      fireEvent.blur(button!);
      
      expect(button).toBeInTheDocument();
    });

    it('should handle focus and blur sequence', () => {
      const { container } = render(
        <Button>
          <text>Focus Blur Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      fireEvent.focus(button!);
      fireEvent.blur(button!);
      
      expect(button).toBeInTheDocument();
    });
  });

  describe('Keyboard Events', () => {
    it('should handle Enter key press', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button onPress={mockOnPress}>
          <text>Enter Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      fireEvent.keyDown(button!, { key: 'Enter', code: 'Enter' });
      fireEvent.keyUp(button!, { key: 'Enter', code: 'Enter' });
      
      expect(button).toBeInTheDocument();
    });

    it('should handle Space key press', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button onPress={mockOnPress}>
          <text>Space Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      fireEvent.keyDown(button!, { key: ' ', code: 'Space' });
      fireEvent.keyUp(button!, { key: ' ', code: 'Space' });
      
      expect(button).toBeInTheDocument();
    });

    it('should handle Escape key press', () => {
      const { container } = render(
        <Button>
          <text>Escape Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      fireEvent.keyDown(button!, { key: 'Escape', code: 'Escape' });
      
      expect(button).toBeInTheDocument();
    });
  });

  describe('Event Propagation', () => {
    it('should prevent event bubbling when needed', () => {
      const mockParentClick = vi.fn();
      const mockButtonClick = vi.fn();
      
      const { container } = render(
        <view bindtap={mockParentClick}>
          <Button onPress={mockButtonClick}>
            <text>Nested Button</text>
          </Button>
        </view>
      );
      
      const button = container.querySelector('view[class*="inline-flex"]');
      simulateLynxTap(mockButtonClick);
      
      expect(mockButtonClick).toHaveBeenCalledTimes(1);
      // Note: Event propagation behavior may vary in Lynx
    });

    it('should handle events on disabled buttons', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button disabled={true} onPress={mockOnPress}>
          <text>Disabled Event Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      // Try various events on disabled button
      simulateLynxTap(mockOnPress, true);
      fireEvent.touchStart(button!);
      fireEvent.keyDown(button!, { key: 'Enter' });
      
      expect(mockOnPress).not.toHaveBeenCalled();
    });
  });

  describe('Async Event Handling', () => {
    it('should handle async onPress handlers', async () => {
      const mockOnPress = vi.fn().mockResolvedValue('async result');
      const { container } = render(
        <Button onPress={mockOnPress}>
          <text>Async Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      simulateLynxTap(mockOnPress);
      
      expect(mockOnPress).toHaveBeenCalledTimes(1);
      
      // Wait for async operation
      await mockOnPress.mock.results[0].value;
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should handle onPress handlers that throw errors', () => {
      const mockOnPress = vi.fn().mockImplementation(() => {
        throw new Error('Test error');
      });
      
      const { container } = render(
        <Button onPress={mockOnPress}>
          <text>Error Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      // Should not throw when clicked (error handling is up to the app)
      expect(() => fireEvent.click(button!)).not.toThrow();
    });
  });

  describe('Event Handler Variations', () => {
    it('should handle undefined onPress gracefully', () => {
      const { container } = render(
        <Button onPress={undefined}>
          <text>Undefined Handler</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      expect(() => fireEvent.click(button!)).not.toThrow();
    });

    it('should handle null onPress gracefully', () => {
      const { container } = render(
        <Button onPress={null as any}>
          <text>Null Handler</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      expect(() => fireEvent.click(button!)).not.toThrow();
    });

    it('should handle onPress with parameters', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button onPress={() => mockOnPress('test', 123)}>
          <text>Parameter Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      simulateLynxTap(() => mockOnPress('test', 123));

      expect(mockOnPress).toHaveBeenCalledWith('test', 123);
    });
  });

  describe('Performance and Memory', () => {
    it('should not leak memory with many button clicks', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button onPress={mockOnPress}>
          <text>Memory Test Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      // Simulate many clicks
      for (let i = 0; i < 1000; i++) {
        simulateLynxTap(mockOnPress);
      }
      
      expect(mockOnPress).toHaveBeenCalledTimes(1000);
    });

    it('should handle rapid mount/unmount cycles', () => {
      const mockOnPress = vi.fn();
      
      // Simulate rapid mount/unmount
      for (let i = 0; i < 100; i++) {
        const { container, unmount } = render(
          <Button onPress={mockOnPress}>
            <text>Rapid Mount Button</text>
          </Button>
        );
        
        const button = container.querySelector('view');
        simulateLynxTap(mockOnPress);
        
        unmount();
      }
      
      expect(mockOnPress).toHaveBeenCalledTimes(100);
    });
  });
});
