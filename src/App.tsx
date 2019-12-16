import React, { useEffect } from 'react';

import ReactTooltip from 'react-tooltip';

import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Wrapper from './components/Wrapper';

import Index from './containers/Index';
import Downloads from './containers/Downloads';

import { fetchNetworks } from './modules/dashboard';

const App: React.FC = () => {
	const dispatch = useDispatch();
	const listNetworks = () => dispatch(fetchNetworks());

	useEffect(() => {
		listNetworks();
	}, []);

	return (
		<>
			<ReactTooltip type="dark" />
			<BrowserRouter>
				<Wrapper>
					<Route exact={true} path="/" component={Index} />
					<Route
						exact={true}
						path="/downloads"
						component={Downloads}
					/>
				</Wrapper>
			</BrowserRouter>
		</>
	);
};

export default App;
