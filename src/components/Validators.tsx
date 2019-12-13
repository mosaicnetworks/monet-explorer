import React from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Image from 'react-bootstrap/Image';

import Avatar from './Avatar';
import Media from 'react-bootstrap/Media';
import Table from './Table';

import { selectValidators } from '../selectors';
import { pubKeyToAddress } from '../utils';

import GREEN from '../assets/green-dot.png';
import RED from '../assets/red-dot.png';

const Green = styled.div`
	color: var(--green) !important;
	font-size: 14px !important;
	text-transform: uppercase;
	font-weight: 600;
	letter-spacing: 1px;
`;

const Orange = styled.div`
	color: var(--orange) !important;
	font-weight: bold !important;
`;

const SValidators = styled.div`
	.media {
		background: #fff;
		padding: 15px 20px;
		border: 1px solid #eee;
		margin-bottom: 5px;

		p {
			margin-bottom: 0 !important;
		}
	}

	.media-body {
		min-width: 200px;
	}
`;

const SGasPrice = styled.div`
	min-width: 50px;
	text-align: center;
	color: var(--orange);
`;

const SStatus = styled.div`
	position: relative !important;
	top: -13px !important;
	left: -10px;
`;

const stateStyling = (state: string) => {
	switch (state) {
		case 'Babbling':
			return <Green>Babbling</Green>;
		case 'Suspended':
			return <Orange>Suspended</Orange>;
		default:
			return state;
	}
};

type Props = {
	hideStatus?: boolean;
};

const Validators: React.FC<Props> = props => {
	const validators = useSelector(selectValidators);

	const rendervalidators = () => {
		return validators.map(v => {
			const address = pubKeyToAddress(v.public_key);

			return (
				<Media key={v.public_key}>
					<Link
						data-tip={`${v.moniker} - ${
							v.reachable ? 'Online' : 'False'
						}`}
						to={`/validator/${v.public_key}`}
					>
						<Avatar className="mr-1" address={address} size={40} />
					</Link>
					<SStatus className="">
						{v.reachable ? (
							<Image className="mr-2" src={GREEN} width="12" />
						) : (
							<Image src={RED} width="12" />
						)}
					</SStatus>
					<Media.Body>
						<b> {v.moniker}</b>
						<p className="small mono">{v.host}</p>
					</Media.Body>
					<div className="d-none d-md-block align-self-center mr-5">
						<b>{stateStyling(v.info.state)}</b>
					</div>
					<div className="d-none d-md-block align-self-center mr-5">
						<b>{v.info.last_block_index}</b>
						<div className="small">Block Index</div>
					</div>
					<div className="d-none d-md-block align-self-center mr-5">
						<b>{v.version.monetd}</b>
						<div className="small">Version</div>
					</div>
					<SGasPrice className="align-self-center mr-2">
						<h4>{v.info.min_gas_price}</h4>
						<div className="d-sm-none d-xs-block small">
							Gas Price
						</div>
					</SGasPrice>
				</Media>
				// <tr key={v.moniker}>
				// 	<td>
				// 		<Link
				// 			data-tip={`${v.moniker} - ${
				// 				v.reachable ? 'Online' : 'False'
				// 			}`}
				// 			to={`/validator/${v.public_key}`}
				// 		>
				// 			<Avatar address={address} size={38} />
				// 		</Link>
				// 	</td>
				// 	{!props.hideStatus && (
				// 		<td>
				// 			{v.reachable ? (
				// 				<Image src={GREEN} width="12" />
				// 			) : (
				// 				<Image src={RED} width="12" />
				// 			)}
				// 		</td>
				// 	)}

				// 	<td>
				// 		<b>{v.moniker}</b>
				// 		<a
				// 			data-tip={`http://${v.host}:8080/info`}
				// 			target="_blank"
				// 			href={`http://${v.host}:8080/info`}
				// 		>
				// 			<small className="mono d-block">{v.host}</small>
				// 		</a>
				// 	</td>
				// 	<td>{stateStyling(v.info.state)}</td>
				// 	<td className="mono">{v.info.last_block_index}</td>
				// 	<td className="mono">{v.info.last_consensus_round}</td>
				// 	<td className="mono">{v.info.min_gas_price}</td>
				// 	<td className="mono">
				// 		{v.version.monetd && 'v'}
				// 		{v.version.monetd}
				// 	</td>
				// </tr>
			);
		});
	};

	return <SValidators>{rendervalidators()}</SValidators>;
};

export default Validators;
