import React from 'react';
import {
	Table,
	Divider,
	Button,
	Select,
	Input,
	Popconfirm,
	message,
	Modal,
	Row,
	Col,
	Upload,
	Icon,
} from 'antd';
import EditableTableCell from '../components/EditableTableCell';

// const 
const { Column, } = Table;
const data = [];
const Option = Select.Option;
const Search = Input.Search;

//
export default class VersionTable extends React.Component {
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
			dlgVisible: false,
			dlgLoading: false,
		}
	}

	//
	componentDidMount() {
		let types = ['AP', '探针'];
		this.setState({ isLoading: true, });
		setTimeout(() => {
			for (let i = 0; i < 100; i++) {
				data.push({
					key: i.toString(),
					name: '版本' + i,
					type: types[i % 2],
					xinghao: 'DB6000-W' + (i % 2 + 2),
					regTime: '2017-01-30 15:12:1' + (i % 9),
					updateTime: '2017-01-31 01:01:2' + (i % 9),
					note: '备注' + i,
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
	onDelVersion(e) {
		message.success("删除固件成功");
	}

	//
	onDlgOk(e) {
		this.setState({ dlgLoading: true });
		setTimeout(() => {
			this.setState({ dlgLoading: false, dlgVisible: false });
			message.success("固件上传成功");
		}, 1000)
	}

	//
	onDlgCancel(e) {
		this.setState({ dlgVisible: false });
	}

	//
	onUpgradeVersion(e) {
		this.setState({ dlgVisible: true });
	}

	//
	render() {
		return (
			<div>
				<div style={{marginTop: 16, marginBottom: 16, display: 'flex', flex: 1}}>
					<div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
						<Button type="primary" onClick={this.onUpgradeVersion.bind(this)}>上传新固件</Button>
					</div>
					<div style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
						<Search
							placeholder="请输入搜索内容"
							onSearch={value => console.log(value)}
							enterButton
							style={{marginLeft: 10}}
						/>
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
				<Modal
					title="上传固件"
					visible={this.state.dlgVisible}
					onOk={this.onDlgOk.bind(this)}
					onCancel={this.onDlgCancel.bind(this)}
					cancelText="取消"
					okText="确认"
					destroyOnClose={true}
					confirmLoading={this.state.dlgLoading}
					maskClosable={false}
				>
					<Row gutter={16} style={{display: 'flex', alignItems: 'center'}}>
						<Col span={6} style={{textAlign: 'right'}}>
							<span>固件版本：</span>
						</Col>
						<Col span={14}>
							<Input />
						</Col>
					</Row>
					<Row gutter={16} style={{display: 'flex', alignItems: 'center', marginTop: 24}}>
						<Col span={6} style={{textAlign: 'right'}}>
							<span>固件类型：</span>
						</Col>
						<Col span={14}>
							<Select defaultValue="ap" style={{width: '100%'}}>
								<Option value="ap">AP</Option>
								<Option value="tz">探针</Option>
							</Select>
						</Col>
					</Row>
					<Row gutter={16} style={{display: 'flex', alignItems: 'center', marginTop: 24}}>
						<Col span={6} style={{textAlign: 'right'}}>
							<span>适配设备类型：</span>
						</Col>
						<Col span={14}>
							<Select defaultValue="ap" style={{width: '100%'}}>
								<Option value="ap">DB6000-GAC</Option>
								<Option value="tz">DB6000-GAC2</Option>
							</Select>
						</Col>
					</Row>
					<Row gutter={16} style={{display: 'flex', alignItems: 'center', marginTop: 24}}>
						<Col span={6} style={{textAlign: 'right'}}>
							<span>上传固件：</span>
						</Col>
						<Col span={14}>
							<Upload
								name='version123'
								accept='.png'
								action='/abc'
							>
								<Button><Icon type="upload" />点击上传</Button>
							</Upload>
						</Col>
					</Row>
					<Row gutter={16} style={{display: 'flex', alignItems: 'center', marginTop: 24}}>
						<Col span={6} style={{textAlign: 'right'}}>
							<span>备注：</span>
						</Col>
						<Col span={14}>
							<Input />
						</Col>
					</Row>
				</Modal>
				<Table dataSource={this.state.data}
					bordered={true}
					loading={this.state.isLoading}
					locale={{filterConfirm: '确认', filterReset: '清空', emptyText: '暂无数据'}}
					pagination={this.state.pagination}
				>
					<Column
						title="固件版本"
						dataIndex="name"
						sorter={(a, b)=>{
							return (a.name.length - b.name.length);
						}}
						render={(text, record, index)=>{
							return <EditableTableCell
								type="input"
								value={text}
							></EditableTableCell>
						}}
					/>
					<Column
						title="固件类型"
						dataIndex="type"
						sorter={(a, b)=>{
							return (a.type.length - b.type.length);
						}}
						filters={[{
							text: 'AP',
							value: 'AP'
						}, {
							text: '探针',
							value: '探针'
						}]}
						onFilter={(value, record)=>{
							return record.type.includes(value);
						}}
					/>
					<Column
						title="适配设备类型"
						dataIndex="xinghao"
						sorter={(a, b)=>{
							return (a.xinghao.length - b.xinghao.length);
						}}
						filters={[{
							text: 'DB6000-W2',
							value: 'DB6000-W2'
						}, {
							text: 'DB6000-W3',
							value: 'DB6000-W3'
						}]}
						onFilter={(value, record)=>{
							return record.xinghao.includes(value);
						}}
					/>
					<Column
						title="备注"
						dataIndex="note"
						sorter={(a, b)=>{
							return (a.note.length - b.note.length);
						}}
						render={(text, record, index)=>{
							return <EditableTableCell
								type="input"
								value={text}
							></EditableTableCell>
						}}
					/>
					<Column
						title="创建时间"
						dataIndex="regTime"
						sorter={(a, b)=>{
							return (a.regTime.length - b.regTime.length);
						}}
					/>
					<Column
						title="操作"
						dataIndex="action"
						render={(text, record, index)=>{
							return <div>
								<Popconfirm title="确认下载此固件版本吗？" okText="确认" cancelText="取消">
									<a href="javascript:;">下载</a>
								</Popconfirm>
								<Divider type="vertical" />
								<Popconfirm title="确认删除此固件版本吗？" onConfirm={this.onDelVersion.bind(this)}
									okText="确认" cancelText="取消">
									<a href="javascript:;">删除</a>
								</Popconfirm>
							</div>
		}
	}
	/> < /
	Table > <
		/div>
);
}
}