import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './app/App';

import stores from './store';

import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const s = stores();

const resetPersistor = () => {
	s.persistor.flush();
	s.persistor.purge();
};

const app = (
	<Provider store={s.store}>
		<PersistGate
			loading={null}
			persistor={s.persistor}
			onBeforeLift={resetPersistor}
		>
			<App />
		</PersistGate>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
