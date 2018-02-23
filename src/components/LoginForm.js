import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types';

// const
const FormItem = Form.Item;

//
class LoginForm extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			isShowCaptcha: false,
			captchaUrl: "https://weiquaninfo.cn/captcha",
		}
	}

	//
	onSubmitForm(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (values.password == '123456') {
					this.setState({ isShowCaptcha: true });
					return;
				} else {
					this.setState({ isShowCaptcha: false });
					this.props.onSubmitForm(values);
				}
				// this.setState({ isLoading: true });
				// setTimeout(() => {
				// 	this.setState({ isLoading: false });

				// }, 500)
			}
		});
	}

	//
	onChangeCaptcha(e) {
		e.preventDefault();
		let url = this.state.captchaUrl + '?time=' + Math.random();
		this.setState({ captchaUrl: url });
	}

	//
	onForgetPwd(e) {
		e.preventDefault();
		this.props.onForgetPwd();
	}

	//
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form onSubmit={this.onSubmitForm.bind(this)}>
				<FormItem>
				{getFieldDecorator('userName', {
					rules: [{
							min: 11,
							max: 11,
							required: true, 
							message: '请输入正确的手机号'
						}],
					})(
					<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名(手机号)" size="large"/>
				)}
				</FormItem>
				<FormItem>
				{getFieldDecorator('password', {
					rules: [{
						min: 6,
						max: 18,
						required: true,
						// pattern: /^[0-9a-zA-Z_]{1,}$/,  正则表达式
						message: '请输入正确的密码(6-18位，字母、数字和下划线组成)' 
						}],
					})(
					<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" type="password" size="large"/>
				)}
				</FormItem>
				{
					(this.state.isShowCaptcha)?
					<div>
						<FormItem>
						{getFieldDecorator('captcha', {
							rules: [{
								min: 0,
								max: 6,
								required: true,
								message: '请输入格式正确的验证码' 
								}],
							})(
							<Input placeholder="请输入下图中的验证码" size="large"/>
						)}
						</FormItem>
						<div style={{width: '100%', height: 60, marginBottom: 24, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
							<div style={{width: 256}}>
								<img src={this.state.captchaUrl} style={{height: 60, width: 256}}/>
							</div>
							<div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
								<a onClick={this.onChangeCaptcha.bind(this)}>看不清,换一个</a>
							</div>
						</div>
					</div>:
					<div></div>
				}
				<FormItem>
					<Button 
						type="primary"
						htmlType="submit"
						style={{width: '100%'}}
						size="large"
						loading={this.props.isLoading}
					>登录</Button>
					<a href="javascript:;" onClick={this.onForgetPwd.bind(this)} style={{float: 'right', color:"rgba(0, 0, 0, 0.25)"}}>忘记密码</a>
				</FormItem>
			</Form>
		);
	}
}

//
LoginForm.propTypes = {
	form: PropTypes.object,
	isLoading: PropTypes.bool.isRequired,
};

const LoginFormWrapper = Form.create()(LoginForm)

export default LoginFormWrapper;