import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Select } from 'antd';
import cellcss from './EditableTablCell.css';

// const
const Option = Select.Option;

//
export default class EditableTableCell extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
			preValue: this.props.value,
			editable: false,
		}
	}

	//
	editCell() {
		this.setState({ editable: true, });
	}

	//
	onTextChange(e) {
		this.setState({ value: e.target.value, });
	}

	//
	saveText(text) {
		if (text) {
			this.setState({ editable: false, preValue: this.state.value });
			this.props.onSaveText(text);
		} else {
			this.setState({ editable: false, value: this.state.preValue });
		}
	}

	//
	render() {
		return (
			<div className="editCellWrapper">
				{
					(this.state.editable)?
					<div className="editCell">
						{	
							(this.props.type == "input")?
							<Input value={this.state.value}
								spellCheck='false'
								onChange = {this.onTextChange.bind(this)}
							></Input>:
							<Select defaultValue={this.state.value} style={{width: 120}}>
								<Option value={this.state.value}>{this.state.value}</Option>
								<Option value="DB6000-W3">DB6000-W3</Option>
								<Option value="DB6000-W4">DB6000-W4</Option>
							</Select>
						}
						<Icon type="check" style={{color: '#52c41a'}} 
							className="oprationIcon"
							onClick={this.saveText.bind(this, this.state.value)}
						/>
						<Icon type="close" style={{color: '#f5222d'}} 
							className="oprationIcon"
							onClick={this.saveText.bind(this, "")}
						/>
					</div>:
					<div className="editCell">
						<span>{this.state.value}</span>
						<div className="editIconWrapper">
							<div className="editIcon">
								<Icon type="edit"
									onClick={this.editCell.bind(this)}
								></Icon>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}


//
EditableTableCell.propTypes = {
	value: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onSaveText: PropTypes.func,
};