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
	}

	//
	onSubmitForm(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.onSubmitForm(values);
				// this.setState({ isLoading: true });
				// setTimeout(() => {
				// 	this.setState({ isLoading: false });

				// }, 2000)
			}
		});
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