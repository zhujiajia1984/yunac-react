import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Menu } from 'antd';
import { withRouter } from 'react-router';

const MenuItem = Menu.Item;

//
class ProfileStatus extends React.Component {
	constructor(props) {
		super(props);
	}

	//
	onEdit(e) {
		e.preventDefault();
		this.props.onEdit(this.props.type);
	}

	//
	wxOperation(e) {
		if (e.key == "link") {
			this.props.history.push('/editWxLogin?status=link');
		} else if (e.key == "unlink") {
			this.props.history.push('/editWxLogin?status=unlink');
		}
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
						{
							// (this.props.type == 'email')?
							// <a href="javascript:;" onClick={this.onEdit.bind(this)}>修改</a>:
							// ""
						}
						{
							(this.props.type == 'wxLogin' || this.props.type == 'email')?
							<Dropdown overlay={
									<Menu onClick={this.wxOperation.bind(this)}>
										<MenuItem key="link">
											<a style={{marginLeft: 1, display:'inline-block'}}>绑定</a>
										</MenuItem>
										<MenuItem key="unlink">
											<a style={{marginLeft: 1, marginRight: 1, display:'inline-block'}}>解绑</a>
										</MenuItem>
									</Menu>
								} trigger={['click']}
							>
								<a href="javascript:;">操作<Icon type="down" /></a>
							</Dropdown>:
							""
						}
						
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

export default withRouter(ProfileStatus);