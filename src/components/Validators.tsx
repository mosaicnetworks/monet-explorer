import React from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';

import Avatar from './Avatar';

import ValidatorHistory from './modals/ValidatorHistory';
import Await from './utils/Await';

import { selectValidators } from '../selectors';
import { capitalize, pubKeyToAddress } from '../utils';

import { Validator } from '../client';

import GREEN from '../assets/green-dot.png';
import RED from '../assets/red-dot.png';

const Green = styled.b`
	color: var(--green) !important;
	font-size: 14px !important;
	text-transform: uppercase;
	font-weight: 600;
	letter-spacing: 1px;
`;

const Orange = styled.b`
	color: var(--orange) !important;
	font-weight: bold !important;
`;

const SValidators = styled.div`
	.media {
		background: var(--light-grey);
		padding: 15px 20px;
		border: 1px solid #f1f1f1;
		margin-bottom: 10px;
		border-radius: var(--border-radius) !important;

		p {
			margin-bottom: 0 !important;
		}
	}

	.media-body {
		min-width: 150px;
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
	border: 1px solid var(--border-color);
	border-top: none;

	a {
		color: var(--orange);
	}
`;

const stateStyling = (state: string, extra: string = '') => {
	switch (state) {
		case 'Babbling':
			return (
				<div data-tip={'Undetermined Events'}>
					<Green>BABBLING</Green>
					<br />
					<p className="text-center small mono bold green">{extra}</p>
				</div>
			);

		case 'Suspended':
			return (
				<div data-tip={'Undetermined Events'}>
					<Orange>Suspended</Orange>
					<br />
					<p className="text-center small mono bold orange">
						{extra}
					</p>
				</div>
			);
		default:
			return state;
	}
};

type Props = {
	hideStatus?: boolean;
	validators?: Validator[];
};

const Validators: React.FC<Props> = props => {
	let validators = useSelector(selectValidators);

	if (props.validators) {
		validators = props.validators;
	}

	const rendervalidators = (reachable: boolean) => {
		const fallback = (
			<SGasPrice className="align-self-center mr-2">
				<b className="preheader red no-margin">Offline</b>
			</SGasPrice>
		);
		return validators
			.filter(v => v.reachable === reachable)
			.map(v => {
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
							<Avatar
								className="mr-1"
								address={address}
								size={40}
							/>
						</Link>
						<SStatus className="">
							{v.reachable ? (
								<Image
									className="mr-2"
									src={GREEN}
									width="12"
								/>
							) : (
								<Image src={RED} width="12" />
							)}
						</SStatus>
						<Media.Body>
							<b> {capitalize(v.moniker || '-')}</b>
							<p className="small mono">{v.host}</p>
						</Media.Body>
						{v && v.info && (
							<Await loading={!v.reachable} fallback={fallback}>
								<div className="d-none d-xl-block align-self-center mr-5">
									{stateStyling(
										v.info.state,
										(v.info.undetermined_events &&
											v.info.undetermined_events.toString()) ||
											''
									)}
								</div>
								<div className="d-none d-xl-block align-self-center mr-5">
									<b>{v.info.last_block_index}</b>
									<div className="small">Block Index</div>
								</div>
								<div className="d-none d-xl-block align-self-center mr-5">
									<b>{vList[0]}</b>
									<div className="small">
										{vList[1] || 'Version'}
									</div>
								</div>
								<SGasPrice className="align-self-center mr-2">
									<h4>{v.info.min_gas_price}</h4>
									<div className="d-sm-none d-xs-block small">
										Gas Price
									</div>
								</SGasPrice>
							</Await>
						)}
					</Media>
				);
			});
	};

	return (
		<>
			<SValidators>
				{rendervalidators(true)}
				{rendervalidators(false)}
			</SValidators>
			{!props.validators && (
				<SBottom>
					<ValidatorHistory />
				</SBottom>
			)}
		</>
	);
};

export default Validators;
