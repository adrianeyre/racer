import '@testing-library/jest-dom/vitest';

// jsdom implements neither of these, and both are read during a render:
// `matchMedia` by the media queries in the stylesheets, `getBoundingClientRect`
// by the container sizing in `Racer`. The rect is left at jsdom's all-zero
// default on purpose — a fixed size would make the snapshots depend on a number
// invented here rather than on the component.
window.matchMedia =
	window.matchMedia ||
	((query: string) =>
		({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		}) as MediaQueryList);
