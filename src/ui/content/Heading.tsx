import React from 'react';

const Heading: React.FC<{}> = props => {
	return <h3 className="preheader">{props.children}</h3>;
};

export default Heading;
