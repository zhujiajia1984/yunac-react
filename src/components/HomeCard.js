import React from 'react';
import { Card, Icon, Tooltip } from 'antd';
import css from './HomeCard.css';
import PropTypes from 'prop-types';

//
export default class HomeCard extends React.Component {
	constructor(props) {
		super(props);
	}

	//
	render() {
		return (
			<div className="container">
				<Card bordered={false} className="HomeCardWrapper">
					<div className="contentWrapper">
						<div className="HomeCardHeader">
							<div className="HomeCardHeaderTitle">
								<span>{this.props.name}</span>
							</div>
							<div className="HomeCardHeaderIcon">
								<Tooltip title={this.props.detail}>
									<Icon type="info-circle-o" />
								</Tooltip>
							</div>
						</div>
						<div className="HomeCardContent">
							<span>{this.props.content}</span>
							<div style={{flex:1, height: 38}}>
								<span className="contentUnit">{this.props.unit}</span>								
							</div>
						</div>
						<div className="HomeCardImage">
							<img src={this.props.imageUrl} alt="" 
							style={{width: '100%'}} />
						</div>
						<div className="HomeCardFooter">
							<div style={{paddingTop: 4}}>
								abc
							</div>
						</div>
					</div>
				</Card>
			</div>
		);
	}
}

//
HomeCard.propTypes = {
	name: PropTypes.string.isRequired,
	detail: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	unit: PropTypes.string,
	imageUrl: PropTypes.string.isRequired,
};