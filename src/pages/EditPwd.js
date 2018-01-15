import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import css from './EditPwd.css';
import PageHeader from '../components/PageHeader';
import { Steps, Button, message, Row, Col, Input, Icon, } from 'antd';
import { withRouter } from 'react-router';

//
const Step = Steps.Step;

//
class EditPwd extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			current: 0,
		};
	}

	//
	onNext(e) {
		this.setState({ current: this.state.current + 1 });
	}

	//
	onDone(e) {
		this.props.history.push('/profile');
	}

	//
	render() {
		let contents = [];
		contents[0] = (
			<div>
				<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 16, display: 'flex', alignItems: 'center'}}>
					<Col xs={24} sm={24} md={6} lg={6} xl={6} style={{textAlign: 'right'}}>
						<span>登录账号：</span>
					</Col>
					<Col xs={24} sm={24} md={8} lg={8} xl={8}>
						<Input size="large" placeholder="帐号名（手机号）" />
					</Col>
				</Row>
				<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 0, display: 'flex', alignItems: 'center'}}>
					<Col xs={24} sm={24} md={6} lg={6} xl={6} style={{textAlign: 'right'}}>
						<span>验证码：</span>
					</Col>
					<Col xs={24} sm={24} md={5} lg={5} xl={5} style={{paddingRight: 0}}>
						<Input size="large" placeholder="短信验证码（6位）" />
					</Col>
					<Col xs={24} sm={24} md={3} lg={3} xl={3} style={{paddingLeft: 0}}>
						<Button size="large" type="primary" ghost style={{width: '100%'}}>获取验证码</Button>
					</Col>
				</Row>
			</div>
		)
		contents[1] = (
			<div>
				<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 16, display: 'flex', alignItems: 'center'}}>
					<Col xs={24} sm={24} md={6} lg={6} xl={6} style={{textAlign: 'right'}}>
						<span>旧密码：</span>
					</Col>
					<Col xs={24} sm={24} md={8} lg={8} xl={8}>
						<Input size="large" placeholder="旧密码" />
					</Col>
				</Row>
				<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 16, display: 'flex', alignItems: 'center'}}>
					<Col xs={24} sm={24} md={6} lg={6} xl={6} style={{textAlign: 'right'}}>
						<span>新密码：</span>
					</Col>
					<Col xs={24} sm={24} md={8} lg={8} xl={8}>
						<Input size="large" placeholder="6-18位，字母、数字和下划线组成" />
					</Col>
				</Row>
				<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 0, display: 'flex', alignItems: 'center'}}>
					<Col xs={24} sm={24} md={6} lg={6} xl={6} style={{textAlign: 'right'}}>
						<span>确认新密码：</span>
					</Col>
					<Col xs={24} sm={24} md={8} lg={8} xl={8}>
						<Input size="large" placeholder="6-18位，字母、数字和下划线组成" />
					</Col>
				</Row>
			</div>
		)
		contents[2] = (
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<Icon type="check-circle" style={{fontSize: 72, color: '#52c41a', marginBottom: 24}}/>
				<span style={{fontSize: 24, color: 'rgba(0,0,0,.85)', fontWeight: 500, marginBottom: 24}}>修改成功</span>
			</div>
		)
		return (
			<PageLayoutContainer 
				selMenu={[]}
				subMenu={[]}
				collapsed={true}
			>
				<div className="pageWrapper">
					<PageHeader
						title="修改密码"
					></PageHeader>
					<div className="pageContent">
						<div style={{backgroundColor: 'white', padding: 16}}>
							<Steps current={this.state.current}>
								<Step title="短信验证"/>
								<Step title="修改密码"/>
								<Step title="显示结果"/>
							</Steps>
						</div>
						<div style={{backgroundColor: 'white', padding: 16}}>
							{
								contents[this.state.current]
							}
						</div>
						<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white'}}>
							{
								(this.state.current == 2)?
								<Button type="primary" size="large" style={{width: 100}} onClick={this.onDone.bind(this)}>完成</Button>:
								""
							}
						</div>
						<div style={{backgroundColor: 'white', padding: 16}}>
							<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 0}}>
								<Col xs={24} sm={24} md={6} lg={6} xl={6} style={{textAlign: 'right', marginLeft: 95}}>
									{
										(this.state.current == 0)?
										<Button type="primary" size="large" onClick={this.onNext.bind(this)}>下一步</Button>:
										""
									}
									{
										(this.state.current == 1)?
										<Button type="primary" size="large" onClick={this.onNext.bind(this)}>下一步</Button>:
										""
									}
								</Col>
							</Row>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}

export default withRouter(EditPwd);