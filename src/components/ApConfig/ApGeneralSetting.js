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
export default class ApGeneralSetting extends React.Component {

	//
	constructor(props) {
		super(props);
		this.state = {
			genSetloading: false,
			isDistance: true,
			isNumber: false,
			isSignalLow: false,
		}
	}

	//
	onSaveGeneralSetting(e) {
		this.setState({ genSetloading: true });
		setTimeout(() => {
			this.setState({ genSetloading: false });
			message.success('保存通用设置成功');
		}, 1000)
	}

	//
	onDisChange(e) {
		this.setState({ isDistance: e });
	}

	//
	onNumChange(e) {
		this.setState({ isNumber: e });
	}

	//
	onSigChange(e) {
		this.setState({ isSignalLow: e });
	}

	//
	render() {
		return (
			<div>
				<Card 
					title="通用设置" 
					bordered={true}
					style={{ width: '100%', marginBottom: 0 }}
					extra={
						<Popconfirm placement="left" title="确认保存并生效吗？" onConfirm={this.onSaveGeneralSetting.bind(this)} okText="确认" cancelText="取消">
							<a href="#">保存并生效</a>
						</Popconfirm>
					}
				>
					<Spin spinning={this.state.genSetloading}>
						<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 16, display: 'flex', alignItems: 'center'}}>
							<Col span={3} style={{textAlign: 'right'}}>
								<span>无线信道：</span>
							</Col>
							<Col span={9}>
								<Select defaultValue="6" style={{ width: '100%' }}>
									<Option value="1">1(9999MHz)</Option>
									<Option value="2">2(9999MHz)</Option>
									<Option value="6">6(9999MHz)</Option>
								</Select>
							</Col>
							<Col span={3} style={{textAlign: 'right'}}>
								<span>无线协议：</span>
							</Col>
							<Col span={9}>
								<Select defaultValue="6" style={{ width: '100%' }}>
									<Option value="1">802.11g</Option>
									<Option value="2">802.11b</Option>
									<Option value="6">802.11n</Option>
								</Select>
							</Col>
						</Row>
						<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 16, display: 'flex', alignItems: 'center'}}>
							<Col span={3} style={{textAlign: 'right'}}>
								<span>无线频宽：</span>
							</Col>
							<Col span={9}>
								<Select defaultValue="6" style={{ width: '100%' }}>
									<Option value="1">40MHz</Option>
									<Option value="6">20MHz</Option>
								</Select>
							</Col>
							<Col span={3} style={{textAlign: 'right'}}>
								<span>无线功率：</span>
							</Col>
							<Col span={9}>
								<Select defaultValue="6" style={{ width: '100%' }}>
									<Option value="1">18dBm</Option>
									<Option value="2">19dBm</Option>
									<Option value="6">20dBm</Option>
								</Select>
							</Col>
						</Row>
						<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 16, display: 'flex', alignItems: 'center'}}>
							<Col span={3} style={{textAlign: 'right'}}>
								<span>最优距离：</span>
							</Col>
							<Col span={2}>
								<Switch defaultChecked onChange={this.onDisChange.bind(this)}/>
							</Col>
							<Col span={7}>
								{
									(this.state.isDistance)?
									<Input placeholder="范围[0-500]，单位(米)" defaultValue="300"/>:
									""
								}
							</Col>
							<Col span={3} style={{textAlign: 'right'}}>
								<span>终端数限制：</span>
							</Col>
							<Col span={2}>
								<Switch defaultChecked={false} onChange={this.onNumChange.bind(this)}/>
							</Col>
							<Col span={7}>
								{
									(this.state.isNumber)?
									<Input placeholder="最大终端数量,范围[1-60]" defaultValue="30"/>:
									""
								}
							</Col>
						</Row>
						<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 16, display: 'flex', alignItems: 'center'}}>
							<Col span={3} style={{textAlign: 'right'}}>
								<span>弱信号禁止：</span>
							</Col>
							<Col span={2}>
								<Switch defaultChecked={false} onChange={this.onSigChange.bind(this)}/>
							</Col>
							<Col span={7}>
								{
									(this.state.isSignalLow)?
									<Input placeholder="最弱信号设置,范围[-90至-55]" defaultValue="-80"/>:
									""
								}
							</Col>
						</Row>
					</Spin>
				</Card>
			</div>
		);
	}
}