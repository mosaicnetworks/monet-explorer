import React from 'react';

import Col, { ColProps } from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

type QuadrantProps = ColProps & {
	// [RowIndex, ColIndex]
	pos: [number, number];
	className?: string;
};

export const Quadrant: React.FC<QuadrantProps> = props => {
	return <>{props.children}</>;
};

type Props = {
	fluid?: boolean;
	verticalAlign?: boolean;
	noGutters?: boolean;
	className?: string;
};

const Grid: React.FC<Props> = props => {
	const matrix: any[][] = [];
	const align =
		props.verticalAlign === undefined
			? 'align-items-center'
			: props.verticalAlign
			? 'align-items-center'
			: '';

	React.Children.forEach(
		props.children as React.ReactElement<QuadrantProps>,
		(child, i) => {
			const row = child.props.pos[0] - 1;
			const col = child.props.pos[1] - 1;

			if (!matrix[row]) {
				matrix[row] = [];
			}

			for (const c of Array(col + 1).keys()) {
				if (!matrix[row][c]) {
					matrix[row][c] = <Col />;
				}
			}

			matrix[row][col] = (
				<Col
					key={`col${i}`}
					xs={child.props.xs}
					sm={child.props.sm}
					md={child.props.md}
					lg={child.props.lg}
					xl={child.props.xl}
					className={child.props.className}
				>
					{child}
				</Col>
			);
		}
	);

	return (
		<Container className={props.className} fluid={props.fluid || false}>
			{matrix.map((r, i) => (
				<Row noGutters={props.noGutters} key={i} className={align}>
					{r}
				</Row>
			))}
		</Container>
	);
};

export default Grid;
