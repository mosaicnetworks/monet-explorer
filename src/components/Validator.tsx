import React from 'react';

import { useSelector } from 'react-redux';

import { Info, Validator as TValidator } from '../client';
import { Store } from '../store';

type Props = {
	validator: TValidator;
};

const Validator: React.FC<Props> = props => {
	const infos = useSelector<Store, Info[]>(store => store.networkInfos);
	const error = useSelector<Store, string | undefined>(store => store.error);

	const info = infos.filter(i => i.validator.id === props.validator.id)[0];

	return (
		<>
			{error || (
				<pre>
					<code>{JSON.stringify(info, null, 2)}</code>
				</pre>
			)}
		</>
	);
};

export default Validator;
