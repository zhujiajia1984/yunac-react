import React from 'react';
import {
	Table,
	Icon,
	Divider,
	Button,
	Select,
	Input,
	Tooltip
} from 'antd';
import { withRouter } from 'react-router';
import EditableTableCell from '../components/EditableTableCell';

// const 
const { Column, } = Table;
const data = [];
const Option = Select.Option;
const Search = Input.Search;

//
class SubClientTable extends React.Component {
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
					name: '客户' + i,
					note: '全称' + i,
					regTime: '2017-01-30 15:12:1' + (i % 9),
					role: '角色' + (i % 2),
					accountNum: i,
					devNum: i,
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
	onSubAccount() {
		this.props.history.push('/subAccount');
	}

	//
	render() {
		return (
			<div>
				<div style={{marginTop: 16, marginBottom: 16, display: 'flex', flex: 1}}>
					<div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
						<Button type="primary">新增客户</Button>
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
				<Table dataSource={this.state.data}
					bordered={true}
					loading={this.state.isLoading}
					locale={{filterConfirm: '确认', filterReset: '清空', emptyText: '暂无数据'}}
					pagination={this.state.pagination}
				>
					<Column
						title="客户简称"
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
						title="客户全称"
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
						title="所属角色"
						dataIndex="role"
						sorter={(a, b)=>{
							return (a.role.length - b.role.length);
						}}
						filters={[{
								text: '角色0',
								value: '角色0'
							}, {
								text: '角色1',
								value: '角色1'
							}
						]}
					/>
					<Column
						title="账号数量"
						dataIndex="accountNum"
						sorter={(a, b)=>{
							return (a.accountNum.length - b.accountNum.length);
						}}
					/>
					<Column
						title="设备数量"
						dataIndex="devNum"
						sorter={(a, b)=>{
							return (a.devNum.length - b.devNum.length);
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
								<a href="javascript:;" onClick={this.onSubAccount.bind(this)}>下级账号管理</a>
								<Divider type="vertical" />
								<a href="javascript:;">删除</a>
							</div>
		}
	}
	/> < /
	Table > <
		/div>
);
}
}

export default withRouter(SubClientTable);