import React from 'react';
import { List, Avatar } from 'antd';
import css from './ProfileBody.css';
import ProfileStatus from './ProfileStatus';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// const
const Item = List.Item;
const data = [{
		title: '登录密码',
		type: 'pwd',
		desp: '6-18位密码，由数字、字母和下划线组成',
		isSeted: true,
	},
	{
		title: '微信绑定',
		type: 'wxLogin',
		desp: '绑定后可通过微信扫码登录平台',
		isSeted: false,
	},
];

//
class ProfileBody extends React.Component {
	constructor(props) {
		super(props);
	}

	//
	onEdit(type) {
		switch (type) {
			case "pwd":
				this.props.history.push('/editPwd');
				break;
			case "wxLogin":
				alert("wxLogin");
				break;
			default:
				alert("no type");
				break;
		}
	}

	//
	render() {
		return (
			<div style={{backgroundColor:'white'}}>
				<List
					dataSource={data}
					renderItem={(item)=>{
						return <Item actions = {[<ProfileStatus 
													isSeted={item.isSeted} 
													key={item.type}
													type={item.type}
													onEdit={this.onEdit.bind(this)}
												>
												</ProfileStatus>]}>
									<Item.Meta
										avatar = {(item.type=="pwd")?<Avatar icon="lock" style={{marginTop:10, backgroundColor:'#18aeff'}}/>:<Avatar icon="wechat" style={{marginTop:10, backgroundColor:'#00cf0d'}}/>}
										title = {<span style={{fontSize: 14, fontWeight: 600}}>{item.title}</span>}
										description = {item.desp}
										style = {{marginLeft: 18}}
									/>
								</Item>
						}}
				>		
				</List>
			</div>
		);
	}
}

//
ProfileBody.propTypes = {
	history: PropTypes.object,
};

export default withRouter(ProfileBody);