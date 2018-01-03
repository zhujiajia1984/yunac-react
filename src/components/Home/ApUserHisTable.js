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
export default class ApUserHisTable extends React.Component {
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
					key: "测试" + i,
					rank: i + 1,
					name: "测试" + i % 10,
					num: 100 - i
				})
			}
			this.setState({ isLoading: false, data: data });
		}, 500)
	}

	componentWillUnmount() {
		data = [];
	}

	//
	render() {
		return (
			<div>
				<div style={{marginBottom: 8}}>
					<RadioGroup defaultValue="a">
						<RadioButton value="a">总人数</RadioButton>
						<RadioButton value="b">2.4G人数</RadioButton>
						<RadioButton value="c">5.8G人数</RadioButton>
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
						title="使用人数"
						dataIndex="num"
					/>
				</Table>
			</div>
		);
	}
}