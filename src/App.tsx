import React, { useEffect } from 'react';

import ReactTooltip from 'react-tooltip';

import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Wrapper from './components/Wrapper';

import Downloads from './containers/Downloads';
import Explore from './containers/explore/Explore';
import ExploreBlocks from './containers/explore/ExploreBlocks';
import Index from './containers/Index';
import Validator from './containers/Validator';

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
					<Route
						exact={true}
						path="/validator/:id"
						component={Validator}
					/>
					<Route exact={true} path="/" component={Index} />
					<Route exact={true} path="/explore" component={Explore} />
					<Route
						exact={true}
						path="/explore/blocks"
						component={ExploreBlocks}
					/>
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
