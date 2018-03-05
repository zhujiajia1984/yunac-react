import React from 'react';
import { Radio, Table, Button, Input, Row, Col } from 'antd';

//const
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Column, } = Table;
const Search = Input.Search;
import { withRouter } from 'react-router';

//
class MsgTableWarn extends React.Component {
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
			status: '',
		}
	}

	//
	componentDidMount() {
		if (typeof(this.props.history.location.search) == 'undefined')
			return;
		let conditions = this.props.history.location.search.split("=");
		if (conditions.length >= 2) {
			this.setState({ status: conditions[1] });
		}
		this.setState({ isLoading: true, });
		let data = [];
		setTimeout(() => {
			for (let i = 0; i < 8; i++) {
				data.push({
					key: i.toString(),
					title: (i % 2) ? "探针离线报警" : "AP离线报警",
					startDate: '2017-01-30 15:12:1' + (i % 9),
					endDate: '-',
					devInfo: 'ec:ab:mm:ss:dd:56' + '(测试123)'
				})
			}
			this.setState({ isLoading: false, data: data });
		}, 500);
	}

	//
	render() {
		const expandRowData = (
			<div style={{fontSize: 14}}>
					<Row gutter={16} style={{marginBottom: 10}}>
						<Col span={3}>
							<div style={{textAlign: 'right'}}>
								设备MAC：
							</div>
						</Col>
						<Col span={4}>
							<span>ef:aa:bb:cc:dd:ee</span>
						</Col>
						<Col span={3}>
							<div style={{textAlign: 'right'}}>
								设备名称：
							</div>
						</Col>
						<Col span={4}>
							<span>测试111</span>
						</Col>
					</Row>
				</div>
		)
		return (
			<div>
				<div style={{marginTop: 16, backgroundColor: 'white', paddingLeft: 24, paddingRight: 24, paddingTop: 16}}>
					<div style={{marginBottom: 16, display: 'flex', flex: 1}}>
						<div style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
							<Search
								placeholder="请输入搜索内容"
								onSearch={value => console.log(value)}
								enterButton
							/>
						</div>
					</div>
					<Table dataSource={this.state.data}
						bordered={true}
						loading={this.state.isLoading}
						locale={{filterConfirm: '确认', filterReset: '清空', emptyText: '暂无数据'}}
						pagination={this.state.pagination}
						// expandedRowRender={(record) => {
						// 	return expandRowData;
						// }}
					>
						<Column
							title="报警源"
							dataIndex="devInfo"
							sorter= {(a, b) => {
								return (a.devInfo.length - b.devInfo.length);
							}}
						/>
						<Column
							title="报警内容"
							dataIndex="title"
							sorter= {(a, b) => {
								return (a.title.length - b.title.length);
							}}
							filters={[{
								text: 'AP离线报警',
								value: 'ap'
							}, {
								text: '探针离线报警',
								value: 'tz'
							}]}
						/>
						<Column
							title="报警开始日期"
							dataIndex="startDate"
							sorter= {(a, b) => {
								return (a.startDate.length - b.startDate.length);
							}}
						/>
						<Column
							title="报警结束日期"
							dataIndex="endDate"
							sorter= {(a, b) => {
								return (a.endDate.length - b.endDate.length);
							}}
						/>
					</Table>
				</div> 
			</div>
		);
	}
}

export default withRouter(MsgTableWarn);