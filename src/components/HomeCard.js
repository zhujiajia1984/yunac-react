import React from 'react';
import { Card } from 'antd';
import css from './HomeCard.css';

//
export default class HomeCard extends React.Component {
	constructor(props) {
		super(props);
	}

	//
	render() {
		return (
			<div className="container">
				<Card bordered={false}>
					<div className="contentWrapper">
						<div className="HomeCardHeader">
							header
						</div>
						<div className="HomeCardContent">
							content
						</div>
						<div className="HomeCardFooter">
							footer
						</div>
					</div>
				</Card>
			</div>
		);
	}
}