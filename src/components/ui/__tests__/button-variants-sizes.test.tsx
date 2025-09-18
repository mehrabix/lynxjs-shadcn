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

describe('Button Variants and Sizes Integration', () => {
  beforeEach(() => {
    globalThis.lynxTestingEnv?.switchToMainThread();
  });

  describe('Variant and Size Combinations', () => {
    const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
    const sizes = ['sm', 'default', 'lg', 'icon'] as const;

    variants.forEach(variant => {
      sizes.forEach(size => {
        it(`should render ${variant} variant with ${size} size correctly`, () => {
          const { container } = render(
            <Button variant={variant} size={size}>
              <text>{variant} {size}</text>
            </Button>
          );
          
          const button = container.querySelector('view');
          expect(button).toBeInTheDocument();
          
          // Verify both variant and size classes are applied
          expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
          
          // Check variant-specific classes
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
              break;
          }
          
          // Check size-specific classes
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
  });

  describe('Icon Size Special Cases', () => {
    it('should handle icon size with different variants', () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost'] as const;
      
      variants.forEach(variant => {
        const { container } = render(
          <Button variant={variant} size="icon">
            <text>★</text>
          </Button>
        );
        
        const button = container.querySelector('view');
        expect(button).toHaveClass('h-10', 'w-10');
        
        // Icon buttons should not have horizontal padding
        expect(button).not.toHaveClass('px-3', 'px-4', 'px-8');
      });
    });

    it('should handle icon size with link variant', () => {
      const { container } = render(
        <Button variant="link" size="icon">
          <text>🔗</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toHaveClass('h-10', 'w-10');
      expect(button).not.toHaveClass('underline');
    });
  });

  describe('Text Content Variations', () => {
    it('should handle different text content lengths', () => {
      const textContents = [
        'A',
        'Short',
        'Medium Length Text',
        'This is a very long button text that might wrap or get truncated',
        '🚀 Emoji Text 🎉',
        'Mixed 123 Numbers & Symbols!@#'
      ];
      
      textContents.forEach(text => {
        const { container } = render(
          <Button>
            <text>{text}</text>
          </Button>
        );
        
        const textElement = container.querySelector('text');
        expect(textElement).toHaveTextContent(text);
      });
    });

    it('should handle empty text content', () => {
      const { container } = render(
        <Button>
          <text></text>
        </Button>
      );
      
      const textElement = container.querySelector('text');
      expect(textElement).toBeInTheDocument();
      expect(textElement).toHaveTextContent('');
    });
  });

  describe('Responsive Behavior', () => {
    it('should maintain button structure across different content', () => {
      const testCases = [
        { variant: 'default' as const, size: 'sm' as const, content: 'Small' },
        { variant: 'outline' as const, size: 'lg' as const, content: 'Large Outline Button' },
        { variant: 'destructive' as const, size: 'icon' as const, content: '⚠️' },
        { variant: 'ghost' as const, size: 'default' as const, content: 'Ghost Button' },
      ];
      
      testCases.forEach(({ variant, size, content }) => {
        const { container } = render(
          <Button variant={variant} size={size}>
            <text>{content}</text>
          </Button>
        );
        
        const button = container.querySelector('view');
        const textElement = container.querySelector('text');
        
        expect(button).toBeInTheDocument();
        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveTextContent(content);
        expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
      });
    });
  });

  describe('Edge Case Combinations', () => {
    it('should handle disabled state with all variant-size combinations', () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const;
      const sizes = ['sm', 'default', 'lg', 'icon'] as const;
      
      variants.forEach(variant => {
        sizes.forEach(size => {
          const { container } = render(
            <Button variant={variant} size={size} disabled={true}>
              <text>Disabled {variant} {size}</text>
            </Button>
          );
          
          const button = container.querySelector('view');
          expect(button).toHaveClass('pointer-events-none', 'opacity-50');
        });
      });
    });

    it('should handle custom className with all combinations', () => {
      const { container } = render(
        <Button 
          variant="outline" 
          size="lg" 
          className="custom-button-class"
        >
          <text>Custom Class Button</text>
        </Button>
      );
      
      const button = container.querySelector('view');
      expect(button).toHaveClass('custom-button-class');
      expect(button).toHaveClass('border', 'border-slate-200', 'h-11', 'px-8');
    });

    it('should handle asChild with different variant-size combinations', () => {
      const { container } = render(
        <Button asChild variant="secondary" size="sm">
          <view className="custom-child" bindtap={() => {}}>
            <text>Custom Child Button</text>
          </view>
        </Button>
      );
      
      const wrapperElement = container.querySelector('view[class*="inline-flex"]');
      expect(wrapperElement).toHaveClass('bg-slate-100', 'h-9', 'px-3');
      expect(wrapperElement).toHaveClass('inline-flex', 'items-center', 'justify-center');
    });
  });
});
