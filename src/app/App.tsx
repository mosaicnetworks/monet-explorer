import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Wrapper from '../components/Wrapper';

// import Block from '../containers/Block';
// import Blocks from '../containers/Blocks';
// import Config from '../containers/Config';
import Blocks from '../containers/Blocks';
import Network from '../containers/Network';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Wrapper>
				<Route exact={true} path="/" component={Network} />
				<Route exact={true} path="/blocks" component={Blocks} />
				{/* <Route exact={true} path="/blocks" component={Blocks} /> */}
				{/* <Route exact={true} path="/blocks/:block" component={Block} /> */}
				{/* <Route exact={true} path="/config" component={Config} /> */}
			</Wrapper>
		</BrowserRouter>
	);
};

export default App;
