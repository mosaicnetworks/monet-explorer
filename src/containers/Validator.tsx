import React from 'react';

import Utils from 'evm-lite-utils';

import { JsonToTable } from 'react-json-to-table';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Media from 'react-bootstrap/Media';

import { selectValidator } from '../selectors';
import { capitalize, pubKeyToAddress } from '../utils';

import Section, { Grid, Q } from '../ui';

type ReactRouterProps = {
	id: string;
};

const Validator: React.FC<RouteComponentProps<ReactRouterProps>> = props => {
	const validator = useSelector(selectValidator(props.match.params.id));

	if (!validator) {
		return <>No Validator found.</>;
	}

	return <>{validator.moniker}</>;
};

export default Validator;
