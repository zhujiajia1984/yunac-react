import React from 'react';
import PropTypes from 'prop-types';
import { Input, Popconfirm } from 'antd';

//
export default class EditableCell extends React.Component {
	constructor(props) {
		super(props);
	}

	//
	onTextChange(e) {
		this.props.onChange(e.target.value);
	}

	//
	render() {
		return (
			<div style={{marginRight: 20}}>
				{
					(this.props.editable)?
					<Input 
						value={this.props.value}
						onChange={this.onTextChange.bind(this)}
					/>:
					<span>{this.props.value}</span>
				}
			</div>
		);
	}
}

//
EditableCell.propTypes = {
	editable: PropTypes.bool.isRequired,
	value: PropTypes.string.isRequired,
};