import React from 'react';
import {
	Table,
	Icon,
	Divider,
	Button,
	Select,
	Input,
	message,
	Modal,
	Popconfirm
} from 'antd';
import { withRouter } from 'react-router';

// const 
const { Column, } = Table;
const data = [];
const Option = Select.Option;
const Search = Input.Search;

//
class DevGroupTable extends React.Component {
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
			dlgTitle: '',
			dlgLoading: false,
		}
	}

	//
	componentDidMount() {
		this.setState({ isLoading: true, });
		setTimeout(() => {
			for (let i = 0; i < 100; i++) {
				data.push({
					key: i.toString(),
					name: '分组' + i,
					note: '说明' + i,
					devNumber: i,
					regTime: '2017-01-30 15:12:1' + (i % 9),
					updateTime: '2017-01-31 01:01:2' + (i % 9),
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
	onDevDetail(e) {
		this.props.history.push("/apManage");
	}

	//
	onAddGroup(e) {
		this.setState({ dlgVisible: true, dlgTitle: '新增分组' });
	}

	//
	onEditGroup(e) {
		this.setState({ dlgVisible: true, dlgTitle: '修改分组' });
	}

	//
	onDlgConfirm(e) {
		this.setState({ dlgLoading: true });
		setTimeout(() => {
			this.setState({ dlgVisible: false, dlgLoading: false });
			message.success(this.state.dlgTitle + "成功");
		}, 500)

	}

	//
	onDlgCancel(e) {
		this.setState({ dlgVisible: false });
	}

	//
	onDelGroup(e) {
		message.success("删除分组成功");
	}

	//
	render() {
		return (
			<div>
				<div style={{marginTop: 16, marginBottom: 16, display: 'flex', flex: 1}}>
					<div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
						<Button type="primary" onClick={this.onAddGroup.bind(this)}>新增分组</Button>
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
					visible={this.state.dlgVisible}
					title={this.state.dlgTitle}
					onOk={this.onDlgConfirm.bind(this)}
					onCancel={this.onDlgCancel.bind(this)}
					cancelText="取消"
					okText="确认"
					confirmLoading={this.state.dlgLoading}
					// destroyOnClose={true}
				>
					<Input placeholder="分组名称"
						style={{marginBottom: 16}}
					/>
					<Input placeholder="分组备注"
					/>
				</Modal>
				<Table dataSource={this.state.data}
					bordered={true}
					loading={this.state.isLoading}
					locale={{filterConfirm: '确认', filterReset: '清空', emptyText: '暂无数据'}}
					pagination={this.state.pagination}
				>
					<Column
						title="分组名称"
						dataIndex="name"
						sorter={(a, b)=>{
							return (a.name.length - b.name.length);
						}}
					/>
					<Column
						title="已关联设备数"
						dataIndex="devNumber"
						sorter={(a, b)=>{
							return (a.devNumber.length - b.devNumber.length);
						}}
						render={(text, record, index)=>{
							return <a href="javascript:;" onClick={this.onDevDetail.bind(this)}>{text}</a>
						}}
					/>
					<Column
						title="分组说明"
						dataIndex="note"
						sorter={(a, b)=>{
							return (a.note.length - b.note.length);
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
								<a href="javascript:;" onClick={this.onEditGroup.bind(this)}>修改</a>
								<Divider type="vertical" />
								<Popconfirm title="确认删除此分组吗？" onConfirm={this.onDelGroup.bind(this)}
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

export default withRouter(DevGroupTable);