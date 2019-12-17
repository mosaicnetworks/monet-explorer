import React from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';

import Avatar from './Avatar';

import { selectValidators } from '../selectors';
import { pubKeyToAddress, capitalize } from '../utils';

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
		background: var(--light-grey);
		padding: 15px 20px;
		border: 1px solid #eee;
		margin-bottom: 10px;
		border-radius: 3px !important;

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

const SBottom = styled.div`
	margin-top: -10px;
	background: #f8f8f8;
	padding: 8px 20px;
	font-size: 12px;
	letter-spacing: 1px;
	font-weight: 600;
	text-transform: uppercase;
	border: 1px solid #eee;
	border-top: none;

	a {
		color: var(--orange);
	}
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
			const vList = v.version.monetd.split('-');

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
						<b> {capitalize(v.moniker || '-')}</b>
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
						<b>{vList[0]}</b>
						<div className="small">{vList[1] || 'Version'}</div>
					</div>
					<SGasPrice className="align-self-center mr-2">
						<h4>{v.info.min_gas_price}</h4>
						<div className="d-sm-none d-xs-block small">
							Gas Price
						</div>
					</SGasPrice>
				</Media>
			);
		});
	};

	return (
		<>
			<SValidators>{rendervalidators()}</SValidators>
			<SBottom>
				<Link to={'/history'}>View History</Link>
			</SBottom>
		</>
	);
};

export default Validators;
