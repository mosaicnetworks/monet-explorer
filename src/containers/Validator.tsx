import React, { useEffect, useState } from 'react';

import changeCase from 'change-case';
import utils from 'evm-lite-utils';

import { JsonToTable } from 'react-json-to-table';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';

import Avatar from '../components/Avatar';

import { SContent } from '../components/styles';

import { selectValidator, validatorInfo } from '../selectors';
import { pubKeyToAddress } from '../utils';

import GreenDot from '../assets/green-dot.png';
import RedDot from '../assets/red-dot.png';

type ReactRouterProps = {
	id: string;
};

const Validator: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const validator = useSelector(
		selectValidator(Number(props.match.params.id))
	);

	const info = useSelector(validatorInfo(Number(props.match.params.id)));
	const address = pubKeyToAddress((validator && validator.public_key) || '');

	const [newInfo, setNewInfo] = useState<any>(undefined);

	useEffect(() => {
		if (info) {
			const ammendedInfo = {
				...info
			};

			delete ammendedInfo.validator;
			delete ammendedInfo.id;

			const i: any = {};

			Object.keys(ammendedInfo).map(k => {
				// @ts-ignore
				i[changeCase.title(k)] = ammendedInfo[k];
			});

			setNewInfo(i);
		}
	}, [info]);

	return (
		(validator && (
			<Container fluid={false}>
				<Row>
					<Col md={12}>
						<SContent>
							<span>Validator</span>
							<p>
								<Media>
									<Avatar address={address} />

									<Media.Body>
										<h5>
											{validator.moniker}{' '}
											<small>
												@{' '}
												{
													validator.history
														.consensus_round
												}
											</small>
											{' - '}
											<code>{validator.host}</code>
											{'  '}
											{validator.reachable ? (
												<Image
													src={GreenDot}
													width="10"
												/>
											) : (
												<Image
													src={RedDot}
													width="10"
												/>
											)}
										</h5>

										<div className="mono">
											{utils.cleanAddress(address)}
										</div>
									</Media.Body>
								</Media>
							</p>
						</SContent>
					</Col>
					<Col>
						<SContent>
							<span>Statistics</span>
							<p>
								<JsonToTable json={newInfo || info} />
							</p>
						</SContent>
					</Col>
				</Row>
			</Container>
		)) || <>No validator found.</>
	);
};

export default Validator;
