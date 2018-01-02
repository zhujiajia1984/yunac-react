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
	Button,
	Checkbox,
	Alert,
	Select,
	Row,
	Col,
} from 'antd';
import { withRouter } from 'react-router';
import EditableTableCell from '../components/EditableTableCell';

// const
// const Column = Table;
// const CheckboxGroup = Checkbox.Group;
const MenuItem = Menu.Item;
const Option = Select.Option;
var data = [];
const devNameCol = {
	title: "设备名称",
	dataIndex: "devName",
	sorter: (a, b) => {
		return (a.devName.length - b.devName.length);
	}
}
const devMacCol = {
	title: "设备MAC",
	dataIndex: "devMac",
	sorter: (a, b) => {
		return (a.devMac.length - b.devMac.length);
	}
}

//
class ApManageTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			data: data,
			selectedRowKeys: [],
			updateDlgVisible: false,
			updateLoading: false,
			pagination: {
				defaultCurrent: 1,
				defaultPageSize: 6,
				pageSize: 6,
			},
			columns: [],
			colMenuVisible: false,
			devNameVisible: true,
			devMacVisible: false,
			isShowAlert: false,
			selectCount: 0,
			modalTitle: '',
			confirmMsg: '',
			isModalSelOption: true,
			modalContent: ''
		}
	}

	//
	onSaveDevName(name) {
		// alert(name);
		// fetch上传数据
	}

	//
	componentDidMount() {
		//
		let columns = [{
			title: "设备名称",
			dataIndex: "devName",
			sorter: (a, b) => {
				return (a.devName.length - b.devName.length);
			},
			render: (text, record, index) => {
				return <EditableTableCell
							type="input"
							value={text}
							onSaveText={this.onSaveDevName.bind(this)}
				></EditableTableCell>
			},
		}, {
			title: "设备分组",
			dataIndex: "devGroup",
			sorter: (a, b) => {
				return (a.devGroup.length - b.devGroup.length);
			},
			filters: [{
				text: 'Brown',
				value: 'Brown'
			}, {
				text: 'Green',
				value: 'Green'
			}],
			filterMultiple: true,
			onFilter: (value, record) => {
				return record.devGroup.includes(value);
			},
			render: (text, record, index) => {
				return <EditableTableCell
							type="select"
							value={text}
							onSaveText={this.onSaveDevName.bind(this)}
				></EditableTableCell>
			},
		}, {
			title: "设备型号",
			dataIndex: "devType",
			sorter: (a, b) => {
				return (a.devType.length - b.devType.length);
			},
			render: (text, record, index) => {
				return <EditableTableCell
							type="select"
							value={text}
							onSaveText={this.onSaveDevName.bind(this)}
				></EditableTableCell>
			},
		}, {
			title: "所属客户",
			dataIndex: "clientName",
			sorter: (a, b) => {
				return (a.clientName.length - b.clientName.length);
			}
		}, {
			title: "在线状态",
			dataIndex: "devStatus",
			filters: [{
				text: '在线',
				value: 'Online'
			}, {
				text: '离线',
				value: 'Offline'
			}],
			filterMultiple: false,
			onFilter: (value, record) => {
				return record.devStatus.includes(value);
			},
			render: (text, record, index) => {
				switch (text) {
					case "Online":
						return <Badge status="success" text="在线" />
					case "Offline":
						return <Badge status="error" text="离线" />
					default:
						return "未知";
				}
			},
		}, {
			title: "注册时间",
			dataIndex: "regTime",
			sorter: (a, b) => {
				return (a.regTime.length - b.regTime.length);
			}
		}, {
			title: "操作",
			dataIndex: "action",
			render: (text, record, index) => {
				return <div>
					<a href="javascript:;">监控</a>
					<Divider type="vertical" />
					<Dropdown overlay={
						<Menu onClick={this.onRefresh.bind(this, record)}>
							<MenuItem key="refresh">
								<a style={{marginLeft: 1, display:'inline-block'}}>同步数据</a>
							</MenuItem>
							<MenuItem key="devSetting">
								<a style={{marginLeft: 1, marginRight: 1, display:'inline-block'}}>远程配置</a>
							</MenuItem>
							<MenuItem key="reboot">
								<a style={{marginLeft: 1, marginRight: 1, display:'inline-block'}}>远程重启</a>
							</MenuItem>
							<MenuItem key="update">
								<a style={{marginLeft: 1,  marginRight: 1, display:'inline-block'}}>固件升级</a>
							</MenuItem>
							<Menu.Divider />
							<MenuItem key="deleteDev">
								<a style={{marginLeft: 1, marginRight: 1, display:'inline-block'}}>删除设备</a>
							</MenuItem>
						</Menu>
					} trigger={['click']}
					>
						<a href="javascript:;">更多<Icon type="down" /></a>
					</Dropdown>
				</div>
			}
		}, ]

		//
		this.setState({ isLoading: true, columns: columns, data: [] });
		const devNames = ['XIN-58-六接口', '财务GNBE', '办公楼一楼会议室'];
		const devGroups = ['Brown', 'Green', 'Black'];
		const devStatusArray = ['Online', 'Offline'];
		setTimeout(() => {
			for (let i = 0; i < 100; i++) {
				data.push({
					key: i.toString(),
					devName: devNames[i % 3],
					devGroup: devGroups[i % 3],
					devStatus: devStatusArray[i % 2],
					regTime: '2017-01-30 15:12:1' + (i % 9),
					clientName: '测试' + i,
					devMac: 'ef:01:02:ed:33:4' + (i % 10),
					devType: 'DB6000-W2'
				})
			}
			this.setState({ isLoading: false, data: data });
		}, 500)
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
					this.setState({
						isLoading: false,
						updateDlgVisible: true,
						modalTitle: '固件升级',
						confirmMsg: '已成功下发固件升级指令',
						isModalSelOption: true,
					});
				}, 500)
				break;
			case "reboot":
				this.setState({ isLoading: true });
				setTimeout(() => {
					this.setState({
						isLoading: false,
						updateDlgVisible: true,
						modalTitle: '远程重启',
						confirmMsg: '已成功下发远程重启指令',
						isModalSelOption: false,
						modalContent: '确认要重启选中的设备吗？'
					});
				}, 500)
				break;
			case "deleteDev":
				this.setState({ isLoading: true });
				setTimeout(() => {
					this.setState({
						isLoading: false,
						updateDlgVisible: true,
						modalTitle: '删除设备',
						confirmMsg: '已成功删除设备',
						isModalSelOption: false,
						modalContent: '确认删除选中的设备吗？'
					});
				}, 500)
				break;
			default:
				// alert("menu unknow");
				break;
		}
	}

	//
	onMutiOperate(values) {
		switch (values.key) {
			case "reboot":
				this.setState({ isLoading: true });
				setTimeout(() => {
					this.setState({
						isLoading: false,
						updateDlgVisible: true,
						modalTitle: '远程重启',
						confirmMsg: '已成功下发远程重启指令',
						isModalSelOption: false,
						modalContent: '确认要重启选中的设备吗？'
					});
				}, 500)
				break;
			case "update":
				this.setState({ isLoading: true });
				setTimeout(() => {
					this.setState({
						isLoading: false,
						updateDlgVisible: true,
						modalTitle: '固件升级',
						confirmMsg: '已成功下发固件升级指令',
						isModalSelOption: true,
					});
				}, 500)
				break;
			case "moveGroup":
				this.setState({ isLoading: true });
				setTimeout(() => {
					this.setState({
						isLoading: false,
						updateDlgVisible: true,
						modalTitle: '修改分组',
						confirmMsg: '已成功修改分组',
						isModalSelOption: true,
					});
				}, 500)
				break;
			case "moveClient":
				this.setState({ isLoading: true });
				setTimeout(() => {
					this.setState({
						isLoading: false,
						updateDlgVisible: true,
						modalTitle: '修改所属客户',
						confirmMsg: '已成功修改所属客户',
						isModalSelOption: true,
					});
				}, 500)
				break;
			case "deleteDev":
				this.setState({ isLoading: true });
				setTimeout(() => {
					this.setState({
						isLoading: false,
						updateDlgVisible: true,
						modalTitle: '删除设备',
						confirmMsg: '已成功删除设备',
						isModalSelOption: false,
						modalContent: '确认删除选中的设备吗？'
					});
				}, 500)
				break;
			default:
				this.setState({ isLoading: true });
				setTimeout(() => {
					this.setState({ isLoading: false, updateDlgVisible: true });
				}, 500)
				break;
		}
	}

	// 
	onChangeDevName(name, e) {
		let columns = this.state.columns;
		let newColumns = [];
		switch (name) {
			case "devName":
				if (e.target.checked) {
					newColumns = columns;
					newColumns.unshift(devNameCol);
				} else {
					for (let i = 0; i < columns.length; i++) {
						if (columns[i].dataIndex != "devName") {
							newColumns.push(columns[i]);
						}
					}
				}
				this.setState({ devNameVisible: e.target.checked, columns: newColumns });
				break;
			case "devMac":
				if (e.target.checked) {
					newColumns = columns;
					newColumns.unshift(devMacCol);
				} else {
					for (let i = 0; i < columns.length; i++) {
						if (columns[i].dataIndex != "devMac") {
							newColumns.push(columns[i]);
						}
					}
				}
				this.setState({ devMacVisible: e.target.checked, columns: newColumns });
				break;
		}

	}

	//
	onVisibleChange(flag) {
		if (flag) {
			this.setState({ colMenuVisible: flag });
		}
	}

	//
	onColVisible(e) {
		if (e.key === "confirm") {
			this.setState({ colMenuVisible: false });
		}
	}

	//
	onReboot(record) {
		// console.log(record);
		this.setState({ isLoading: true });
		setTimeout(() => {
			message.success('已成功发送重启指令');
			this.setState({ isLoading: false });
		}, 1000)
	}

	//
	onDeleteDev() {
		this.setState({ isLoading: true });
		setTimeout(() => {
			message.success('已成功删除此设备');
			this.setState({ isLoading: false });
		}, 1000)
	}

	//
	onSelectChange(selected) {
		if (selected.length == 0) {
			this.setState({
				selectedRowKeys: selected,
				isShowAlert: false
			});
		} else {
			this.setState({
				selectedRowKeys: selected,
				isShowAlert: true,
				selectCount: selected.length
			});
		}

	}

	//
	updateConfirm() {
		this.setState({ updateLoading: true });
		setTimeout(() => {
			message.success(this.state.confirmMsg);
			this.setState({ updateDlgVisible: false, updateLoading: false });
		}, 500)
	}

	updateCancel() {
		this.setState({ updateDlgVisible: false });
	}

	//
	onTableChange(pagination, filters, sorter) {
		// console.log(pagination);
		// console.log(filters);
		// console.log(sorter);
	}

	//
	selectAll(e) {
		e.preventDefault();
		let keys = [];
		for (let i = 0; i < this.state.data.length; i++) {
			keys.push(this.state.data[i].key);
		}
		this.setState({
			selectedRowKeys: keys,
			selectCount: this.state.data.length
		});
	}

	//
	clearSel(e) {
		e.preventDefault();
		this.setState({
			selectedRowKeys: [],
			selectCount: 0,
			isShowAlert: false,
		});
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
	onSelectSetting() {
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.setState({
				isLoading: false,
				updateDlgVisible: true,
				modalTitle: '下发配置',
				confirmMsg: '已成功下发配置',
				isModalSelOption: true,
			});
		}, 500)
	}

	//
	render() {
		const selectedRowKeys = this.state.selectedRowKeys;
		const selMessage1 = (
			<div>
					<span style={{marginRight: 10}}>已选择{this.state.selectCount}项</span>
					<a href="javascript:;" onClick={this.clearSel.bind(this)} style={{marginRight: 10}}>清空</a>
					<a href="javascript:;" onClick={this.selectAll.bind(this)}>全选</a>
				</div>
		);
		const expandRowData = (
			<div style={{fontSize: 14}}>
					<Row gutter={16} style={{marginBottom: 10}}>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								SSID名称：
							</div>
						</Col>
						<Col span={6}>
							<span>测试1</span>
							<span>，</span>
							<span>测试2</span>
						</Col>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								设备定位：
							</div>
						</Col>
						<Col span={6}>
							<span>121.1234(经度)，</span>
							<span style={{marginRight: 5}}>23.123(纬度)</span>
							<a href="javascript:;">地图</a>
						</Col>
					</Row>
					<Row gutter={16} style={{marginBottom: 10}}>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								末次离线时间：
							</div>
						</Col>
						<Col span={6}>
							<div>2017-12-22 12:12:12</div>
						</Col>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								运行时长：
							</div>
						</Col>
						<Col span={6}>
							<div>0天0小时12分钟23秒</div>
						</Col>
					</Row>
					<Row gutter={16} style={{marginBottom: 10}}>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								WAN口IP：
							</div>
						</Col>
						<Col span={6}>
							<div>10.10.12.12</div>
						</Col>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								LAN口IP：
							</div>
						</Col>
						<Col span={6}>
							<div>192.168.12.12</div>
						</Col>
					</Row>
					<Row gutter={16} style={{marginBottom: 10}}>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								运行信道：
							</div>
						</Col>
						<Col span={6}>
							<span>11(2.4G)，</span>
							<span>151(5.8G)</span>
						</Col>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								运行模式：
							</div>
						</Col>
						<Col span={6}>
							<div>AP</div>
						</Col>
					</Row>
					<Row gutter={16} style={{marginBottom: 10}}>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								连接终端数：
							</div>
						</Col>
						<Col span={6}>
							<span>4(2.4G)，</span>
							<span>2(5.8G)</span>
						</Col>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								末次修改时间：
							</div>
						</Col>
						<Col span={6}>
							<div>2017-01-30</div>
						</Col>
					</Row>
				</div>
		)
		return (
			<div>
				<div style={{marginBottom: 16, display: 'flex', flex: 1}}>
					<div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
						<Button 
							type="primary"
							disabled = {this.state.selectedRowKeys.length == 0}
							onClick = {this.onSelectSetting.bind(this)}
						>下发配置</Button>
						<Dropdown.Button 
							overlay={
								<Menu onClick={this.onMutiOperate.bind(this)}>
									<MenuItem key="reboot">
										<a style={{marginLeft: 1,  marginRight: 1, display:'inline-block'}}>远程重启</a>
									</MenuItem>
									<MenuItem key="update">
										<a style={{marginLeft: 1,  marginRight: 1, display:'inline-block'}}>固件升级</a>
									</MenuItem>
									<Menu.Divider />
									<MenuItem key="moveGroup">
										<a style={{marginLeft: 1,  marginRight: 1, display:'inline-block'}}>修改分组</a>
									</MenuItem>
									<MenuItem key="moveClient">
										<a style={{marginLeft: 1,  marginRight: 1, display:'inline-block'}}>修改客户</a>
									</MenuItem>
									<MenuItem key="deleteDev">
										<a style={{marginLeft: 1,  marginRight: 1, display:'inline-block'}}>删除设备</a>
									</MenuItem>
								</Menu>
							}
							style={{ marginLeft: 8 }}
							disabled={this.state.selectedRowKeys.length == 0}
							trigger={['click']}
						>更多功能
						</Dropdown.Button>
						<div style={{marginLeft: 16, fontSize: 12}}>
							<span>设备总数：</span><span style={{marginRight: 16}}>103</span>
							<span>在线数量：</span><span style={{marginRight: 16}}>100</span>
							<span>离线数量：</span><span style={{marginRight: 16}}>3</span>
						</div>
					</div>
					<div style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
						<div>
							<Select defaultValue="6" onChange={this.onChangePageSize.bind(this)} style={{width: 80}}>
								<Option value="6">6</Option>
								<Option value="15">15</Option>
								<Option value="30">30</Option>
								<Option value="50">50</Option>
							</Select>
						</div>
						<div>
							<Dropdown overlay={
								<Menu onClick={this.onColVisible.bind(this)}>
									<MenuItem key="devMac">
										<Checkbox
											checked={this.state.devMacVisible}
											onChange={this.onChangeDevName.bind(this, "devMac")}
										>设备MAC</Checkbox>
									</MenuItem>
									<MenuItem key="devName">
										<Checkbox 
											checked={this.state.devNameVisible}
											onChange={this.onChangeDevName.bind(this, "devName")}
										>设备名称</Checkbox>
									</MenuItem>
									<MenuItem key="devType">
										<Checkbox checked>设备型号</Checkbox>
									</MenuItem>
									<MenuItem key="devGroup">
										<Checkbox checked>设备分组</Checkbox>
									</MenuItem>
									<MenuItem key="devClient">
										<Checkbox checked>所属客户</Checkbox>
									</MenuItem>
									<MenuItem key="devStatus">
										<Checkbox checked>在线状态</Checkbox>
									</MenuItem>
									<MenuItem key="devVersion">
										<Checkbox>固件版本</Checkbox>
									</MenuItem>
									<MenuItem key="devRegTime">
										<Checkbox checked>注册时间</Checkbox>
									</MenuItem>
									<MenuItem key="devOperation">
										<Checkbox checked>操作</Checkbox>
									</MenuItem>
									<Menu.Divider />
									<MenuItem key="confirm">
										<a style={{display: 'flex', justifyContent: 'center'}}>确认</a>
									</MenuItem>
								</Menu>
								}
								// visible={this.state.colMenuVisible}
								// onVisibleChange={this.onVisibleChange.bind(this)}
								trigger={['click']}
							>
								<Button style={{ marginRight: 8 }}><Icon type="appstore" />自定义列</Button>
							</Dropdown>
						</div>
					</div>
				</div>
				<Modal
					visible={this.state.updateDlgVisible}
					title={this.state.modalTitle}
					onOk={this.updateConfirm.bind(this)}
					onCancel={this.updateCancel.bind(this)}
					footer={[
						<Button key="back" onClick={this.updateCancel.bind(this)}>取消</Button>,
						<Button key="submit" 
							type="primary"
							loading={this.state.updateLoading}
							onClick={this.updateConfirm.bind(this)}
						>确认
						</Button>
					]}
				>
					{
						(this.state.isModalSelOption)?
						<Select defaultValue="lucy" style={{ width: '100%' }} >
							<Option value="jack">选项1</Option>
							<Option value="lucy">选项2</Option>
						</Select>:
						<span>{this.state.modalContent}</span>
					}
				</Modal>
				{
					(this.state.isShowAlert)?
					<Alert 
						message={selMessage1}
						type="info"
						showIcon
						style={{marginBottom: 16}}
					/>:""
				}
				<Table
					columns={this.state.columns}
					bordered={true}
					dataSource={this.state.data}
					loading={this.state.isLoading}
					expandedRowRender={(record) => {
						return expandRowData;
					}}
					rowSelection={{
						selectedRowKeys,
						onChange: this.onSelectChange.bind(this),
					}}
					pagination={this.state.pagination}
					onChange={this.onTableChange.bind(this)}
					locale={{filterConfirm: '确认', filterReset: '清空', emptyText: '暂无数据'}}
				></Table>
		</div>
		);
	}
}

export default withRouter(ApManageTable);