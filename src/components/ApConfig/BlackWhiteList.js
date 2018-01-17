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
import BlackWhiteListTable from './BlackWhiteListTable';

const Option = Select.Option;

//
export default class BlackWhiteList extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			setloading: false,
			safeSwitch: false,
			type: 'black',
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
	onChangeType(e) {
		this.setState({ type: e });
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
						<div>
							<span style={{marginRight: 8}}>访问控制开关：</span>
							<Switch 
								defaultChecked={false}
								size="large"
								onChange={this.onSafeChange.bind(this)}
							/>
						</div>
						{
							(this.state.safeSwitch)?
							<div>
								<div style={{display: 'flex', alignItems: 'center', marginTop: 24}}>
									<span style={{marginRight: 8}}>访问控制类型：</span>
									<Select 
										defaultValue="1" 
										style={{ width: 300 }} 
										size="large"
										onChange={this.onChangeType.bind(this)}
									>
										<Option value="1">黑名单（名单内的终端将无法上网）</Option>
										<Option value="2">白名单（只允许名单内的终端上网）</Option>
									</Select>
								</div>
								<BlackWhiteListTable type={this.state.type}></BlackWhiteListTable>
							</div>:""
						}
					</Spin>
				</Card>
			</div>
		);
	}
}