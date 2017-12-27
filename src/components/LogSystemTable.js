import React from 'react';
import {
	Table,
	Icon,
	Divider,
	Button,
	Select,
	Input,
	Tooltip,
	Badge,
	Row,
	Col
} from 'antd';
import EditableTableCell from '../components/EditableTableCell';

// const 
const { Column, } = Table;
const data = [];
const Option = Select.Option;
const Search = Input.Search;
const types = ['系统登录', '退出系统', '重置密码', '修改密码', '微信绑定',
	'微信解绑', '新增型号', '修改型号', '删除型号', '新增配置文件', '修改配置文件',
	'删除配置文件', '新增分组', '修改分组', '删除分组', '新增固件版本',
	'删除固件版本', '新增固件型号', '删除固件型号'
];
const filterArr = [];
types.map((item) => { return filterArr.push({ text: item, value: item }) });
const statusArr = ['成功', '失败'];
const expandRowData = (
	<div style={{fontSize: 14}}>
		<Row gutter={16} style={{marginBottom: 10}}>
			<Col span={6}>
				<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
					IP地址：
				</div>
			</Col>
			<Col span={6}>
				<span>10.10.10.10</span>
			</Col>
			<Col span={6}>
				<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
					区域：
				</div>
			</Col>
			<Col span={6}>
				<span>上海</span>
			</Col>
		</Row>
		<Row gutter={16} style={{marginBottom: 10}}>
			<Col span={6}>
				<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
					使用者名称：
				</div>
			</Col>
			<Col span={6}>
				<div>测试123</div>
			</Col>
			<Col span={6}>
				<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
					系统备注：
				</div>
			</Col>
			<Col span={6}>
				<div>微信登录/密码错误/未开通账号...</div>
			</Col>
		</Row>
	</div>
);
const defaultExpandRow = (
	<div style={{fontSize: 14}}>
		<Row gutter={16} style={{marginBottom: 10}}>
			<Col span={6}>
				<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
					使用者名称：
				</div>
			</Col>
			<Col span={6}>
				<span>测试123</span>
			</Col>
			<Col span={6}>
				<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
					系统备注：
				</div>
			</Col>
			<Col span={6}>
				<span>-/密码错误/未开通账号...</span>
			</Col>
		</Row>
	</div>
)

//
export default class LogSystemTable extends React.Component {
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
		let areas = ['上海', '广东', '江苏', '北京'];
		this.setState({ isLoading: true, });
		setTimeout(() => {
			for (let i = 0; i < 100; i++) {
				data.push({
					key: i.toString(),
					name: '1352222111' + (i % 10),
					type: types[i % 19],
					note: '备注' + i,
					status: statusArr[i % 2],
					regTime: '2017-01-30 15:12:1' + (i % 9),
					area: areas[i % 4],
					client: '客户' + i,
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
		return (
			<div>
				<div style={{marginTop: 16, marginBottom: 16, display: 'flex', flex: 1}}>
					<div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
						<div style={{fontSize: 14}}>
							<span>系统日志总数：</span><span style={{marginRight: 16}}>103</span>
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
					</div>
				</div>
				<Table dataSource={this.state.data}
					bordered={true}
					loading={this.state.isLoading}
					locale={{filterConfirm: '确认', filterReset: '清空', emptyText: '暂无数据'}}
					pagination={this.state.pagination}
					expandedRowRender={(record) => {
						if(record.type == types[0]){
							return expandRowData;
						}else{
							// return defaultExpandRow;
							return expandRowData;
						}
					}}
				>
					<Column
						title="账号名称"
						dataIndex="name"
						sorter={(a, b)=>{
							return (a.name.length - b.name.length);
						}}
					/>
					<Column
						title="操作内容"
						dataIndex="type"
						sorter={(a, b)=>{
							return (a.type.length - b.type.length);
						}}
						filters={filterArr}
						onFilter={(value, record)=>{
							return record.type.includes(value);
						}}
					/>
					<Column
						title="操作结果"
						dataIndex="status"
						sorter={(a, b)=>{
							return (a.status.length - b.status.length);
						}}
						filters={[{
							text: '成功',
							value: '成功'
						}, {
							text: '失败',
							value: '失败'
						}]}
						onFilter={(value, record)=>{
							return record.status.includes(value);
						}}
						render={(text, record, index)=>{
							switch (text) {
								case "成功":
									return <Badge status="success" text="成功" />
								case "失败":
									return <Badge status="error" text="失败" />
								default:
									return "未知";
							}
						}}
					/>
					<Column
						title="操作时间"
						dataIndex="regTime"
						sorter={(a, b)=>{
							return (a.regTime.length - b.regTime.length);
						}}
					/>
				</Table>
			</div>
		);
	}
}