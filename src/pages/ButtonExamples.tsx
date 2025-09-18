import { useState } from '@lynx-js/react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/index.js';

export function ButtonExamples() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'>('default');
  const [selectedSize, setSelectedSize] = useState<'default' | 'sm' | 'lg' | 'icon'>('default');
  const navigate = useNavigate();

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const variants: Array<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'> = [
    'default', 'secondary', 'outline', 'destructive', 'ghost', 'link'
  ];

  const sizes: Array<'default' | 'sm' | 'lg' | 'icon'> = ['sm', 'default', 'lg', 'icon'];

  return (
    <view className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <scroll-view className="flex flex-col items-center justify-start p-6 gap-8 h-screen" scroll-y={true}>
        {/* Header */}
        <view className="flex flex-row items-center gap-4 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onPress={() => navigate('/')}
          >
            <text>← Back</text>
          </Button>
          <text className={`text-3xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Button Examples
          </text>
          <Button 
            variant="outline" 
            size="sm" 
            onPress={() => setDarkMode(!darkMode)}
          >
            <text>{darkMode ? '☀️' : '🌙'}</text>
          </Button>
        </view>
        
        {/* Counter Display */}
        <view className="flex flex-col gap-4 items-center w-full max-w-md">
          <text className={`text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Counter: {count}
          </text>
          
          {/* Quick Actions */}
          <view className="flex flex-row gap-2">
            <Button size="sm" variant="outline" onPress={() => setCount(count - 10)}>
              <text>-10</text>
            </Button>
            <Button size="sm" variant="outline" onPress={() => setCount(count - 1)}>
              <text>-1</text>
            </Button>
            <Button size="sm" variant="outline" onPress={() => setCount(count + 1)}>
              <text>+1</text>
            </Button>
            <Button size="sm" variant="outline" onPress={() => setCount(count + 10)}>
              <text>+10</text>
            </Button>
          </view>
        </view>
        
        {/* All Button Variants */}
        <view className="flex flex-col gap-4 w-full max-w-md">
          <text className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            All Button Variants
          </text>
          
          {variants.map((variant) => (
            <view key={variant} className="flex flex-col gap-2">
              <text className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)} Variant
              </text>
              <Button 
                variant={variant} 
                onPress={() => setCount(count + 1)}
                className={selectedVariant === variant ? 'ring-2 ring-blue-500' : ''}
              >
                <text>{variant.charAt(0).toUpperCase() + variant.slice(1)} Button</text>
              </Button>
            </view>
          ))}
        </view>

        {/* All Button Sizes */}
        <view className="flex flex-col gap-4 w-full max-w-md">
          <text className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            All Button Sizes
          </text>
          
          {sizes.map((size) => (
            <view key={size} className="flex flex-col gap-2">
              <text className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {size.charAt(0).toUpperCase() + size.slice(1)} Size
              </text>
              <Button 
                size={size} 
                variant="default"
                onPress={() => setCount(count + 1)}
                className={selectedSize === size ? 'ring-2 ring-blue-500' : ''}
              >
                <text>{size === 'icon' ? '★' : `${size.charAt(0).toUpperCase() + size.slice(1)} Button`}</text>
              </Button>
            </view>
          ))}
        </view>

        {/* Size + Variant Combinations */}
        <view className="flex flex-col gap-4 w-full max-w-md">
          <text className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Size + Variant Combinations
          </text>
          
          <view className="grid grid-cols-2 gap-3">
            <Button size="sm" variant="secondary" onPress={() => setCount(count + 1)}>
              <text>Small Secondary</text>
            </Button>
            <Button size="lg" variant="outline" onPress={() => setCount(count + 1)}>
              <text>Large Outline</text>
            </Button>
            <Button size="sm" variant="destructive" onPress={() => setCount(count + 1)}>
              <text>Small Destructive</text>
            </Button>
            <Button size="lg" variant="ghost" onPress={() => setCount(count + 1)}>
              <text>Large Ghost</text>
            </Button>
          </view>
        </view>

        {/* Interactive Examples */}
        <view className="flex flex-col gap-4 w-full max-w-md">
          <text className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Interactive Examples
          </text>
          
          {/* Loading State */}
          <view className="flex flex-col gap-2">
            <text className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Loading State
            </text>
            <Button 
              disabled={loading} 
              onPress={handleLoading}
              className={loading ? 'opacity-50' : ''}
            >
              <text>{loading ? 'Please wait...' : 'Start Loading'}</text>
            </Button>
          </view>

          {/* Disabled States */}
          <view className="flex flex-col gap-2">
            <text className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Disabled States
            </text>
            <view className="flex flex-row gap-2">
              <Button disabled={true} variant="default" onPress={() => setCount(count + 1)}>
                <text>Disabled Default</text>
              </Button>
              <Button disabled={true} variant="outline" onPress={() => setCount(count + 1)}>
                <text>Disabled Outline</text>
              </Button>
            </view>
          </view>

          {/* Custom Styling */}
          <view className="flex flex-col gap-2">
            <text className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Custom Styling
            </text>
            <Button 
              variant="outline" 
              className="border-2 border-dashed border-blue-500 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
              onPress={() => setCount(count + 1)}
            >
              <text>Custom Dashed Border</text>
            </Button>
          </view>
        </view>

        {/* asChild Examples */}
        <view className="flex flex-col gap-4 w-full max-w-md">
          <text className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            asChild Prop Examples
          </text>
          
          <view className="flex flex-col gap-3">
            <Button asChild>
              <view className="flex items-center gap-2" bindtap={() => setCount(count + 1)}>
                <text className="text-white dark:text-black">Custom Element</text>
              </view>
            </Button>
            
            <Button asChild variant="outline">
              <view className="flex items-center gap-2" bindtap={() => setCount(count + 5)}>
                <text className="text-black dark:text-white">Outline Custom</text>
              </view>
            </Button>
            
            <Button asChild variant="ghost">
              <view className="flex items-center gap-2" bindtap={() => setCount(count + 10)}>
                <text className="text-black dark:text-white">Ghost Custom</text>
              </view>
            </Button>
          </view>
        </view>

        {/* Complex Combinations */}
        <view className="flex flex-col gap-4 w-full max-w-md">
          <text className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            Complex Combinations
          </text>
          
          <view className="flex flex-col gap-3">
            <view className="flex flex-row gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                disabled={loading}
                className="flex-1"
                onPress={() => setCount(count + 1)}
              >
                <text>Small Outline</text>
              </Button>
              <Button 
                size="lg" 
                variant="destructive" 
                disabled={loading}
                className="flex-1"
                onPress={() => setCount(count - 1)}
              >
                <text>Large Destructive</text>
              </Button>
            </view>
            
            <Button 
              size="icon" 
              variant="ghost" 
              className="self-center"
              onPress={() => setCount(count + 1)}
            >
              <text>🎯</text>
            </Button>
          </view>
        </view>

        {/* Footer */}
        <view className="flex flex-col gap-2 items-center mt-8">
          <text className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Button Examples - Lynx UI Components
          </text>
          <text className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Based on shadcn/ui Button Component
          </text>
        </view>
      </scroll-view>
    </view>
  );
}
