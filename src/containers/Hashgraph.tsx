import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';

import { SContent } from '../components/styles';

import ExplorerAPIClient from '../client';

import _ from 'lodash';

const Hashgraph: React.FC<{}> = () => {
	const events: any[] = [];
	const c = new ExplorerAPIClient();
	const [hashgraph, setHashgraph] = useState<any>({});

	const fetchHashgraph = async () => {
		const hg: any = await c.getHashgraph();

		setHashgraph(hg);
	};

	useEffect(() => {
		// fetchHashgraph();
	}, []);

	return (
		<Container>
			<SContent>
				<span>
					Hashgraph
					<a className="float-right" onClick={fetchHashgraph}>
						Reload
					</a>
				</span>
				<pre>
					<p>
						<code>{JSON.stringify(hashgraph, null, 2)}</code>
					</p>
				</pre>
			</SContent>
		</Container>
	);
};

export default Hashgraph;
