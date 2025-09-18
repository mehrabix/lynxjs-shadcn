import '@testing-library/jest-dom';
import { LynxTestingEnv } from '@lynx-js/testing-environment';

// Initialize Lynx Testing Environment
const lynxTestingEnv = new LynxTestingEnv();

// Make it globally available for tests
globalThis.lynxTestingEnv = lynxTestingEnv;

// Switch to main thread for component testing
lynxTestingEnv.switchToMainThread();
