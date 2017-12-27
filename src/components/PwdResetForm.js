import React from 'react';
import { Form, Input, Icon, Col, Button, message } from 'antd';
const FormItem = Form.Item;
import PropTypes from 'prop-types';

const CdTime = 60;

//
class PwdResetForm extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			isGetSmsDisabled: false,
			isShowTime: false,
			smsText: 120,
			isLoading: false,
		}
	}

	//
	componentDidMount() {
		this.props.form.validateFields();
	}

	//
	sendSms(e) {
		e.preventDefault();
		let phoneNumber = this.props.form.getFieldValue("phoneNumber");
		this.setState({ isGetSmsDisabled: true, isShowTime: true, smsText: CdTime });
		this.countDown(CdTime);
	}

	// 
	countDown(time) {
		if (time === 0) {
			this.setState({ isGetSmsDisabled: false, isShowTime: false });
		} else {
			time--;
			setTimeout(() => {
				this.setState({ smsText: time });
				this.countDown(time);
			}, 1000)
		}
	}


	//
	onSubmitForm(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({ isLoading: true });
				setTimeout(() => {
					this.setState({ isLoading: false });
					message.success("密码修改成功，即将登录系统", 3, () => {
						this.props.onSubmitPwd(values);
					})
				}, 500)
			}
		});
	}

	hasErrors(fieldsError) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}

	//
	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
		const phoneNumberError = isFieldTouched('phoneNumber') && getFieldError('phoneNumber');
		const smsCodeError = isFieldTouched('smsCode') && getFieldError('smsCode');
		const pwdError = isFieldTouched('pwd') && getFieldError('pwd');
		return (
			<Form onSubmit={this.onSubmitForm.bind(this)}>
				<FormItem
					validateStatus={phoneNumberError ? 'error' : ''}
					help={phoneNumberError || ''}
				>
				{getFieldDecorator('phoneNumber', {
					rules: [{
							min: 11,
							max: 11,
							required: true, 
							message: '请输入正确的手机号'
						}],
					})(
					<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名（手机号）" size="large"/>
				)}
				</FormItem>
				<FormItem>
					<Col span={16}>
						<FormItem
							validateStatus={smsCodeError ? 'error' : ''}
							help={smsCodeError || ''}
						>
						{getFieldDecorator('smsCode', {
							rules: [{
									min: 6,
									max: 6,
									required: true, 
									message: '请输入正确的短信验证码'
							}],
						})(
							<Input 
								prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} 
								placeholder="验证码"
								size="large"
							/>
						)}
						</FormItem>
					</Col>
					<Col span={8}>
						<Button 
							ghost
							disabled = {this.hasErrors(getFieldsError(['phoneNumber'])) || this.state.isGetSmsDisabled}
							type="primary"
							style={{width: '100%'}}
							size="large"
							onClick={this.sendSms.bind(this)}
						>{(this.state.isShowTime)?(`${this.state.smsText}秒`):("获取验证码")}</Button>
					</Col>
				</FormItem>
				<FormItem
					validateStatus={pwdError ? 'error' : ''}
					help={pwdError || ''}
				>
				{getFieldDecorator('pwd', {
					rules: [{
							min: 6,
							max: 18,
							required: true, 
							message: '请输入正确的密码(6-18位，字母、数字和下划线组成)'
					}],
				})(
					<Input 
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
						placeholder="密码"
						type="password"
						size="large"
					/>
				)}
				</FormItem>
				<FormItem>
					<Button 
						type="primary"
						style={{width: '100%'}}
						size="large"
						htmlType="submit"
						disabled={this.hasErrors(getFieldsError())}
						loading={this.state.isLoading}
					>重置密码</Button>
				</FormItem>
			</Form>
		);
	}
}

//
PwdResetForm.propTypes = {
	form: PropTypes.object,
};

const PwdResetFormWrapper = Form.create()(PwdResetForm)

export default PwdResetFormWrapper;