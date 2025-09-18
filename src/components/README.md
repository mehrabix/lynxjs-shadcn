# Lynx UI Components

A shadcn/ui-inspired component library built specifically for Lynx React applications, matching the latest [shadcn/ui button implementation](https://ui.shadcn.com/docs/components/button) exactly.

## Features

- 🎨 **Latest shadcn/ui Design System** - Exact API and styling patterns from shadcn/ui
- 📱 **Lynx Native Components** - Built with `<view>` and `<text>` for native mobile performance
- 🎯 **TypeScript Support** - Full type safety and IntelliSense
- 🌙 **Dark Mode Ready** - Built-in dark mode support with CSS variables
- ⚡ **Tailwind CSS** - Utility-first styling with Tailwind classes
- 🔄 **asChild Support** - Polymorphic component support like shadcn/ui

## Installation

This library is designed to work with Lynx React projects. Make sure you have the following dependencies:

```bash
pnpm add clsx tailwind-merge
```

## Components

### Button

A versatile button component with multiple variants, sizes, and advanced features - exactly matching [shadcn/ui button](https://ui.shadcn.com/docs/components/button).

```tsx
import { Button } from './components/ui';

// Basic usage
<Button onPress={() => console.log('Pressed')}>
  Click me
</Button>

// All Variants (matching shadcn/ui exactly)
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// All Sizes (matching shadcn/ui exactly)
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>

// asChild prop (matching shadcn/ui exactly)
<Button asChild>
  <view bindtap={() => console.log('Custom element')}>
    <text>Custom Element</text>
  </view>
</Button>

// Loading state
<Button disabled={loading}>
  <text>{loading ? 'Please wait...' : 'Submit'}</text>
</Button>
```

#### Button Props

| Prop        | Type                                                                          | Default     | Description                                   |
| ----------- | ----------------------------------------------------------------------------- | ----------- | --------------------------------------------- |
| `variant`   | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | The visual style variant of the button        |
| `size`      | `'default' \| 'sm' \| 'lg' \| 'icon'`                                         | `'default'` | The size of the button                        |
| `asChild`   | `boolean`                                                                     | `false`     | Render as a different component (polymorphic) |
| `className` | `string`                                                                      | -           | Additional CSS classes                        |
| `disabled`  | `boolean`                                                                     | `false`     | Whether the button is disabled                |
| `onPress`   | `() => void`                                                                  | -           | Function to call when button is pressed       |

## Exact shadcn/ui Compatibility

This implementation matches the latest shadcn/ui button component exactly:

- ✅ **Same CSS classes** - Uses identical Tailwind classes as shadcn/ui
- ✅ **Same variants** - All 6 variants (default, secondary, outline, destructive, ghost, link)
- ✅ **Same sizes** - All 4 sizes (default, sm, lg, icon)
- ✅ **asChild prop** - Polymorphic component support
- ✅ **Focus states** - Focus-visible ring and offset
- ✅ **Disabled states** - Pointer events and opacity
- ✅ **CSS variables** - Uses shadcn/ui color tokens

## Key Adaptations for Lynx

1. **Native Components**: Uses Lynx's `<view>` and `<text>` instead of HTML elements
2. **Touch Events**: Uses `bindtap` instead of `onClick`
3. **Mobile-First**: Designed specifically for mobile applications
4. **Lynx Compatibility**: Works seamlessly with Lynx React framework

## Examples

The demo app showcases all features from the [shadcn/ui documentation](https://ui.shadcn.com/docs/components/button):

- **Basic Variants**: All 6 button variants
- **Sizes**: All 4 button sizes including icon
- **Loading State**: Disabled state with loading text
- **asChild**: Polymorphic component example

## Contributing

This is a work in progress. More components will be added following the same patterns as shadcn/ui but adapted for Lynx.
