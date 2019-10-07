import React, { useEffect, useState } from 'react';

import { IBabblePeer } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';

import { MonetInfo } from '../monet';

type Props = {
	peer: IBabblePeer;
};

const Peer: React.FC<Props> = props => {
	const [info, setInfo] = useState<MonetInfo>({} as MonetInfo);
	const [error, setError] = useState('');

	const fetchInfo = async () => {
		const host = props.peer.NetAddr.split(':')[0];
		const monet = new Monet(host, 8080);

		try {
			const i = await monet.getInfo<MonetInfo>();

			setInfo(i);
		} catch (e) {
			setError(e.toString());
		}
	};

	useEffect(() => {
		fetchInfo();
	}, []);

	return (
		<>
			{error || (
				<pre>
					<code>{JSON.stringify(info, null, 2)}</code>
				</pre>
			)}
		</>
	);
};

export default Peer;
