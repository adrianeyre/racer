import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@classes': fileURLToPath(new URL('./src/classes', import.meta.url)),
			'@components': fileURLToPath(new URL('./src/components', import.meta.url)),
			'@services': fileURLToPath(new URL('./src/services', import.meta.url)),
		},
	},
	test: {
		// The components under test read the DOM (`getBoundingClientRect`, key
		// events on `window`), so the suite needs a document even though the game
		// classes themselves are pure.
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/test-setup.ts'],
		include: ['src/**/*.test.{ts,tsx}'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'lcov'],
			include: ['src/classes/**/*.ts', 'src/components/**/*.tsx', 'src/services/**/*.ts'],
		},
	},
});
