import React from 'react';
import {
	Table,
	Icon,
	Divider,
	Button,
	Select,
	Input,
	Tooltip,
	Popconfirm,
	message
} from 'antd';
import { withRouter } from 'react-router';

// const 
const { Column, } = Table;
const data = [];
const Option = Select.Option;
const Search = Input.Search;

//
class ApSettingTable extends React.Component {
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
					name: '配置文件' + i,
					note: '备注' + i,
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
	onEdit(e) {
		this.props.history.push("/apConfig");
	}

	//
	onDelete(e) {
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 500)
	}

	//
	render() {
		return (
			<div>
				<div style={{marginTop: 16, marginBottom: 16, display: 'flex', flex: 1}}>
					<div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
						<Button type="primary" onClick={this.onEdit.bind(this)}>新增配置</Button>
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
						title="配置文件名称"
						dataIndex="name"
						sorter={(a, b)=>{
							return (a.name.length - b.name.length);
						}}
					/>
					<Column
						title="备注"
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
						title="末次修改时间"
						dataIndex="updateTime"
						sorter={(a, b)=>{
							return (a.updateTime.length - b.updateTime.length);
						}}
					/>
					<Column
						title="操作"
						dataIndex="action"
						render={(text, record, index)=>{
							return <div>
								<a href="javascript:;" onClick={this.onEdit.bind(this)}>修改</a>
								<Divider type="vertical" />
								<Popconfirm title="确认删除此配置文件吗？"
									okText="确认"
									cancelText="取消"
									onConfirm={this.onDelete.bind(this)}
								>
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

export default withRouter(ApSettingTable);