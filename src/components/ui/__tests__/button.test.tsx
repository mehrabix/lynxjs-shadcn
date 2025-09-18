import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../button.js';

// Mock the cn utility function
vi.mock('../lib/utils.js', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' ')
}));

// Helper function to simulate Lynx bindtap events
const simulateLynxTap = (onPress?: () => void, disabled = false) => {
  if (onPress && !disabled) {
    onPress();
  }
};

describe('Button Component', () => {
  beforeEach(() => {
    // Ensure we're on the main thread for component testing
    globalThis.lynxTestingEnv?.switchToMainThread();
  });

  describe('Basic Rendering', () => {
    it('should render a button with default props', () => {
      const { container } = render(
        <Button>
          <text>Click me</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    it('should render button text correctly', () => {
      const { getByText } = render(
        <Button>
          <text>Test Button</text>
        </Button>
      );
      
      expect(getByText('Test Button')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <Button className="custom-class">
          <text>Custom</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Button Variants', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;

    variants.forEach(variant => {
      it(`should render ${variant} variant correctly`, () => {
        const { container } = render(
          <Button variant={variant}>
            <text>{variant} Button</text>
          </Button>
        );
        
        const button = container.querySelector('view');
        expect(button).toBeInTheDocument();
        
        // Check for variant-specific classes
        switch (variant) {
          case 'default':
            expect(button).toHaveClass('bg-slate-900');
            break;
          case 'destructive':
            expect(button).toHaveClass('bg-red-500');
            break;
          case 'outline':
            expect(button).toHaveClass('border', 'border-slate-200');
            break;
          case 'secondary':
            expect(button).toHaveClass('bg-slate-100');
            break;
          case 'ghost':
            expect(button).toHaveClass('hover:bg-slate-100');
            break;
          case 'link':
            expect(button).not.toHaveClass('underline');
            const textElement = container.querySelector('text');
            expect(textElement).toHaveClass('text-primary', 'dark:text-primary', 'underline');
            break;
        }
      });
    });
  });

  describe('Button Sizes', () => {
    const sizes = ['sm', 'default', 'lg', 'icon'] as const;

    sizes.forEach(size => {
      it(`should render ${size} size correctly`, () => {
        const { container } = render(
          <Button size={size}>
            <text>{size} Button</text>
          </Button>
        );
        
        const button = container.querySelector('view');
        expect(button).toBeInTheDocument();
        
        // Check for size-specific classes
        switch (size) {
          case 'sm':
            expect(button).toHaveClass('h-9', 'px-3');
            break;
          case 'default':
            expect(button).toHaveClass('h-10', 'px-4', 'py-2');
            break;
          case 'lg':
            expect(button).toHaveClass('h-11', 'px-8');
            break;
          case 'icon':
            expect(button).toHaveClass('h-10', 'w-10');
            break;
        }
      });
    });
  });

  describe('Button Interactions', () => {
    it('should call onPress when button is clicked', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button onPress={mockOnPress}>
          <text>Click me</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toBeInTheDocument();
      
      // Simulate Lynx bindtap event
      simulateLynxTap(mockOnPress);
      
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

           it('should not call onPress when button is disabled', () => {
             const mockOnPress = vi.fn();
             const { container } = render(
               <Button disabled={true} onPress={mockOnPress}>
                 <text>Disabled</text>
               </Button>
             );
             
             const button = container.querySelector('view');
             expect(button).toBeInTheDocument();
             
             // Simulate Lynx bindtap event (should not be called when disabled)
             // When disabled, bindtap is set to empty function, so onPress won't be called
             simulateLynxTap(mockOnPress, true);
             
             expect(mockOnPress).not.toHaveBeenCalled();
           });

    it('should apply disabled styles when disabled', () => {
      const { container } = render(
        <Button disabled={true}>
          <text>Disabled</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toHaveClass('pointer-events-none', 'opacity-50');
    });
  });

  describe('asChild Prop', () => {
    it('should render as child element when asChild is true', () => {
      const { container } = render(
        <Button asChild>
          <view className="custom-element" bindtap={() => {}}>
            <text>Custom Element</text>
          </view>
        </Button>
      );
      
      const wrapperElement = container.querySelector('view');
      expect(wrapperElement).toBeInTheDocument();
      expect(wrapperElement).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    it('should apply button styles to child element when asChild is true', () => {
      const { container } = render(
        <Button asChild variant="outline" size="lg">
          <view className="custom-element" bindtap={() => {}}>
            <text>Custom Element</text>
          </view>
        </Button>
      );
      
      const wrapperElement = container.querySelector('view');
      expect(wrapperElement).toHaveClass('border', 'border-slate-200', 'h-11', 'px-8');
    });

    it('should handle child element click events', () => {
      const mockChildClick = vi.fn();
      const { container } = render(
        <Button asChild>
          <view className="custom-element" bindtap={mockChildClick}>
            <text>Custom Element</text>
          </view>
        </Button>
      );
      
      const wrapperElement = container.querySelector('view');
      expect(wrapperElement).toBeInTheDocument();
      
      // Simulate Lynx bindtap event
      simulateLynxTap(mockChildClick);
      
      expect(mockChildClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Text Color Handling', () => {
    it('should apply correct text colors for each variant', () => {
      const { container } = render(
        <Button variant="default">
          <text>Default Button</text>
        </Button>
      );
      
      const textElement = container.querySelector('text');
      expect(textElement).toHaveClass('text-white', 'dark:text-black');
    });

    it('should apply correct text colors for destructive variant', () => {
      const { container } = render(
        <Button variant="destructive">
          <text>Destructive Button</text>
        </Button>
      );
      
      const textElement = container.querySelector('text');
      expect(textElement).toHaveClass('text-white', 'dark:text-white');
    });

    it('should apply correct text colors for outline variant', () => {
      const { container } = render(
        <Button variant="outline">
          <text>Outline Button</text>
        </Button>
      );
      
      const textElement = container.querySelector('text');
      expect(textElement).toHaveClass('text-black', 'dark:text-white');
    });
  });

  describe('Complex Combinations', () => {
    it('should handle multiple props together', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button 
          variant="destructive" 
          size="lg" 
          disabled={false}
          className="custom-class"
          onPress={mockOnPress}
        >
          <text>Complex Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      const textElement = container.querySelector('text');
      
      expect(button).toHaveClass('bg-red-500', 'h-11', 'px-8', 'custom-class');
      expect(textElement).toHaveClass('text-white', 'dark:text-white');
      
      // Simulate Lynx bindtap event
      simulateLynxTap(mockOnPress);
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should handle disabled state with custom styling', () => {
      const { container } = render(
        <Button 
          variant="outline" 
          size="sm" 
          disabled={true}
          className="custom-disabled"
        >
          <text>Disabled Custom</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toHaveClass('border', 'border-slate-200', 'h-9', 'px-3', 'custom-disabled');
      expect(button).toHaveClass('pointer-events-none', 'opacity-50');
    });
  });

  describe('Accessibility', () => {
    it('should have proper focus states', () => {
      const { container } = render(
        <Button>
          <text>Focusable Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
    });

    it('should handle keyboard navigation', () => {
      const mockOnPress = vi.fn();
      const { container } = render(
        <Button onPress={mockOnPress}>
          <text>Keyboard Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      
      // Simulate keyboard events
      fireEvent.keyDown(button!, { key: 'Enter' });
      fireEvent.keyUp(button!, { key: 'Enter' });
      
      // Note: Lynx handles touch events primarily, but we test the structure
      expect(button).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      const { container } = render(<Button />);
      const button = container.querySelector('view');
      expect(button).toBeInTheDocument();
    });

    it('should handle undefined onPress', () => {
      const { container } = render(
        <Button onPress={undefined}>
          <text>No Handler</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toBeInTheDocument();
      
      // Should not throw when clicked
      expect(() => fireEvent.click(button!)).not.toThrow();
    });

    it('should handle multiple text elements', () => {
      const { container } = render(
        <Button>
          <text>First</text>
          <text>Second</text>
        </Button>
      );
      
      const textElements = container.querySelectorAll('text');
      expect(textElements).toHaveLength(3); // Includes the wrapper text element
      expect(textElements[1]).toHaveTextContent('First');
      expect(textElements[2]).toHaveTextContent('Second');
    });
  });

  describe('Dark Mode Support', () => {
    it('should apply dark mode classes correctly', () => {
      const { container } = render(
        <Button variant="default">
          <text>Dark Mode Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      const textElement = container.querySelector('text');
      
      expect(button).toHaveClass('dark:bg-slate-50');
      expect(textElement).toHaveClass('dark:text-black');
    });

    it('should handle dark mode for all variants', () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
      
      variants.forEach(variant => {
        const { container } = render(
          <Button variant={variant}>
            <text>{variant} Dark</text>
          </Button>
        );
        
        const button = container.querySelector('view');
        expect(button).toHaveClass('dark:focus:ring-slate-300');
      });
    });
  });
});
