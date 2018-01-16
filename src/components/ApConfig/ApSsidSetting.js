import React from 'react';
import {
	Card,
	Popconfirm,
	message,
	Table,
	Divider,
	Button,
	Input,
	Badge,
	Row,
	Col,
	Select,
} from 'antd';
import { withRouter } from 'react-router';

// const 
const { Column, } = Table;
const Search = Input.Search;
let data = [];
const Option = Select.Option;

//
class ApSsidSetting extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			data: [],
			pagination: {
				defaultCurrent: 1,
				defaultPageSize: 6,
				pageSize: 6,
			},
		}
	}

	//
	componentDidMount() {
		this.setState({ isLoading: true, });
		setTimeout(() => {
			for (let i = 0; i < 100; i++) {
				data.push({
					key: i.toString(),
					ssid: 'ssid' + i,
					ssidSwitch: 'on',
					channel: (i % 12) + 1,
					show: 'on',
					pwd: (i % 2 == 0) ? 'off' : 'on',
				})
			}
			this.setState({ isLoading: false, data: data });
		}, 500)
	}


	//
	onSaveSSID(e) {
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.setState({ isLoading: false });
			message.success("保存SSID设置成功");
		}, 500)
	}

	//
	onSsidEdit(e) {
		this.props.history.push('/ssidEdit');
	}

	//
	render() {
		const expandRowData = (
			<div style={{fontSize: 14}}>
				<Row gutter={16}>
					<Col span={3}>
						<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
							无线开关：
						</div>
					</Col>
					<Col span={9}>
						<Badge status="success" text="ON" />
					</Col>
					<Col span={3}>
						<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
							SSID类型：
						</div>
					</Col>
					<Col span={9}>
						<span>主SSID</span>
					</Col>
				</Row>
				<Row gutter={16} style={{marginTop: 10}}>
					<Col span={3}>
						<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
							无线密码：
						</div>
					</Col>
					<Col span={9}>
						<span>doublecom123</span>
					</Col>
					<Col span={3}>
						<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
							无线协议：
						</div>
					</Col>
					<Col span={9}>
						<span>802.11n</span>
					</Col>
				</Row>
				<Row gutter={16} style={{marginTop: 10}}>
					<Col span={3}>
						<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
							加密方式：
						</div>
					</Col>
					<Col span={9}>
						<span>WPA2/PSK</span>
					</Col>
					<Col span={3}>
						<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
							加密算法：
						</div>
					</Col>
					<Col span={9}>
						<span>TKIP</span>
					</Col>
				</Row>
				<Row gutter={16} style={{marginTop: 10}}>
					<Col span={3}>
						<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
							VLAN开关：
						</div>
					</Col>
					<Col span={9}>
						<Badge status="success" text="ON" />
					</Col>
					<Col span={3}>
						<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
							VLAN_ID：
						</div>
					</Col>
					<Col span={9}>
						<span>10</span>
					</Col>
				</Row>
				<Row gutter={16} style={{marginTop: 10}}>
					<Col span={3}>
						<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
							最大终端数：
						</div>
					</Col>
					<Col span={9}>
						<span>-</span>
					</Col>
					<Col span={3}>
						<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
							用户隔离：
						</div>
					</Col>
					<Col span={9}>
						<Badge status="success" text="ON" />
					</Col>
				</Row>
			</div>
		)
		return (
			<div>
				<Card 
					title="SSID设置" 
					bordered={true}
					style={{ width: '100%', marginTop: 24 }}
					extra={
						<Popconfirm placement="left" title="确认保存并生效吗？" onConfirm={this.onSaveSSID.bind(this)} okText="确认" cancelText="取消">
							<a href="#">保存并生效</a>
						</Popconfirm>
					}
				>
					<div style={{marginBottom: 24, display: 'flex', flex: 1}}>
						<div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
							<Button type="primary" onClick={this.onSsidEdit.bind(this)}>新增SSID</Button>
						</div>
						<div style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
							<Search
								placeholder="请输入搜索内容"
								onSearch={value => console.log(value)}
								enterButton
								style={{marginLeft: 10}}
							/>
							<div>
								<Select defaultValue="6" style={{width: 80}}>
									<Option value="6">6</Option>
									<Option value="15">15</Option>
									<Option value="30">30</Option>
									<Option value="50">50</Option>
								</Select>
							</div>
						</div>
					</div>
					<Table 
						dataSource={this.state.data}
						bordered={false}
						loading={this.state.isLoading}
						locale={{filterConfirm: '确认', filterReset: '清空', emptyText: '暂无数据'}}
						pagination={this.state.pagination}
						expandedRowRender={(record) => {
							return expandRowData;
						}}
					>
						<Column
							title="SSID名称"
							dataIndex="ssid"
							sorter={(a, b)=>{
								return (a.ssid.length - b.ssid.length);
							}}
						/>
						<Column
							title="无线信道"
							dataIndex="channel"
							sorter={(a, b)=>{
								return (a.channel.length - b.channel.length);
							}}
							render={(text, record, index)=>{
								return (record.ssidSwitch=="off")?'-':text
							}}
						/>
						<Column
							title="密码开关"
							dataIndex="pwd"
							sorter={(a, b)=>{
								return (a.pwd.length - b.pwd.length);
							}}
							render={(text, record, index)=>{
								if(record.ssidSwitch=="off"){
									return '-';
								}else{
									return (text=="on")?
									<Badge status="success" text="ON" />:
									<Badge status="error" text="OFF" />
								}
							}}
						/>
						<Column
							title="SSID显示"
							dataIndex="show"
							sorter={(a, b)=>{
								return (a.show.length - b.show.length);
							}}
							render={(text, record, index)=>{
								if(record.ssidSwitch=="off"){
									return '-';
								}else{
									return (text=="on")?
									<Badge status="success" text="ON" />:
									<Badge status="error" text="OFF" />
								}
							}}
						/>
						<Column
						title="操作"
						dataIndex="action"
						render={(text, record, index)=>{
							return <div>
								<a href="javascript:;" onClick={this.onSsidEdit.bind(this)}>修改</a>
								<Divider type="vertical" />
								<Popconfirm title="确认删除SSID吗？" okText="确认" cancelText="取消">
									<a href="javascript:;">删除</a>
								</Popconfirm>
							</div>
		}
	}
	/> < /
	Table > <
		/Card> < /
	div >
);
}
}

export default withRouter(ApSsidSetting);