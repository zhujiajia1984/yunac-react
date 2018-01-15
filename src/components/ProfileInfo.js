import React from 'react';
import { Avatar, Icon, Tooltip } from 'antd';
import EditableCell from '../components/EditableCell';

// const
const avatarWidth = 122;

//
export default class ProfileInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isWxBind: true,
			isEditable: false,
			isEditCancel: false,
			profileOriName: "张三",
			profileCurName: "张三",
		}
	}

	//
	onNameEdit(e) {
		e.preventDefault();
		this.setState({ isEditable: true, isEditCancel: false });
	}
	onNameCancel(e) {
		e.preventDefault();
		this.setState({ isEditable: false, isEditCancel: true, profileCurName: this.state.profileOriName });
	}
	onChangeName(value) {
		this.setState({ profileCurName: value });
	}
	onNameSave(e) {
		e.preventDefault();
		this.setState({ isEditable: false, isEditCancel: false, profileOriName: this.state.profileCurName });
	}

	//
	render() {
		return (
			<div style={styles.container}>
				<div style={styles.content}>
					<div style={styles.avatarContainer}>
						{
							(this.state.isWxBind)
							?<Avatar 
								src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
								style={{height: '100%', width: '100%', borderRadius: '50%'}} 
							/>
							: <div style={styles.defalutAvatar}>
								<Icon type="user" style={{color: 'white', fontSize: 55}}></Icon>
							</div> 
						}
					</div>
					<div style={styles.info}>
						<div style={styles.infoRow}>
							<span>登录账号：</span>
							<span>15229876543</span>
						</div>
						<div style={styles.infoRow}>
							<span>用户名称：</span>
							<span>张三</span>
							<span style={{marginLeft: 8}}>
								<Tooltip title="如需修改，请联系供应商">
									<Icon type="info-circle-o" style={{color: "#8c8c8c"}} />
								</Tooltip>
							</span>
						</div>
						<div style={styles.infoRow}>
							<span>注册时间：</span>
							<span>2017-12-15 16:43:14</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// style
const styles = {
	container: {
		display: 'flex',
		flex: 1,
	},
	content: {
		display: 'flex',
		flex: 1,
		padding: 18,
	},
	avatarContainer: {
		width: avatarWidth,
	},
	info: {
		marginLeft: 36,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		flex: 1,
		fontSize: '14px',
		paddingBottom: '15px',
		paddingTop: '15px'
	},
	infoRow: {
		display: 'flex',
		alignItems: 'center',
		flex: 1,
		color: "#333333"
	},
	defalutAvatar: {
		height: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#d9d9d9',
		borderRadius: '50%',
		border: '1px solid #d9d9d9'
	},
}