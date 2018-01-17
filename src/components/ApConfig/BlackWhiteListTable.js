import React from 'react';
import PropTypes from 'prop-types';
import {
	Popconfirm,
	Table,
	Button,
	Input,
	Select,
	Modal,
	Radio,
} from 'antd';
import BlackWhiteListTableCss from './BlackWhiteListTable.css';

// const 
const { Column, } = Table;
const Search = Input.Search;
let data = [];
let data2 = [];
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

//
export default class BlackWhiteListTable extends React.Component {
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
			visible: false,
			modalLoading: false,
			curSelType: 'mac',
			selectedRowKeys: [],
		}
	}

	//
	componentDidMount() {
		this.setState({ isLoading: true, });
		setTimeout(() => {
			for (let i = 0; i < 100; i++) {
				data.push({
					key: i.toString(),
					mac: 'ef:ft:mm:14:16:7' + i % 10,
				})
				data2.push({
					key: i.toString(),
					mac: 'ef:ft:mm:14:16:7' + i % 10,
					ssid: 'ssid' + i,
					apName: 'AP名称' + i,
					apMac: '19:ft:mm:14:16:7' + i % 10,
				})
			}
			this.setState({ isLoading: false, data: data, data2: data2 });
		}, 500)
	}

	//
	componentWillReceiveProps(nextProps) {
		if (this.props.type != nextProps.type) {
			this.setState({ isLoading: true, data: [] });
			setTimeout(() => {
				this.setState({ isLoading: false, data: data });
			}, 1000)
		}
	}

	//
	onAddDev(e) {
		this.setState({ visible: true, });
	}

	//
	handleOk() {
		this.setState({ modalLoading: true });
		setTimeout(() => {
			this.setState({ visible: false, modalLoading: false });
		}, 1000)
	}

	//
	handleCancel() {
		this.setState({ visible: false, });
	}

	//
	onSelChange(e) {
		this.setState({ curSelType: e.target.value });
	}

	//
	render() {
		return (
			<div style={{marginTop: 24}}>
				<div style={{marginBottom: 24, display: 'flex', flex: 1}}>
					<div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
						<Button type="primary" onClick={this.onAddDev.bind(this)}>新增终端</Button>
					</div>
					<div style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
						<Search
							placeholder="请输入搜索内容"
							onSearch={value => console.log(value)}
							enterButton
							style={{marginLeft: 10}}
						/>
						<div>
							<Select defaultValue="6" style={{width: 80}}>
								<Option value="6">6</Option>
								<Option value="15">15</Option>
								<Option value="30">30</Option>
								<Option value="50">50</Option>
							</Select>
						</div>
					</div>
				</div>
				<div>
					<Modal
						title="新增终端"
						visible={this.state.visible}
						onOk={this.handleOk.bind(this)}
						onCancel={this.handleCancel.bind(this)}
						cancelText="取消"
						okText="确认"
						destroyOnClose={true}
						confirmLoading={this.state.modalLoading}
						wrapClassName="modalBlackWhiteWrapper"
						maskClosable={false}
					>
						<div>
							<RadioGroup onChange={this.onSelChange.bind(this)} defaultValue="mac">
								<RadioButton value="mac">手动输入终端MAC地址</RadioButton>
								<RadioButton value="sel">从当前在线终端中选择</RadioButton>
							</RadioGroup>
							<div style={{marginTop: 24}}>
								{
									(this.state.curSelType == 'mac')?
									<Input placeholder="MAC地址"/>:
									<div>
										<div style={{display: 'flex', flex: 1}}>
											<div>
												<Search
												placeholder="请输入搜索内容"
												onSearch={value => console.log(value)}
												enterButton
												style={{width: 200}}
												/>
											</div>
											<div style={{display: 'flex', flexDirection: 'row-reverse', flex: 1}}>
												<Button>刷新</Button>
											</div>
										</div>
										<div className="BlackWhiteTableStyle" style={{marginTop: 16}}>
											<Table 
												dataSource={this.state.data2}
												bordered={true}
												size="small"
												rowClassName="BlackWhiteTableRowStyle"
												pagination={this.state.pagination}
												rowSelection={{
													type: 'checkbox'
												}}
											>
												<Column
													title="终端MAC地址"
													dataIndex="mac"
													sorter={(a, b)=>{
														return (a.mac.length - b.mac.length);
													}}
												/>
												<Column
													title="SSID名称"
													dataIndex="ssid"
													sorter={(a, b)=>{
														return (a.ssid.length - b.ssid.length);
													}}
												/>
												<Column
													title="AP名称"
													dataIndex="apName"
													sorter={(a, b)=>{
														return (a.apName.length - b.apName.length);
													}}
												/>
												<Column
													title="AP-MAC"
													dataIndex="apMac"
													sorter={(a, b)=>{
														return (a.apMac.length - b.apMac.length);
													}}
												/>
											</Table>
										</div>
									</div>
								}
							</div>
						</div>
					</Modal>
				</div>
				<div className="BlackWhiteTableStyle">
					<Table 
						dataSource={this.state.data}
						bordered={true}
						loading={this.state.isLoading}
						locale={{filterConfirm: '确认', filterReset: '清空', emptyText: '暂无数据'}}
						pagination={this.state.pagination}
						size="small"
						// width="80%"
						rowClassName="BlackWhiteTableRowStyle"
					>
						<Column
							title="MAC地址"
							dataIndex="mac"
							sorter={(a, b)=>{
								return (a.mac.length - b.mac.length);
							}}
							// className="tableTextCenter"
						/>
						<Column
							title="操作"
							dataIndex="action"
							render={(text, record, index)=>{
								return  <Popconfirm title="确认删除此终端吗？" okText="确认" cancelText="取消">
										<a href="javascript:;">删除</a>
									</Popconfirm>
							}}
						/>
					</Table>
				</div>
			</div>
		);
	}
}

//
BlackWhiteListTable.propTypes = {
	type: PropTypes.string.isRequired,
};

BlackWhiteListTable.defaultProps = {
	type: "black"
};