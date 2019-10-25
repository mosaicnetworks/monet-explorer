import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Wrapper from './components/Wrapper';

import Block from './containers/Block';
import Blocks from './containers/Blocks';
import Dashboard from './containers/Dashboard';
import Faucet from './containers/Faucet';
import Hashgraph from './containers/Hashgraph';
import History from './containers/History';
import Search from './containers/Search';
import Transactions from './containers/Transactions';
import Validator from './containers/Validator';

import { fetchNetworks } from './modules/dashboard';

const App: React.FC = () => {
	const dispatch = useDispatch();
	const listNetworks = () => dispatch(fetchNetworks());

	useEffect(() => {
		listNetworks();
	}, []);

	return (
		<BrowserRouter>
			<Wrapper>
				<Route exact={true} path="/" component={Dashboard} />
				<Route exact={true} path="/blocks" component={Blocks} />
				<Route exact={true} path="/block/:id" component={Block} />
				<Route exact={true} path="/hashgraph" component={Hashgraph} />
				<Route exact={true} path="/history" component={History} />
				<Route
					exact={true}
					path="/transactions"
					component={Transactions}
				/>
				<Route exact={true} path="/faucet" component={Faucet} />
				<Route
					exact={true}
					path="/validator/:id"
					component={Validator}
				/>
				<Route exact={true} path="/search/:data" component={Search} />
			</Wrapper>
		</BrowserRouter>
	);
};

export default App;
