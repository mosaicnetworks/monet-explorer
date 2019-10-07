import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { IBabblePeer } from 'evm-lite-consensus';
import { Monet } from 'evm-lite-core';

import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import Peer from '../components/Peer';

import { config } from '../monet';

const STable = styled(Table)`
	td {
		font-family: 'Fira Code', monospace;
		font-size: 14px;
	}

	tr {
		transition: background 0.2s ease-in;
	}

	tbody tr:nth-of-type(odd) {
		background-color: rgba(0, 0, 0, 0.02);
	}

	tbody tr:nth-of-type(odd):hover {
		background: rgba(226, 110, 64, 0.1) !important;
	}

	tbody tr:hover {
		cursor: pointer;
		background: rgba(226, 110, 64, 0.1) !important;
	}
`;

type Props = {
	onPeersChangeHook: (peers: IBabblePeer[]) => any;
};

const Peers: React.FC<Props> = props => {
	const n = new Monet(config.host, config.port);

	const [peers, setPeers] = useState<IBabblePeer[]>([]);

	const fetchPeers = async () => {
		try {
			const p = await n.consensus!.getPeers();
			setPeers(p);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchPeers();
	}, []);

	useEffect(() => {
		props.onPeersChangeHook(peers);
	}, [peers]);

	// Polling
	let poller: any;

	useEffect(() => {
		poller = setInterval(() => {
			fetchPeers().then(() => console.log('(60s) Fetching Peers...'));
		}, 60000);

		return () => clearInterval(poller);
	});

	// Selec Peer
	const [selectedPeer, setSelectedPeer] = useState<IBabblePeer>(
		{} as IBabblePeer
	);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const onBlockClickBind = (peer: IBabblePeer) => (e: any) => {
		setSelectedPeer(peer);
		handleShow();
	};

	return (
		<>
			{Object.keys(selectedPeer).length > 0 && (
				<Modal
					size={'lg'}
					centered={true}
					show={show}
					onHide={handleClose}
				>
					<Modal.Header closeButton={true}>
						<Modal.Title>{selectedPeer.Moniker}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Peer peer={selectedPeer} />
					</Modal.Body>
				</Modal>
			)}
			<STable
				id="blocksTable"
				bordered={false}
				responsive={true}
				striped={true}
				cellPadding={'1px'}
			>
				<thead>
					<tr>
						<th>Moniker</th>
						<th>Host</th>
						<th className="d-none d-lg-table-cell">Public Key</th>
					</tr>
				</thead>
				<tbody>
					{peers.map(peer => (
						<tr onClick={onBlockClickBind(peer)} key={peer.Moniker}>
							<td>{peer.Moniker}</td>
							<td>{peer.NetAddr.split(':')[0]}</td>
							<td className="d-none d-lg-table-cell">
								{peer.PubKeyHex}
							</td>
						</tr>
					))}
				</tbody>
			</STable>
		</>
	);
};

export default Peers;
