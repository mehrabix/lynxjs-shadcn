import React from 'react';
import { cn } from '../../lib/utils.js';

export interface ButtonProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  disabled = false,
  onPress,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-slate-300';

  const disabledClasses = disabled ? 'pointer-events-none opacity-50' : '';

  const variantClasses = {
    // Default - Dark background
    'bg-slate-900 hover:bg-slate-900/90 active:bg-slate-900/80 dark:bg-slate-50 dark:hover:bg-slate-50/90 dark:active:bg-slate-50/80':
      variant === 'default',
    // Destructive - Red background
    'bg-red-500 hover:bg-red-500/90 active:bg-red-500/80 dark:bg-red-900 dark:hover:bg-red-900/90 dark:active:bg-red-900/80':
      variant === 'destructive',
    // Outline - Border with background
    'border border-slate-200 bg-white hover:bg-slate-100 active:bg-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:active:bg-slate-700':
      variant === 'outline',
    // Secondary - Light gray background
    'bg-slate-100 hover:bg-slate-100/80 active:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-800/80 dark:active:bg-slate-700':
      variant === 'secondary',
    // Ghost - Transparent with hover background
    'hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700':
      variant === 'ghost',
    // Link - Transparent (underline applied to text element)
    '': variant === 'link',
  };

  const sizeClasses = {
    'h-10 px-4 py-2': size === 'default',
    'h-9 rounded-md px-3': size === 'sm',
    'h-11 rounded-md px-8': size === 'lg',
    'h-10 w-10': size === 'icon',
  };

  if (asChild) {
    // Apply button styling to the child element
    return (
      <view
        className={cn(
          baseClasses,
          disabledClasses,
          variantClasses,
          sizeClasses,
          className,
        )}
        {...props}
      >
        {children}
      </view>
    );
  }

  return (
    <view
      className={cn(
        baseClasses,
        disabledClasses,
        variantClasses,
        sizeClasses,
        className,
      )}
      bindtap={disabled ? () => {} : onPress}
      {...props}
    >
      <text
        className={cn(
          'text-center',
          // Text colors for each variant - using basic colors that work in Lynx
          variant === 'default' && 'text-white dark:text-black',
          variant === 'destructive' && 'text-white dark:text-white',
          variant === 'secondary' && 'text-black dark:text-white',
          variant === 'outline' && 'text-black dark:text-white',
          variant === 'ghost' && 'text-black dark:text-white',
          variant === 'link' && 'text-primary dark:text-primary underline',
        )}
      >
        {children}
      </text>
    </view>
  );
}
