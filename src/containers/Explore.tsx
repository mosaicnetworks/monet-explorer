import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Currency } from 'evm-lite-utils';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Avatar from '../components/Avatar';
import Block from '../components/Block';
import Loader from '../components/Loader';
import Stats from '../components/Stats';
import Table from '../components/Table';

import { SContent, SJumbotron, SSection } from '../components/styles';

import { fetchNetworkBlocks, fetchTransactions } from '../modules/dashboard';
import {
	selectBlocks,
	selectBlocksLoading,
	selectTransactions,
	selectTxsLoading
} from '../selectors';
import { commaSeperate } from '../utils';

import Grid, { Quadrant, Section } from '../ui';

const SLink = styled(Link)`
	text-decoration: none !important;
`;

const Explore: React.FC<RouteComponentProps<{}>> = props => {
	const dispatch = useDispatch();

	const loading = useSelector(selectBlocksLoading);
	const txLoading = useSelector(selectTxsLoading);

	const blocks = useSelector(selectBlocks);
	const transactions = useSelector(selectTransactions);

	const fetchBlocks = () => dispatch(fetchNetworkBlocks());
	const fetchTxs = () => dispatch(fetchTransactions());

	useEffect(() => {
		fetchBlocks();
		fetchTxs();
	}, []);

	useEffect(() => {
		ReactTooltip.rebuild();
	}, [blocks]);

	const [search, setSearch] = useState('');
	const onSearchEnter = (event: any) => {
		if (event.keyCode === 13) {
			props.history.push(`/search/${search}`);
		}
	};

	return (
		<>
			<SJumbotron>
				<Section padding={30}>
					<Grid>
						<Quadrant pos={[1, 1]}>
							<h1>Explore</h1>
							<p className="">
								Browse blocks and transactions
								{/* and the{' '}
								<a href="https://github.com/mosaicnetworks/babble">
									Babble
								</a>{' '}
								hashgraph */}
							</p>
							<Form.Control
								onChange={(e: any) => setSearch(e.target.value)}
								onKeyUp={onSearchEnter}
								type="text"
								placeholder="Search Address"
							/>
						</Quadrant>
					</Grid>
				</Section>
			</SJumbotron>
			<Stats />
			<SSection>
				<Container fluid={false}>
					<Row>
						<Col md={12} lg={7}>
							<SContent>
								<h3>
									Recent Blocks <Loader loading={loading} />
								</h3>
								<div
									style={{
										background: 'white',
										padding: '10px'
									}}
								>
									{blocks.map(b => (
										<SLink
											key={b.index}
											to={`block/${b.index}/`}
										>
											<Block block={b} />
										</SLink>
									))}
								</div>
							</SContent>
							<div className="d-xs-block d-md-none">
								<hr />
								<br />
							</div>
						</Col>
						<Col md={12} lg={5}>
							<SContent>
								<h3>
									Recent Transactions{' '}
									<Loader loading={txLoading} />
								</h3>
								<div className="padding">
									<Table>
										<thead>
											<tr>
												<th>From</th>
												<th>To</th>
												<th>Value</th>
												<th>Gas</th>
												<th>Gas Price</th>
												<th className="text-center">
													Contract Call?
												</th>
											</tr>
										</thead>
										<tbody>
											{transactions.map(t => (
												<tr key={t.data}>
													<td>
														<Avatar
															address={t.sender}
															size={35}
														/>
													</td>
													<td>
														<Avatar
															address={t.to}
															size={35}
														/>
													</td>
													<td>
														{new Currency(
															t.amount === '0'
																? 0
																: t.amount + 'a'
														).format('T')}
													</td>
													<td>
														{commaSeperate(t.gas)}
													</td>
													<td>{t.gas_price}</td>
													<td className="text-center">
														{(t.payload.length >
															0 && (
															<img
																src="https://image.flaticon.com/icons/svg/1828/1828640.svg"
																width={20}
															/>
														)) ||
															'-'}
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</div>
							</SContent>
						</Col>
					</Row>
				</Container>
			</SSection>
		</>
	);
};

export default Explore;
