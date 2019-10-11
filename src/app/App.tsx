import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Wrapper from '../components/Wrapper';

import Blocks from '../containers/Blocks';
import Network from '../containers/Network';
import Search from '../containers/Search';

import { fetchNetworks } from '../modules/dashboard';

const App: React.FC = () => {
	const dispatch = useDispatch();
	const listNetworks = () => dispatch(fetchNetworks());

	useEffect(() => {
		listNetworks();
	}, []);

	return (
		<BrowserRouter>
			<Wrapper>
				<Route exact={true} path="/" component={Network} />
				<Route exact={true} path="/blocks" component={Blocks} />
				<Route exact={true} path="/search/:data" component={Search} />
			</Wrapper>
		</BrowserRouter>
	);
};

export default App;
