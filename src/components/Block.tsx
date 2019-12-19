import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import Transactions from './Transactions';

import Signature from './Signature';

import Await from './utils/Await';
import Loader from './utils/Loader';

import Body from '../ui/content/Body';
import Content from '../ui/content/Content';
import Heading from '../ui/content/Heading';

import { selectNetwork } from '../selectors';

import CoreAPI, { Block as TBlock } from '../client';

type Props = {
	blockIndex: number;
};

const Block: React.FC<Props> = props => {
	const c = new CoreAPI();

	const network = useSelector(selectNetwork);

	const [loading, setLoading] = useState(false);
	const [block, setBlock] = useState({} as TBlock);
	const [error, setError] = useState('');

	const fetchBlock = async () => {
		setLoading(true);

		try {
			const b = await c.fetchBlock(
				props.blockIndex,
				network!.name.toLowerCase()
			);

			// @ts-ignore
			if (b.error) {
				// @ts-ignore
				setError(b.error);
			} else {
				setBlock(b);
			}
		} catch (e) {
			setError('Error: ' + e.toString());
		}

		setLoading(false);
	};

	useEffect(() => {
		if (network) {
			fetchBlock();
		}
	}, [network, props.blockIndex]);

	const fallback = (
		<>
			<Loader loading={loading} /> <b>Loading block...</b>
		</>
	);

	return (
		<>
			{error && <div className="red">{error}</div>}
			{!error && (
				<Await loading={loading} fallback={fallback}>
					<>
						<h3 className="mb-4">
							Blocks #{props.blockIndex} @ {block.round_received}
						</h3>
						<Content>
							<Body>
								<b>
									State Hash:{' '}
									<span className="mono">
										{block.state_hash}
									</span>
								</b>
								<hr className="light smaller" />
								<b>
									Frame Hash:{' '}
									<span className="mono">
										{block.frame_hash}
									</span>
								</b>
								<hr className="light smaller" />
								<b>
									Peers Hash:{' '}
									<span className="mono">
										{block.peers_hash}
									</span>
								</b>
							</Body>
						</Content>
						<Content>
							<Heading>Transactions</Heading>
							<Transactions transactions={block.transactions} />
						</Content>
						<Content>
							<Heading>Internal Transactions</Heading>
							<Body>
								{block.internal_transactions &&
									block.internal_transactions.length ===
										0 && (
										<div>No internal transactions.</div>
									)}
								{block.internal_transactions &&
									block.internal_transactions.map(b => (
										<pre key={b.data}>
											<code>
												{JSON.stringify(b, null, 4)}
											</code>
										</pre>
									))}
							</Body>
						</Content>
						<div>
							<Heading>Signatures</Heading>
							<br />
							{block.signatures &&
								block.signatures.map(s => (
									<Signature
										signature={s.signature}
										validator={s.validator}
										key={s.signature}
									/>
								))}
						</div>
					</>
				</Await>
			)}
		</>
	);
};

export default Block;
