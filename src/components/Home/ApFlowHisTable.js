import React from 'react';
import {
	Table,
	Icon,
	Divider,
	Button,
	Select,
	Input,
	Tooltip,
	Radio
} from 'antd';

// const 
const { Column, } = Table;
let data = [];
const Option = Select.Option;
const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

//
export default class ApFlowHisTable extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			data: [],
		}
	}

	//
	componentDidMount() {
		this.setState({ isLoading: true, });
		setTimeout(() => {
			for (let i = 0; i < 10; i++) {
				data.push({
					key: i.toString(),
					rank: i + 1,
					name: "测试" + i % 10,
					num: 5000 - i
				})
			}
			this.setState({ isLoading: false, data: data });
		}, 500)
	}

	//
	onChangeFlowType(e) {

	}

	//
	componentWillUnmount() {
		data = [];
	}

	//
	render() {
		return (
			<div>
				<div style={{marginBottom: 8}}>
					<RadioGroup onChange={this.onChangeFlowType.bind(this)} defaultValue="a">
						<RadioButton value="a">上行流量</RadioButton>
						<RadioButton value="b">下行流量</RadioButton>
					</RadioGroup>
				</div>
				<Table dataSource={this.state.data}
					bordered={false}
					loading={this.state.isLoading}
					locale={{filterConfirm: '确认', filterReset: '清空', emptyText: '暂无数据'}}
					pagination={false}
					size="small"
				>
					<Column
						title="排名"
						dataIndex="rank"
					/>
					<Column
						title="设备名称"
						dataIndex="name"
					/>
					<Column
						title="使用流量（ GB）"
						dataIndex="num"
					/>
				</Table>
			</div>
		);
	}
}