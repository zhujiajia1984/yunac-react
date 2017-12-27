import React from 'react';
import LoginMain from '../components/LoginMain';
import LoginFormWrapper from '../components/LoginForm';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import WxLogin from 'WxLogin';

//
const TabPane = Tabs.TabPane;
const TOKEN_OK = 123;
const TOKEN_NEW = 100;

//
export default class Login extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			isLoginLoading: false,
			tabToggle: 'account',
		}
	}

	// 账号登录
	onSubmitForm(values) {
		// alert(values.userName + '\n' + values.password);
		this.setState({ isLoginLoading: true });
		this.authServer(values);
		// setTimeout(() => {
		// 	this.setState({ isLoginLoading: false });
		// 	this.props.history.push('/index');
		// }, 500);
	}

	// 忘记密码
	onForgetPwd() {
		this.props.history.push('/pwdReset');
	}

	// 登录认证
	authServer(values) {
		let url = "https://weiquaninfo.cn/testYunAc/login";
		let token = localStorage.getItem("token");
		fetch(url, {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userName: values.userName,
					password: values.password,
					token: token
				}),
			})
			.then(res => {
				let contentType = res.headers.get("Content-Type");
				if (res.status == 200 && contentType && contentType.includes("application/json")) {
					return res.json();
				} else {
					throw new Error(`status:${res.status} contentType:${contentType}`);
				}
			})
			.then(resJson => {
				// 返回
				switch (resJson.code) {
					case TOKEN_OK:
						this.setState({ isLoginLoading: false });
						this.props.history.push('/index');
						break;
					case TOKEN_NEW:
						this.setState({ isLoginLoading: false });
						localStorage.setItem("token", resJson.token);
						this.props.history.push('/index');
						break;
					default:
						alert("unknow code");
				}
			})
			.catch(error => {
				this.setState({ isLoginLoading: false });
				alert(`登录失败：${error.message}`);
			})
	}

	//
	render() {
		return (
			<div>
				<LoginMain>
					<Tabs defaultActiveKey="account" className="loginMain">
						<TabPane tab="账号登录" key="account">
							<LoginFormWrapper 
								onSubmitForm={this.onSubmitForm.bind(this)}
								onForgetPwd={this.onForgetPwd.bind(this)}
								isLoading={this.state.isLoginLoading}
							>
							</LoginFormWrapper>
							<div style={styles.footer}>CloudAC ©2017 Created by DoubleCom</div>
						</TabPane>
						<TabPane tab="微信登录" key="wx" className="qrCodeWrapper">
							<div id="qrCodeContainer" className="qrCodeContent" ref={()=>{
								var obj = new WxLogin({
									id: "qrCodeContainer",
									appid: "wx43bb4143fa8c5b83",
									scope: "snsapi_login",
									redirect_uri: "https%3a%2f%2fwww.weiquaninfo.cn%2fgetwxinfo",
									state: "abc",
									style: "black",
									href: "https://www.weiquaninfo.cn/qrCode.css"
								});
							}}>
							</div>
						</TabPane>
					</Tabs>
				</LoginMain>
			</div>
		);
	}
}

//
Login.propTypes = {
	history: PropTypes.object,
};

// style
const styles = {
	footer: {
		display: 'flex',
		flexDirection: 'column-reverse',
		alignItems: 'center',
		flex: 1,
	},
}