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

describe('Button asChild Prop Functionality', () => {
  beforeEach(() => {
    globalThis.lynxTestingEnv?.switchToMainThread();
    vi.clearAllMocks();
  });

  describe('Basic asChild Behavior', () => {
    it('should render child element when asChild is true', () => {
      const { container } = render(
        <Button asChild>
          <view className="custom-element" bindtap={() => {}}>
            <text>Custom Element</text>
          </view>
        </Button>
      );
      
      const wrapperElement = container.querySelector('view[class*="inline-flex"]');
      expect(wrapperElement).toBeInTheDocument();
      expect(wrapperElement).toHaveTextContent('Custom Element');
    });

    it('should not render default button structure when asChild is true', () => {
      const { container } = render(
        <Button asChild>
          <view className="custom-element" bindtap={() => {}}>
            <text>Custom Element</text>
          </view>
        </Button>
      );
      
      // Should not have the default button structure
      const buttons = container.querySelectorAll('view[class*="inline-flex"]');
      expect(buttons).toHaveLength(1); // Only the custom element
    });

    it('should render default button structure when asChild is false', () => {
      const { container } = render(
        <Button asChild={false}>
          <text>Default Button</text>
        </Button>
      );
      
      const button = container.querySelector('view[class*="inline-flex"]');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });
  });

  describe('Style Application with asChild', () => {
    it('should apply button styles to child element', () => {
      const { container } = render(
        <Button asChild variant="outline" size="lg">
          <view className="custom-element" bindtap={() => {}}>
            <text>Styled Custom Element</text>
          </view>
        </Button>
      );
      
      const wrapperElement = container.querySelector('view[class*="inline-flex"]');
      expect(wrapperElement).toHaveClass('border', 'border-slate-200', 'h-11', 'px-8');
      expect(wrapperElement).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    it('should apply all variant styles to child element', () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
      
      variants.forEach(variant => {
        const { container } = render(
          <Button asChild variant={variant}>
            <view className="custom-element" bindtap={() => {}}>
              <text>{variant} Custom</text>
            </view>
          </Button>
        );
        
        const wrapperElement = container.querySelector('view[class*="inline-flex"]');
        expect(wrapperElement).toHaveClass('inline-flex', 'items-center', 'justify-center');
        
        // Check variant-specific classes are applied
        switch (variant) {
          case 'default':
            expect(wrapperElement).toHaveClass('bg-slate-900');
            break;
          case 'destructive':
            expect(wrapperElement).toHaveClass('bg-red-500');
            break;
          case 'outline':
            expect(wrapperElement).toHaveClass('border', 'border-slate-200');
            break;
          case 'secondary':
            expect(wrapperElement).toHaveClass('bg-slate-100');
            break;
          case 'ghost':
            expect(wrapperElement).toHaveClass('hover:bg-slate-100');
            break;
          case 'link':
            expect(wrapperElement).not.toHaveClass('underline');
            break;
        }
      });
    });

    it('should apply all size styles to child element', () => {
      const sizes = ['sm', 'default', 'lg', 'icon'] as const;
      
      sizes.forEach(size => {
        const { container } = render(
          <Button asChild size={size}>
            <view className="custom-element" bindtap={() => {}}>
              <text>{size} Custom</text>
            </view>
          </Button>
        );
        
        const wrapperElement = container.querySelector('view[class*="inline-flex"]');
        expect(wrapperElement).toHaveClass('inline-flex', 'items-center', 'justify-center');
        
        // Check size-specific classes are applied
        switch (size) {
          case 'sm':
            expect(wrapperElement).toHaveClass('h-9', 'px-3');
            break;
          case 'default':
            expect(wrapperElement).toHaveClass('h-10', 'px-4', 'py-2');
            break;
          case 'lg':
            expect(wrapperElement).toHaveClass('h-11', 'px-8');
            break;
          case 'icon':
            expect(wrapperElement).toHaveClass('h-10', 'w-10');
            break;
        }
      });
    });

    it('should apply custom className to child element', () => {
      const { container } = render(
        <Button asChild className="custom-button-class">
          <view className="custom-element" bindtap={() => {}}>
            <text>Custom Class Element</text>
          </view>
        </Button>
      );
      
      const wrapperElement = container.querySelector('view[class*="inline-flex"]');
      expect(wrapperElement).toHaveClass('custom-button-class');
    });
  });

  describe('Event Handling with asChild', () => {
    it('should handle child element click events', () => {
      const mockChildClick = vi.fn();
      const { container } = render(
        <Button asChild>
          <view className="custom-element" bindtap={mockChildClick}>
            <text>Clickable Custom Element</text>
          </view>
        </Button>
      );
      
      const wrapperElement = container.querySelector('view[class*="inline-flex"]');
      simulateLynxTap(mockChildClick);
      
      expect(mockChildClick).toHaveBeenCalledTimes(1);
    });

    it('should not interfere with child element events', () => {
      const mockChildClick = vi.fn();
      const mockButtonPress = vi.fn();
      
      const { container } = render(
        <Button asChild onPress={mockButtonPress}>
          <view className="custom-element" bindtap={mockChildClick}>
            <text>Event Custom Element</text>
          </view>
        </Button>
      );
      
      const wrapperElement = container.querySelector('view[class*="inline-flex"]');
      simulateLynxTap(mockChildClick);
      
      expect(mockChildClick).toHaveBeenCalledTimes(1);
      // Button onPress should not be called when asChild is used
      expect(mockButtonPress).not.toHaveBeenCalled();
    });

    it('should handle multiple child elements', () => {
      const mockFirstClick = vi.fn();
      const mockSecondClick = vi.fn();
      
      const { container } = render(
        <Button asChild>
          <view className="first-element" bindtap={mockFirstClick}>
            <text>First Element</text>
          </view>
          <view className="second-element" bindtap={mockSecondClick}>
            <text>Second Element</text>
          </view>
        </Button>
      );
      
      const firstElement = container.querySelector('view.first-element');
      const secondElement = container.querySelector('view.second-element');
      
      simulateLynxTap(mockFirstClick);
      simulateLynxTap(mockSecondClick);
      
      expect(mockFirstClick).toHaveBeenCalledTimes(1);
      expect(mockSecondClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Complex Child Elements', () => {
    it('should handle nested child elements', () => {
      const { container } = render(
        <Button asChild variant="secondary" size="lg">
          <view className="parent-element" bindtap={() => {}}>
            <view className="child-element">
              <text>Nested Element</text>
            </view>
          </view>
        </Button>
      );
      
      const parentElement = container.querySelector('view[class*="inline-flex"]');
      const childElement = container.querySelector('view.child-element');
      
      expect(parentElement).toBeInTheDocument();
      expect(childElement).toBeInTheDocument();
      expect(parentElement).toHaveClass('bg-slate-100', 'h-11', 'px-8');
    });

    it('should handle child elements with complex content', () => {
      const { container } = render(
        <Button asChild>
          <view className="complex-element" bindtap={() => {}}>
            <text>Title</text>
            <text>Subtitle</text>
            <view className="icon">
              <text>🎯</text>
            </view>
          </view>
        </Button>
      );
      
      const complexElement = container.querySelector('view[class*="inline-flex"]');
      const texts = container.querySelectorAll('text');
      const icon = container.querySelector('view.icon');
      
      expect(complexElement).toBeInTheDocument();
      expect(texts).toHaveLength(3);
      expect(icon).toBeInTheDocument();
      expect(complexElement).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    it('should handle child elements with different tag types', () => {
      const { container } = render(
        <Button asChild>
          <view className="view-element" bindtap={() => {}}>
            <text>View Element</text>
          </view>
        </Button>
      );
      
      const viewElement = container.querySelector('view[class*="inline-flex"]');
      expect(viewElement).toBeInTheDocument();
      expect(viewElement).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });
  });

  describe('Disabled State with asChild', () => {
    it('should apply disabled styles to child element', () => {
      const { container } = render(
        <Button asChild disabled={true}>
          <view className="disabled-element" bindtap={() => {}}>
            <text>Disabled Custom Element</text>
          </view>
        </Button>
      );
      
      const disabledElement = container.querySelector('view[class*="inline-flex"]');
      expect(disabledElement).toHaveClass('pointer-events-none', 'opacity-50');
    });

    it('should prevent child element events when disabled', () => {
      const mockChildClick = vi.fn();
      const { container } = render(
        <Button asChild disabled={true}>
          <view className="disabled-element" bindtap={mockChildClick}>
            <text>Disabled Clickable Element</text>
          </view>
        </Button>
      );
      
      const disabledElement = container.querySelector('view[class*="inline-flex"]');
      fireEvent.click(disabledElement!);
      
      // In Lynx, disabled elements should not trigger events
      expect(mockChildClick).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases with asChild', () => {
    it('should handle empty child elements', () => {
      const { container } = render(
        <Button asChild>
          <view className="empty-element" bindtap={() => {}} />
        </Button>
      );
      
      const emptyElement = container.querySelector('view[class*="inline-flex"]');
      expect(emptyElement).toBeInTheDocument();
      expect(emptyElement).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    it('should handle child elements without bindtap', () => {
      const { container } = render(
        <Button asChild>
          <view className="no-tap-element">
            <text>No Tap Element</text>
          </view>
        </Button>
      );
      
      const noTapElement = container.querySelector('view[class*="inline-flex"]');
      expect(noTapElement).toBeInTheDocument();
      expect(noTapElement).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });

    it('should handle child elements with conflicting classes', () => {
      const { container } = render(
        <Button asChild className="button-class">
          <view className="child-class conflicting-class" bindtap={() => {}}>
            <text>Conflicting Classes</text>
          </view>
        </Button>
      );
      
      const wrapperElement = container.querySelector('view[class*="inline-flex"]');
      expect(wrapperElement).toHaveClass('button-class');
    });

    it('should handle multiple asChild buttons', () => {
      const { container } = render(
        <view>
          <Button asChild>
            <view className="first-aschild" bindtap={() => {}}>
              <text>First</text>
            </view>
          </Button>
          <Button asChild>
            <view className="second-aschild" bindtap={() => {}}>
              <text>Second</text>
            </view>
          </Button>
        </view>
      );
      
      const firstElement = container.querySelector('view[class*="inline-flex"]');
      const secondElement = container.querySelectorAll('view[class*="inline-flex"]')[1];
      
      expect(firstElement).toBeInTheDocument();
      expect(secondElement).toBeInTheDocument();
      expect(firstElement).toHaveClass('inline-flex', 'items-center', 'justify-center');
      expect(secondElement).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });
  });

  describe('Performance with asChild', () => {
    it('should handle many asChild buttons efficiently', () => {
      const buttons = Array.from({ length: 100 }, (_, i) => (
        <Button key={i} asChild>
          <view className={`button-${i}`} bindtap={() => {}}>
            <text>Button {i}</text>
          </view>
        </Button>
      ));
      
      const { container } = render(<view>{buttons}</view>);
      
      const buttonElements = container.querySelectorAll('view[class*="inline-flex"]');
      expect(buttonElements).toHaveLength(100);
      
      buttonElements.forEach(element => {
        expect(element).toHaveClass('inline-flex', 'items-center', 'justify-center');
      });
    });
  });
});
