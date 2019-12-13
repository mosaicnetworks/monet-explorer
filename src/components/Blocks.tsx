import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import Block from '../components/Block';

import { fetchNetworkBlocks } from '../modules/dashboard';
import { selectBlocks } from '../selectors';

const SLink = styled(Link)`
	text-decoration: none !important;
`;

const Explore: React.FC<{}> = () => {
	const dispatch = useDispatch();
	const fetchBlocks = () => dispatch(fetchNetworkBlocks());

	const blocks = useSelector(selectBlocks);

	useEffect(() => {
		fetchBlocks();
	}, []);

	return (
		<>
			{blocks.slice(0, 7).map(b => (
				<SLink key={b.index} to={`block/${b.index}/`}>
					<Block block={b} />
				</SLink>
			))}
		</>
	);
};

export default Explore;
