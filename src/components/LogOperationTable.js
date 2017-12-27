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
const types = ['删除设备', '同步数据', '重启设备', '固件升级',
	'下发配置文件'
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
					设备名称：
				</div>
			</Col>
			<Col span={6}>
				<div>测试567</div>
			</Col>
		</Row>
		<Row gutter={16} style={{marginBottom: 10}}>
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

//
export default class LogOperationTable extends React.Component {
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
					type: types[i % 5],
					note: '备注' + i,
					status: statusArr[i % 2],
					regTime: '2017-01-30 15:12:1' + (i % 9),
					area: areas[i % 4],
					client: '客户' + i,
					mac: 'ef:d3:76:12:e1:p' + (i % 10),
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
							<span>操作日志总数：</span><span style={{marginRight: 16}}>103</span>
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
						title="设备MAC"
						dataIndex="mac"
						sorter={(a, b)=>{
							return (a.mac.length - b.mac.length);
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