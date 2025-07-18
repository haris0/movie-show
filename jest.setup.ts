import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder as never
global.TextDecoder = TextDecoder as never

// If using jsdom
Object.defineProperty(window, 'TextEncoder', {
  writable: true,
  value: TextEncoder,
})
Object.defineProperty(window, 'TextDecoder', {
  writable: true,
  value: TextDecoder,
})
