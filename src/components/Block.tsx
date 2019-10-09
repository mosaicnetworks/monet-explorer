import React from 'react';

import { IBabbleBlock } from 'evm-lite-consensus';

type Props = {
	block: IBabbleBlock;
};

const Block: React.FC<Props> = props => {
	return (
		<>
			<pre>
				<code>{JSON.stringify(props.block, null, 2)}</code>
			</pre>
		</>
	);
};

export default Block;
