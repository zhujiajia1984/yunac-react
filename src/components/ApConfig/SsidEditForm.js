import React from 'react';
import {
	Row,
	Col,
	Switch,
	Input,
	Select,
	Badge,
	Button
} from 'antd';
import { withRouter } from 'react-router';


//
const Option = Select.Option;

//
class SsidEditForm extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			isWifiOn: true,
			isPwdOn: true,
			isMaxPhoneOn: false,
		}
	}

	//
	onWifiChange(e) {
		this.setState({ isWifiOn: e });
	}

	//
	onPwdChange(e) {
		this.setState({ isPwdOn: e });
	}

	//
	onMaxPhoneChange(e) {
		this.setState({ isMaxPhoneOn: e });
	}

	//
	onSave(e) {
		this.props.history.push("/apConfig");
	}

	//
	render() {
		return (
			<div style={{marginTop: 24}}>
				<div style={{backgroundColor: 'white', padding: 24}}>
					<Row gutter={16}>
						<Col span={3}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								无线开关：
							</div>
						</Col>
						<Col span={9}>
							<Switch 
								defaultChecked={true}
								size="large"
								onChange={this.onWifiChange.bind(this)}
							/>
						</Col>
					</Row>
					{
						(this.state.isWifiOn)?
						<div>
							<Row gutter={16} style={{marginTop: 24, display: 'flex', alignItems: 'center'}}>
								<Col span={3}>
									<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
										SSID名称：
									</div>
								</Col>
								<Col span={9}>
									<Input 
										placeholder="支持中文，最多32个字符"
										size="large"
									/>
								</Col>
							</Row>
							<Row gutter={16} style={{marginTop: 24, display: 'flex', alignItems: 'center'}}>
								<Col span={3}>
									<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
										SSID显示：
									</div>
								</Col>
								<Col span={9}>
									<Switch 
										defaultChecked={true}
										size="large"
									/>
								</Col>
							</Row>
							<Row gutter={16} style={{marginTop: 24, display: 'flex', alignItems: 'center'}}>
								<Col span={3}>
									<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
										密码开关：
									</div>
								</Col>
								<Col span={9}>
									<Switch 
										defaultChecked={true}
										size="large"
										onChange={this.onPwdChange.bind(this)}
									/>
								</Col>
							</Row>
							{
								(this.state.isPwdOn)?
								<div>
									<Row gutter={16} style={{marginTop: 24, display: 'flex', alignItems: 'center'}}>
										<Col span={3}>
											<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
												无线密码：
											</div>
										</Col>
										<Col span={9}>
											<Input 
												placeholder="无线密码"
												size="large"
											/>
										</Col>
									</Row>
									<Row gutter={16} style={{marginTop: 24, display: 'flex', alignItems: 'center'}}>
										<Col span={3}>
											<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
												加密方式：
											</div>
										</Col>
										<Col span={9}>
											<Select defaultValue="3" style={{ width: '100%' }} size="large">
												<Option value="1">WPA-PSK</Option>
												<Option value="2">WPA2-PSK</Option>
												<Option value="3">WPA2-PSK2</Option>
											</Select>
										</Col>
									</Row>
									<Row gutter={16} style={{marginTop: 24, display: 'flex', alignItems: 'center'}}>
										<Col span={3}>
											<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
												加密算法：
											</div>
										</Col>
										<Col span={9}>
											<Select defaultValue="3" style={{ width: '100%' }} size="large">
												<Option value="1">AES</Option>
												<Option value="2">TKIP</Option>
												<Option value="3">TKIP/AES混合</Option>
											</Select>
										</Col>
									</Row>
								</div>:""
							}
							<Row gutter={16} style={{marginTop: 24, display: 'flex', alignItems: 'center'}}>
								<Col span={3}>
									<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
										VLAN开关：
									</div>
								</Col>
								<Col span={3}>
									<Badge status="success" text="ON" />
								</Col>
								<Col span={3}>
									<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
										VLANID：
									</div>
								</Col>
								<Col span={3}>
									<span>10</span>
								</Col>
							</Row>
							<Row gutter={16} style={{marginTop: 24, display: 'flex', alignItems: 'center'}}>
								<Col span={3}>
									<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
										用户隔离：
									</div>
								</Col>
								<Col span={9}>
									<Switch 
										defaultChecked={false}
										size="large"
									/>
								</Col>
							</Row>
							<Row gutter={16} style={{marginTop: 24, display: 'flex', alignItems: 'center'}}>
								<Col span={3}>
									<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
										终端数量限制：
									</div>
								</Col>
								<Col span={9}>
									<Switch 
										defaultChecked={false}
										size="large"
										onChange={this.onMaxPhoneChange.bind(this)}
									/>
								</Col>
							</Row>
							{
								(this.state.isMaxPhoneOn)?
								<div>
									<Row gutter={16} style={{marginTop: 24, display: 'flex', alignItems: 'center'}}>
										<Col span={3}>
											<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
												最大终端数：
											</div>
										</Col>
										<Col span={9}>
											<Input 
												placeholder="范围[1-60]"
												size="large"
											/>
										</Col>
									</Row>
								</div>:""
							}
						</div>:""
					}
					<Row gutter={16} style={{marginTop: 24}}>
						<Col span={3} style={{display: 'flex', flexDirection: 'row-reverse', marginLeft: 72}}>
							<Button 
								type="primary"
								size="large"
								onClick={this.onSave.bind(this)}
							>确认</Button>
						</Col>
						<Col span={3}>
							<Button 
								type="default"
								size="large"
								onClick={this.onSave.bind(this)}
							>取消</Button>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default withRouter(SsidEditForm);