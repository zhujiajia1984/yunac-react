import React from 'react';
import { Radio, Table, Button, Input, Row, Col } from 'antd';

//const
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Column, } = Table;
const Search = Input.Search;
const noticeType = ['离线报警']

//
export default class MsgTableWarn extends React.Component {
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
			readOk: false,
		}
	}

	//
	componentDidMount() {
		this.setState({ isLoading: true, });
		let data = [];
		let noticeTitle = ['AP离线报警', '探针离线报警'];
		setTimeout(() => {
			for (let i = 0; i < 8; i++) {
				data.push({
					key: i.toString(),
					title: noticeTitle[i % 2],
					type: noticeType[i % 1],
					date: '2017-01-30 15:12:1' + (i % 9),
				})
			}
			this.setState({ isLoading: false, data: data });
		}, 500)
	}

	//
	onMsgTypeChange(e) {
		let data = this.state.data;
		if (e.target.value == "readNot") {
			this.setState({ isLoading: true, data: [], readOk: false });
			setTimeout(() => {
				this.setState({ isLoading: false, data: data });
			}, 500)
		} else if (e.target.value == "readOk") {
			this.setState({ isLoading: true, data: [], readOk: true });
			setTimeout(() => {
				this.setState({ isLoading: false, data: data, readOk: true });
			}, 500)
		} else if (e.target.value == "all") {
			this.setState({ isLoading: true, data: [], readOk: false });
			setTimeout(() => {
				this.setState({ isLoading: false, data: data, });
			}, 500)
		}
	}


	//
	render() {
		const expandRowData = (
			<div style={{fontSize: 14}}>
					<Row gutter={16} style={{marginBottom: 10}}>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								设备MAC：
							</div>
						</Col>
						<Col span={6}>
							<span>ef:aa:bb:cc:dd:ee</span>
						</Col>
						<Col span={6}>
							<div style={{display: 'flex', flexDirection: 'row-reverse'}}>
								设备名称：
							</div>
						</Col>
						<Col span={6}>
							<span>测试111</span>
						</Col>
					</Row>
				</div>
		)
		return (
			<div>
				<RadioGroup onChange={this.onMsgTypeChange.bind(this)} defaultValue="readNot">
					<RadioButton value="readNot">未读消息</RadioButton>
					<RadioButton value="readOk">已读消息</RadioButton>
					<RadioButton value="all">全部消息</RadioButton>
				</RadioGroup>
				<div style={{marginTop: 16, backgroundColor: 'white', paddingLeft: 24, paddingRight: 24, paddingTop: 16}}>
					<div style={{marginBottom: 16, display: 'flex', flex: 1}}>
						<div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
							<Button type="default"
								disabled={(this.state.readOk)?true:false}
							>全部已读</Button>
						</div>
						<div style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
							<Search
								placeholder="请输入搜索内容"
								onSearch={value => console.log(value)}
								enterButton
								style={{marginLeft: 10}}
							/>
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
							title="标题内容"
							dataIndex="title"
							render={(text)=>{
								return <div style={{color: (this.state.readOk)?"#999999":"black"}}>
									{text}
								</div>
							}}
						/>
						<Column
							title="报警类型"
							dataIndex="type"
						/>
						<Column
							title="日期"
							dataIndex="date"
						/>
					</Table>
				</div> <
			/div>
		);
	}
}