import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Form, Grid, Input } from 'semantic-ui-react';

import Box from '../components/Box';

import { config as c, IConfigState, IStore } from '@monetexplorer/redux';

const Config: React.FC<{}> = () => {
	const dispatch = useDispatch();

	// state
	const [host, setHost] = useState('');
	const [port, setPort] = useState('');

	const config = useSelector<IStore, IConfigState>(store => store.config);

	const saveConfig = () => {
		dispatch(c.save(host, Number(port)));
	};

	useEffect(() => {
		setHost(config.host);
		setPort(config.port.toString());
	}, []);

	const onChangeHost = (_: any, { value }: { value: string }) => {
		console.log(_);
		console.log(value);
		setHost(value);
	};
	const onChangePort = (_: any, { value }: { value: string }) =>
		setPort(value);

	return (
		<Container fluid={false}>
			<Grid stackable={true} columns={'equal'}>
				<Grid.Column>
					<Box padding={true} heading={'Configuration'}>
						<Form>
							<Form.Field>
								<label>Host</label>
								<Input
									placeholder="Host"
									defaultValue={host}
									onChange={onChangeHost}
								/>
							</Form.Field>
							<Form.Field>
								<label>Port</label>
								<Input
									placeholder="Port"
									defaultValue={port}
									onChange={onChangePort}
								/>
							</Form.Field>
							<Button
								onClick={saveConfig}
								color="green"
								type="submit"
							>
								Save
							</Button>
						</Form>
					</Box>
				</Grid.Column>
			</Grid>
		</Container>
	);
};

export default Config;
