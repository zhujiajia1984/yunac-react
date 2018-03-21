import React from 'react';
import {
    Table,
    Icon,
    Divider,
    Button,
    Select,
    Input,
    Popconfirm,
    message,
    Modal,
    Row,
    Col,
    Tree,
    Form,
} from 'antd';
import { withRouter } from 'react-router';
import EditableTableCell from '../../components/EditableTableCell';
import './SubClientTable.less'

// const 
const { Column, } = Table;
const data = [];
const Option = Select.Option;
const Search = Input.Search;
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;

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
            dlgTitle: '',
            dlgVisible: false,
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
    onDelClient() {
        message.success("已成功删除客户");
    }

    //
    onAddClient() {
        this.setState({
            dlgTitle: '新增客户',
            dlgVisible: true,
        })
    }

    //
    onEditClient() {
        this.setState({
            dlgTitle: '修改客户',
            dlgVisible: true,
        })
    }

    //
    dlgOk() {
        this.setState({ dlgLoading: true });
        setTimeout(() => {
            this.setState({
                dlgLoading: false,
                dlgVisible: true,
            })
        }, 500)
    }

    //
    dlgCancel() {
        this.setState({ dlgVisible: false });
    }

    //
    render() {
        const authTree = (
            <div>
				<Row gutter={16}>
					<Col span={3} style={{textAlign: 'right'}}>
						<span>客户权限：</span>
					</Col>
					<Col span={14}>
						<Tree
							showLine
							defaultExpandAll
						>
							<TreeNode title="系统首页" key="0-0">
								<TreeNode title="设备管理" key="0-0-0">
									<TreeNode title="AP管理" key="0-0-0-0">
										<TreeNode title="只读" key="0-0-0-0-1" />
									</TreeNode>
									<TreeNode title="探针管理" key="0-0-0-1">
										<TreeNode title="管理" key="0-0-0-0-2" />
									</TreeNode>
									<TreeNode title="分组管理" key="0-0-0-2">
										<TreeNode title="管理" key="0-0-0-0-3" />
									</TreeNode>
								</TreeNode>
							</TreeNode>
						</Tree>
					</Col>
				</Row>
			</div>
        )
        return (
            <div>
				<div style={{marginTop: 16, marginBottom: 16, display: 'flex', flex: 1}}>
					<div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
						<Button type="primary" onClick={this.onAddClient.bind(this)}>新增客户</Button>
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
					title={this.state.dlgTitle}
					visible={this.state.dlgVisible}
					onOk={this.dlgOk.bind(this)}
					onCancel={this.dlgCancel.bind(this)}
					cancelText="取消"
					okText="确认"
					destroyOnClose={true}
					confirmLoading={this.state.dlgLoading}
				>
					<Form layout="inline" className="FormAddClient">
						<FormItem
							label="客户全称"
							validateStatus=""
							help=""
						>
							<Input size="default"
								placeholder="必填，64个字符以内"
							/>
						</FormItem>
					</Form>
					<Row gutter={16} style={{display: 'flex', marginTop: 24}}>
						<Col span={6} style={{textAlign: 'right'}}>
							<span>客户权限：</span>
						</Col>
						<Col span={14}>
							<Tree
								checkable={true}
								defaultCheckedKeys={['home', 'apManageAll', 'apSettingAll',
									'apGroup', 'apUser', 'log', 'tzManageAll'
								]}
								defaultExpandedKeys={['dev', 'user', 'system']}
							>
								<TreeNode title="系统首页" key="home"></TreeNode>
								<TreeNode title="设备管理" key="dev">
									<TreeNode title="AP管理" key="ap">
										<TreeNode title="AP状态管理" key="apManage">
											<TreeNode title="管理" key="apManageAll"></TreeNode>
											<TreeNode title="只读" key="apManageReadOnly"></TreeNode>
										</TreeNode>
										<TreeNode title="配置文件管理" key="apSetting">
											<TreeNode title="管理" key="apSettingAll"></TreeNode>
											<TreeNode title="只读" key="apSettingReadOnly"></TreeNode>
										</TreeNode>
										<TreeNode title="AP型号管理" key="apType">
											<TreeNode title="管理" key="apTypeAll"></TreeNode>
											<TreeNode title="只读" key="apTypeReadOnly"></TreeNode>
										</TreeNode>
									</TreeNode>
									<TreeNode title="探针管理" key="tz">
										<TreeNode title="探针状态管理" key="tzManage">
											<TreeNode title="管理" key="tzManageAll"></TreeNode>
											<TreeNode title="只读" key="tzManageReadOnly"></TreeNode>
										</TreeNode>
									</TreeNode>
									<TreeNode title="分组管理" key="apGroup"></TreeNode>
								</TreeNode>
								<TreeNode title="用户管理" key="user">
									<TreeNode title="AP用户" key="apUser"></TreeNode>
								</TreeNode>
								<TreeNode title="系统管理" key="system">
									<TreeNode title="固件管理" key="version"></TreeNode>
									<TreeNode title="日志管理" key="log"></TreeNode>
									<TreeNode title="客户管理" key="client"></TreeNode>
								</TreeNode>
							</Tree>
						</Col>
					</Row>
				</Modal>
				<Table dataSource={this.state.data}
					bordered={true}
					loading={this.state.isLoading}
					locale={{filterConfirm: '确认', filterReset: '清空', emptyText: '暂无数据'}}
					pagination={this.state.pagination}
					expandedRowRender={(record) => {
						return authTree;
					}}
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
								<a href="javascript:;" onClick={this.onEditClient.bind(this)}>修改</a>
								<Divider type="vertical" />
								<a href="javascript:;" onClick={this.onSubAccount.bind(this)}>账号管理</a>
								<Divider type="vertical" />
								<Popconfirm title="确认删除此客户吗？" onConfirm={this.onDelClient.bind(this)}
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

export default withRouter(SubClientTable);