import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Racer from './components/racer/racer';

import './index.scss';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
if (!container) throw new Error('No #root element to mount the game into');

createRoot(container).render(
	<StrictMode>
		<Racer />
	</StrictMode>,
);

reportWebVitals();
