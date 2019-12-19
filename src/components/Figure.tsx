import React, { useEffect } from 'react';

import ReactTooltip from 'react-tooltip';

import utils from 'evm-lite-utils';
import styled from 'styled-components';

import BFigure from 'react-bootstrap/Figure';

const SAvatar = styled.div`
	& .figure {
		margin: 0px !important;
		padding: 0 !important;
	}

	.figure-img {
		display: inline-block !important;
	}

	.figure-caption {
		font-size: 80%;
	}

	img {
		border-radius: var(--border-radius) !important;
	}
`;

type Props = {
	address: string;
	size?: number;
	className?: string;
	caption?: string;
};

const Figure: React.FC<Props> = props => {
	useEffect(() => {
		ReactTooltip.rebuild();
	}, []);

	return (
		<SAvatar>
			<BFigure>
				<BFigure.Image
					className={props.className}
					data-tip={utils.cleanAddress(props.address)}
					src={`https://s.gravatar.com/avatar/${utils.trimHex(
						props.address
					)}?size=100&default=retro`}
					width={props.size || 50}
				/>
				{props.caption && (
					<BFigure.Caption className={'small'}>
						{props.caption}
					</BFigure.Caption>
				)}
			</BFigure>
		</SAvatar>
	);
};

export default Figure;
