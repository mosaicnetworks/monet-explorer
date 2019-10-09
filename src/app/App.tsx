import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Wrapper from '../components/Wrapper';

import Blocks from '../containers/Blocks';
import Network from '../containers/Network';
import Search from '../containers/Search';

const App: React.FC = () => {
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
