import type { Metric } from 'web-vitals';

type ReportHandler = (metric: Metric) => void;

/**
 * web-vitals 6 replaced the `getX` getters with `onX` listeners and dropped FID
 * outright — Interaction to Next Paint superseded it as a Core Web Vital — so
 * the set reported here is CLS, FCP, INP, LCP and TTFB.
 */
const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
	if (!onPerfEntry) return;

	void import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
		onCLS(onPerfEntry);
		onFCP(onPerfEntry);
		onINP(onPerfEntry);
		onLCP(onPerfEntry);
		onTTFB(onPerfEntry);
	});
};

export default reportWebVitals;
