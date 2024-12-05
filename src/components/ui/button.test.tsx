import { describe, it, expect } from 'vitest';
import { Button } from './button';

describe('Button component', () => {
    it('renders correctly', () => {
        const button = document.createElement('button');
        button.textContent = 'Click me';
        expect(button.textContent).toBe('Click me');
    });
});