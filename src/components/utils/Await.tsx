import React from 'react';

import Loader from './Loader';

type Props = {
	loading: boolean;
	fallback?: JSX.Element;
};

const Await: React.FC<Props> = props => {
	const Fallback: JSX.Element = props.fallback || (
		<Loader loading={props.loading} />
	);

	if (props.loading) {
		return Fallback;
	}

	return <>{props.children}</>;
};

export default Await;
