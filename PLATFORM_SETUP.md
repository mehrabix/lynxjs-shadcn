# Lynx Platform Development Setup

This guide explains how to set up and run your Lynx application in development mode. Lynx is a React-based framework that builds web applications optimized for mobile devices, which can be deployed to various platforms.

## Prerequisites

### For Web Development (Primary Platform)
- Modern web browser recommended
- Node.js 18+ installed
- pnpm package manager

### For Mobile Testing
1. **Android Testing**
   - Install Android Studio for testing in Android emulator
   - Or use Chrome DevTools mobile simulation
   - Or test on physical Android device via browser

2. **iOS Testing**
   - Use Safari on macOS for iOS simulation
   - Or test on physical iOS device via Safari
   - Or use Chrome DevTools mobile simulation

### For Development Environment
- Code editor (VS Code recommended)
- Git for version control
- Modern terminal/command prompt

## Available Commands

### Development Commands
```bash
# Start development server (default)
pnpm dev
pnpm start

# Platform-specific development (all build to web)
pnpm android          # Android development mode (web build)
pnpm ios              # iOS development mode (web build)
pnpm web              # Web development mode

# Watch mode for specific platforms
pnpm dev:android      # Android with watch mode
pnpm dev:ios          # iOS with watch mode
pnpm dev:web          # Web with watch mode
```

### Build Commands
```bash
# Build for production (default)
pnpm build

# Platform-specific builds (all build to web)
pnpm build:android    # Build for Android (web build)
pnpm build:ios        # Build for iOS (web build)
pnpm build:web        # Build for web

# Build all platforms
pnpm build:all        # Build for all platforms (web build)
```

### Clean Commands
```bash
# Clean build artifacts
pnpm clean            # Clean dist and cache
pnpm clean:android    # Clean Android build files
pnpm clean:ios        # Clean iOS build files
pnpm clean:all        # Clean everything
```

### Testing Commands
```bash
# Run tests
pnpm test             # Run tests in watch mode
pnpm test:run         # Run tests once
pnpm test:ui          # Run tests with UI
```

### Code Quality Commands
```bash
# Linting and formatting
pnpm lint             # Check code formatting
pnpm lint:fix          # Fix code formatting
pnpm format           # Format code (alias for lint:fix)
pnpm type-check       # Check TypeScript types
```

## Running on Android Emulator

1. **Start Android Emulator**
   ```bash
   # From Android Studio AVD Manager, or command line:
   emulator -avd <your_avd_name>
   ```

2. **Start Development Server**
   ```bash
   pnpm android
   # or
   pnpm dev:android
   ```

3. **Open in Browser**
   - Open Chrome/Edge on the emulator
   - Navigate to the development server URL
   - Or use Chrome DevTools mobile simulation

4. **Build for Production**
   ```bash
   pnpm build:android
   ```

## Running on iOS Simulator (macOS only)

1. **Start iOS Simulator**
   ```bash
   # From Xcode, or command line:
   open -a Simulator
   ```

2. **Start Development Server**
   ```bash
   pnpm ios
   # or
   pnpm dev:ios
   ```

3. **Open in Safari**
   - Open Safari on the simulator
   - Navigate to the development server URL
   - Or use Safari Web Inspector for debugging

4. **Build for Production**
   ```bash
   pnpm build:ios
   ```

## Running on Web

1. **Start Web Development Server**
   ```bash
   pnpm web
   # or
   pnpm dev:web
   ```

2. **Open in Browser**
   - Navigate to `http://localhost:3000` (or the displayed URL)
   - Use Chrome DevTools for mobile simulation

3. **Build for Production**
   ```bash
   pnpm build:web
   ```

## Environment Configuration

You can create environment-specific configuration files:

- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.web` - Web-specific settings

Example `.env.web`:
```bash
PLATFORM=web
API_URL=https://api.example.com
DEBUG=true
```

## Mobile Testing Strategies

### Chrome DevTools Mobile Simulation
1. Open Chrome DevTools (F12)
2. Click the device toggle button
3. Select a mobile device from the dropdown
4. Test your Lynx application

### Physical Device Testing
1. **Android**
   - Enable USB debugging
   - Connect device to computer
   - Open Chrome on device
   - Navigate to development server IP

2. **iOS**
   - Connect device to computer
   - Open Safari on device
   - Navigate to development server IP
   - Use Safari Web Inspector for debugging

### Progressive Web App (PWA) Features
Lynx applications can be enhanced with PWA features:
- Add to home screen
- Offline functionality
- Push notifications
- App-like experience

## Troubleshooting

### Common Issues
- **Port conflicts**: Change port in rspeedy config if needed
- **Cache issues**: Run `pnpm clean` to clear build cache
- **Dependency issues**: Run `pnpm install` to reinstall dependencies
- **Build errors**: Check TypeScript types with `pnpm type-check`

### Mobile-Specific Issues
- **Touch events**: Ensure proper touch event handling
- **Viewport**: Check viewport meta tag in HTML
- **Performance**: Optimize for mobile performance
- **Network**: Handle slow network conditions

## Platform-Specific Notes

### Web (Primary Platform)
- Modern browsers supported
- ES6+ features available
- Responsive design recommended
- PWA capabilities available

### Mobile Web
- Touch-optimized interface
- Mobile-first design approach
- Performance optimization
- Offline capabilities

## Additional Resources

- [Lynx Documentation](https://lynxjs.org)
- [Chrome DevTools Mobile](https://developers.google.com/web/tools/chrome-devtools/device-mode)
- [Progressive Web Apps](https://web.dev/progressive-web-apps/)
- [Mobile Web Performance](https://web.dev/fast/)