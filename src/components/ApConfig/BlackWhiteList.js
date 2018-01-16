import React from 'react';
import {
	Row,
	Col,
	Card,
	Popconfirm,
	Spin,
	message,
	Input,
	Select,
	Switch,
} from 'antd';

const Option = Select.Option;

//
export default class BlackWhiteList extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			setloading: false,
			safeSwitch: false,
		}
	}

	//
	onSaveSafeSetting(e) {
		this.setState({ setloading: true });
		setTimeout(() => {
			this.setState({ setloading: false });
			message.success('保存设置成功');
		}, 1000)
	}

	//
	onSafeChange(e) {
		this.setState({ safeSwitch: e });
	}

	//
	render() {
		return (
			<div>
				<Card 
					title="访问控制" 
					bordered={true}
					style={{ width: '100%', marginBottom: 0 }}
					extra={
						<Popconfirm placement="left" title="确认保存并生效吗？" onConfirm={this.onSaveSafeSetting.bind(this)} okText="确认" cancelText="取消">
							<a href="#">保存并生效</a>
						</Popconfirm>
					}
				>
					<Spin spinning={this.state.setloading}>
						<Row gutter={16}>
							<Col span={6}>
								<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
									访问控制开关：
								</div>
							</Col>
							<Col span={6}>
								<Switch 
									defaultChecked={false}
									size="large"
									onChange={this.onSafeChange.bind(this)}
								/>
							</Col>
						</Row>
						{
							(this.state.safeSwitch)?
							<div>
								<Row gutter={16} style={{marginTop: 24, display: 'flex', alignItems: 'center'}}>
								<Col span={6}>
									<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
										访问控制类型：
									</div>
								</Col>
								<Col span={6}>
									<Select defaultValue="1" style={{ width: '100%' }} size="large">
										<Option value="1">黑名单（名单内的终端将无法上网）</Option>
										<Option value="2">白名单（只允许名单内的终端上网）</Option>
									</Select>
								</Col>
							</Row>
							</div>:""
						}
					</Spin>
				</Card>
			</div>
		);
	}
}