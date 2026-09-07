import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Relative asset URLs rather than root-absolute ones, because the built site is
 * served from a GitHub Pages project path (`/racer/`) and not from a domain
 * root. The level data is fetched with relative URLs too (`./levels/...`), so
 * the same base keeps the app and its data on the same footing.
 */
export default defineConfig({
	base: './',
	plugins: [react()],
	publicDir: 'public',
	resolve: {
		alias: {
			'@classes': fileURLToPath(new URL('./src/classes', import.meta.url)),
			'@components': fileURLToPath(new URL('./src/components', import.meta.url)),
			'@services': fileURLToPath(new URL('./src/services', import.meta.url)),
		},
	},
	server: {
		host: true,
		port: 5173,
		open: false,
	},
	preview: {
		host: true,
		port: 4173,
	},
	build: {
		// `dist-web` rather than `dist`, so the release workflow uploads the site
		// from a path that says what it holds.
		outDir: 'dist-web',
		emptyOutDir: true,
		sourcemap: true,
		target: 'es2022',
	},
});
