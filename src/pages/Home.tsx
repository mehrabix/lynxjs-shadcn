import { useState } from '@lynx-js/react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/index.js';

export function Home() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  return (
    <view
      className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}
    >
      <scroll-view
        className="flex flex-col items-center justify-start p-6 gap-8 h-screen"
        scroll-y={true}
      >
        {/* Header */}
        <view className="flex flex-row items-center gap-4 mb-4">
          <text
            className={`text-3xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            Lynx UI Components
          </text>
          <Button
            variant="outline"
            size="sm"
            onPress={() => setDarkMode(!darkMode)}
          >
            <text>{darkMode ? '☀️' : '🌙'}</text>
          </Button>
        </view>

        {/* Welcome Section */}
        <view className="flex flex-col gap-6 items-center w-full max-w-md">
          <text
            className={`text-2xl font-bold text-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            Welcome to Lynx UI
          </text>
          <text
            className={`text-lg text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            A shadcn/ui-inspired component library built specifically for Lynx
            React applications
          </text>
        </view>

        {/* Counter Demo */}
        <view className="flex flex-col gap-4 items-center w-full max-w-md">
          <text
            className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            Interactive Counter
          </text>
          <text
            className={`text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            Count: {count}
          </text>

          {/* Quick Actions */}
          <view className="flex flex-row gap-2">
            <Button
              size="sm"
              variant="outline"
              onPress={() => setCount(count - 10)}
            >
              <text>-10</text>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onPress={() => setCount(count - 1)}
            >
              <text>-1</text>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onPress={() => setCount(count + 1)}
            >
              <text>+1</text>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onPress={() => setCount(count + 10)}
            >
              <text>+10</text>
            </Button>
          </view>
        </view>

        {/* Navigation Section */}
        <view className="flex flex-col gap-4 w-full max-w-md">
          <text
            className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            Explore Components
          </text>

          <view className="flex flex-col gap-3">
            <Button
              variant="default"
              size="lg"
              onPress={() => navigate('/button-examples')}
              className="w-full"
            >
              <text>View Button Examples</text>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onPress={() => setCount(count + 1)}
              className="w-full"
            >
              <text>More Components Coming Soon</text>
            </Button>
          </view>
        </view>

        {/* Features Section */}
        <view className="flex flex-col gap-4 w-full max-w-md">
          <text
            className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}
          >
            Features
          </text>

          <view className="flex flex-col gap-3">
            <view className="flex flex-row items-center gap-3">
              <text className="text-lg">🎨</text>
              <text
                className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Latest shadcn/ui Design System
              </text>
            </view>
            <view className="flex flex-row items-center gap-3">
              <text className="text-lg">📱</text>
              <text
                className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Lynx Native Components
              </text>
            </view>
            <view className="flex flex-row items-center gap-3">
              <text className="text-lg">🎯</text>
              <text
                className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                TypeScript Support
              </text>
            </view>
            <view className="flex flex-row items-center gap-3">
              <text className="text-lg">🌙</text>
              <text
                className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Dark Mode Ready
              </text>
            </view>
            <view className="flex flex-row items-center gap-3">
              <text className="text-lg">⚡</text>
              <text
                className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Tailwind CSS
              </text>
            </view>
          </view>
        </view>

        {/* Footer */}
        <view className="flex flex-col gap-2 items-center mt-8">
          <text
            className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
          >
            Lynx UI Components Demo
          </text>
          <text
            className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}
          >
            Built with Lynx React + Tailwind CSS
          </text>
        </view>
      </scroll-view>
    </view>
  );
}
