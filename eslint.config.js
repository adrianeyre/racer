import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: ['dist/**', 'dist-web/**', 'coverage/**', 'node_modules/**', 'public/**'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],
			'prefer-const': 'error',
			eqeqeq: ['error', 'always'],
		},
	},
	{
		// Snapshots and fixtures make assertions about rendered output, not about
		// the game rules, so the fast-refresh boundary rule has nothing to say here.
		files: ['**/*.test.{ts,tsx}'],
		rules: {
			'react-refresh/only-export-components': 'off',
		},
	},
);
