import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Grid, Q } from '../../ui';

const SUnderHeader = styled.div`
	background: var(--blue);
	border-top: 1px solid #1a2d7a6c;
	padding: 15px 0;
	color: white;
`;

const SLinks = styled.div`
	li {
		display: inline-block;
		font-weight: 500;
	}

	li a {
		padding: 30px;
		padding-left: 0;
		color: white;
	}

	li a:hover,
	.active {
		color: var(--orange) !important;
		cursor: pointer;
		text-decoration: none;
	}
`;

type Props = {
	active: string;
};

const UnderHeader: React.FC<Props> = props => {
	return (
		<>
			<SUnderHeader>
				<Grid fluid={true}>
					<Q pos={[1, 1]}>
						<SLinks>
							<li>
								<Link
									className={
										props.active === 'overview'
											? 'active'
											: ''
									}
									to="/explore"
								>
									Overview
								</Link>
							</li>
							<li>
								<Link
									className={
										props.active === 'blocks'
											? 'active'
											: ''
									}
									to="/explore/blocks"
								>
									Blocks
								</Link>
							</li>
							{/* <li>
								<Link
									to={'/explore/transactions'}
									className={
										props.active === 'transactions'
											? 'active'
											: ''
									}
								>
									Transactions
								</Link>
							</li> */}
						</SLinks>
					</Q>
				</Grid>
			</SUnderHeader>
		</>
	);
};

export default UnderHeader;
