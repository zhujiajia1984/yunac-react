import React from 'react';
import {
	Table,
	Icon,
	Divider,
	Button,
	Select,
	Input,
	Tooltip,
	Row,
	Col,
} from 'antd';

// const 
const { Column, } = Table;
const data = [];
const Option = Select.Option;
const Search = Input.Search;

//
export default class ApUserMonitorTable extends React.Component {
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
		let radio = ['2.4G', '5.8G'];
		this.setState({ isLoading: true, });
		setTimeout(() => {
			for (let i = 0; i < 100; i++) {
				data.push({
					key: i.toString(),
					mac: 'ef:tt:dg:f1:1h:5' + i % 10,
					ssid: 'ssid' + i,
					signal: `-5${i%10}/-9${i%10}`,
					upTime: `${i%24}小时${i%60}分钟${i%60}秒`,
					radio: radio[i % 2],
				})
			}
			this.setState({ isLoading: false, data: data });
		}, 500)
	}

	//
	onChangePageSize(value) {
		let pagination = this.state.pagination;
		if (value == "all") {
			pagination.pageSize = this.state.data.length;
			this.setState({ pagination: pagination });
		} else {
			pagination.pageSize = parseInt(value);
			this.setState({ pagination: pagination });
		}
	}

	//
	render() {
		const expandRowData = (
			<div style={{fontSize: 14}}>
					<Row gutter={16} style={{marginBottom: 10}}>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								终端IP地址：
							</div>
						</Col>
						<Col span={6}>
							<span>192.168.1.111</span>
						</Col>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								终端品牌型号：
							</div>
						</Col>
						<Col span={6}>
							<span>华为p7</span>
						</Col>
					</Row>
					<Row gutter={16} style={{marginBottom: 10}}>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								无线信道：
							</div>
						</Col>
						<Col span={6}>
							<div>60</div>
						</Col>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								接受速率：
							</div>
						</Col>
						<Col span={6}>
							<div>6.0 Mbit/s, 20MHz</div>
						</Col>
					</Row>
					<Row gutter={16} style={{marginBottom: 10}}>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								发送速率：
							</div>
						</Col>
						<Col span={6}>
							<div>6.0 Mbit/s, 20MHz</div>
						</Col>
					</Row>
				</div>
		)
		return (
			<div>
				<div style={{marginTop: 16, marginBottom: 16, display: 'flex', flex: 1}}>
					<div style={{display: 'flex', alignItems: 'center'}}>
						<Search
							placeholder="请输入搜索内容"
							onSearch={value => console.log(value)}
							enterButton
						/>
					</div>
					<div style={{display: 'flex', flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
						<div>
							<Select defaultValue="6" onChange={this.onChangePageSize.bind(this)} style={{width: 80}}>
								<Option value="6">6</Option>
								<Option value="15">15</Option>
								<Option value="30">30</Option>
								<Option value="50">50</Option>
							</Select>
						</div>
					</div>
				</div>
				<Table dataSource={this.state.data}
					bordered={true}
					loading={this.state.isLoading}
					locale={{filterConfirm: '确认', filterReset: '清空', emptyText: '暂无数据'}}
					pagination={this.state.pagination}
					expandedRowRender={(record) => {
						return expandRowData;
					}}
				>
					<Column
						title="终端MAC地址"
						dataIndex="mac"
						sorter={(a, b)=>{
							return (a.mac.length - b.mac.length);
						}}
					/>
					<Column
						title="SSID名称"
						dataIndex="ssid"
						sorter={(a, b)=>{
							return (a.ssid.length - b.ssid.length);
						}}
					/>
					<Column
						title="连接频率"
						dataIndex="radio"
						sorter={(a, b)=>{
							return (a.radio.length - b.radio.length);
						}}
						filters={[{
								text: '2.4G',
								value: '2.4G'
							}, {
								text: '5.8G',
								value: '5.8G'
							}
						]}
						onFilter={(value, record)=>{
							return record.radio.includes(value);
						}}
					/>
					<Column
						title="信号强度/噪声(dbm)"
						dataIndex="signal"
						sorter={(a, b)=>{
							return (a.signal.length - b.signal.length);
						}}
					/>
					<Column
						title="连接时长"
						dataIndex="upTime"
						sorter={(a, b)=>{
							return (a.upTime.length - b.upTime.length);
						}}
					/>
				</Table>
			</div>
		);
	}
}