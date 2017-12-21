import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

//
export default class ProfileStatus extends React.Component {
	constructor(props) {
		super(props);
	}

	//
	onEdit(e) {
		e.preventDefault();
		this.props.onEdit(this.props.type);
	}

	//
	render() {
		return (
			<div>
				{
					(this.props.isSeted)?
					<div style={{color: '#00a6a5'}}>
						<Icon type="check-circle-o" style={{marginRight: 10}}/>
						<span>已设置</span>
						<span style={{color: "#d9d9d9", marginLeft:5, marginRight: 5}}>|</span>
						<a href="javascript:;" onClick={this.onEdit.bind(this)}>修改</a>
					</div>:
					<div style={{color: '#ff9952'}}>
						<Icon type="close-circle-o" style={{marginRight: 10}}/>
						<span>未设置</span>
						<span style={{color: "#d9d9d9", marginLeft:5, marginRight: 5}}>|</span>
						<a href="javascript:;" onClick={this.onEdit.bind(this)}>修改</a>
					</div>
				}
			</div>
		);
	}
}

//
ProfileStatus.propTypes = {
	isSeted: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
	onEdit: PropTypes.func,
};