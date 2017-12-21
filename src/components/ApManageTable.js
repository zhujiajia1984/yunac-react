import React from 'react';
import {
	Table,
	Icon,
	Divider,
	Badge,
	Menu,
	Dropdown,
	Popconfirm,
	message,
	Modal,
	Button
} from 'antd';
import { withRouter } from 'react-router';

// const
const { Column, } = Table;
const MenuItem = Menu.Item;
var data = [];


//
class ApManageTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			data: data,
			selectedRowKeys: [],
			updateDlgVisible: false,
			updateLoading: false
		}
	}

	//
	componentDidMount() {
		this.setState({ isLoading: true });
		setTimeout(() => {
			data = [{
				key: '1',
				devName: 'XIN-58-六接口',
				devGroup: 'Brown',
				devStatus: 'Online',
				regTime: '2017-01-30 15:12:12',
			}, {
				key: '2',
				devName: '财务GNBE',
				devGroup: 'Green',
				devStatus: 'Online',
				regTime: '2017-01-02 15:12:12',
			}, {
				key: '3',
				devName: '办公楼一楼会议室',
				devGroup: 'Black',
				devStatus: 'Offline',
				regTime: '2017-01-02 15:12:12',
			}];
			this.setState({ isLoading: false, data: data });
		}, 2000)
	}

	//
	onRefresh(record, values) {
		switch (values.key) {
			case "refresh":
				this.setState({ isLoading: true });
				setTimeout(() => {
					this.setState({ isLoading: false });
				}, 1000)
				break;
			case "update":
				this.setState({ isLoading: true });
				setTimeout(() => {
					this.setState({ isLoading: false, updateDlgVisible: true });
				}, 500)
				break;
			default:
				// alert("menu unknow");
				break;
		}
	}

	//
	onReboot(record) {
		console.log(record);
		this.setState({ isLoading: true });
		setTimeout(() => {
			message.success('已成功发送重启指令');
			this.setState({ isLoading: false });
		}, 1000)
	}

	//
	onSelectChange(selected) {
		this.setState({ selectedRowKeys: selected });
	}

	//
	updateConfirm() {
		this.setState({ updateLoading: true });
		setTimeout(() => {
			message.success('已成功发送固件升级指令');
			this.setState({ updateDlgVisible: false, updateLoading: false });
		}, 2000)
	}

	updateCancel() {
		this.setState({ updateDlgVisible: false });
	}

	//
	render() {
		const selectedRowKeys = this.state.selectedRowKeys;
		return (
			<div style={{paddingLeft: 24, paddingRight: 24}}>
				<Modal
					visible={this.state.updateDlgVisible}
					title="固件升级"
					onOk={this.updateConfirm.bind(this)}
					onCancel={this.updateCancel.bind(this)}
					footer={[
						<Button key="back" onClick={this.updateCancel.bind(this)}>取消</Button>,
						<Button key="submit" 
							type="primary"
							loading={this.state.updateLoading}
							onClick={this.updateConfirm.bind(this)}
						>立即重启
						</Button>
					]}
				>
					<p>abc</p>
					<p>def</p>
				</Modal>
				<Table
					bordered={true}
					dataSource={data}
					loading={this.state.isLoading}
					rowSelection={{
						selectedRowKeys,
						onChange: this.onSelectChange.bind(this),
					}}
				>
					<Column
						title="设备名称"
						dataIndex="devName"
						sorter={(a, b)=>{
							return (a.devName.length - b.devName.length)
						}}
					/>
					<Column
						title="设备分组"
						dataIndex="devGroup"
						sorter={(a, b)=>{
							return (a.devName.length - b.devName.length)
						}}
					/>
					<Column
						title="在线状态"
						dataIndex="devStatus"
						filters={[{
							text: '在线',
							value: 'Online'
						},{
							text: '离线',
							value: 'Offline'
						}]}
						filterMultiple = {false}
						onFilter = {(value, record)=>{
							return record.devStatus.includes(value);
						}}
						render={(text, record, index)=>{
							switch(text){
								case "Online":
									return  <Badge status="success" text="在线" />
								case "Offline":
									return <Badge status="error" text="离线" />
								default:
									return "未知";
							}
						}}
					/>
					<Column
						title="注册时间"
						dataIndex="regTime"
						sorter={(a, b)=>{
							return (a.devName.length - b.devName.length)
						}}
					/>
					<Column
						title="操作"
						dataIndex="action"
						render={(text, record, index)=>{
							return <div>
										<a href="javascript:;">配置</a>
										<Divider type="vertical" />
										<Dropdown overlay={
											<Menu onClick={this.onRefresh.bind(this, record)}>
												<MenuItem key="refresh">
													<Icon type="sync" />
													<a style={{marginLeft: 1, display:'inline-block'}}>同步数据</a>
												</MenuItem>
												<MenuItem key="reboot">
													<Icon type="reload" />
													<Popconfirm title="确认重启该设备吗？" 
														okText="立即重启" 
														cancelText="取消"
														onConfirm={this.onReboot.bind(this, record)}
													>
														<a style={{marginLeft: 1, display:'inline-block'}}>远程重启</a>
													</Popconfirm>
												</MenuItem>
												<MenuItem key="update">
													<Icon type="up-circle-o" />
													<a style={{marginLeft: 1, display:'inline-block'}}>固件升级</a>
												</MenuItem>
												<Menu.Divider />
											</Menu>
										} trigger={['click']}
										>
											<a href="javascript:;">更多<Icon type="down" /></a>
										</Dropdown>
									</div>
		}
	}
	/> < /
	Table > <
		/div>
);
}
}

export default withRouter(ApManageTable);