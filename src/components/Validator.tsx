import React from 'react';

import { useSelector } from 'react-redux';

import { Validator as TValidator } from '../client';
import { validatorInfo } from '../selectors';

type Props = {
	validator: TValidator;
};

const Validator: React.FC<Props> = props => {
	const info = useSelector(validatorInfo(props.validator.id));

	return (
		<>
			<pre>
				<code>{JSON.stringify(info, null, 2)}</code>
			</pre>
		</>
	);
};

export default Validator;
