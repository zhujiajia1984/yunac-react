import React from 'react';
import {
    Table,
    Divider,
    Button,
    Select,
    Input,
    Tree,
    message,
    Row,
    Col,
    Modal,
    Popconfirm,
    Form
} from 'antd';
import EditableTableCell from '../../components/EditableTableCell';
import { withRouter } from 'react-router';
import moment from 'moment';

// const 
const { Column, } = Table;
let data = [];
const Option = Select.Option;
const Search = Input.Search;
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
message.config({
    top: 100,
    duration: 2,
});


//
class SubAccountTable extends React.Component {
    //
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
            pagination: {
                total: 0,
                current: 1,
                defaultCurrent: 1,
                defaultPageSize: 6,
                pageSize: 6,
                showSizeChanger: true,
                pageSizeOptions: ['6', '15', '30', '50'],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            },
            sorter: {
                sortby: '_id',
                order: -1
            },
            isBtnLoading: false,
            dlgTitle: '',
            dlgVisible: false,
            dlgLoading: false,
            clientInfo: {
                clientId: '',
                clientName: ''
            },
            curAccountInfo: {
                accountName: '',
                userName: '',
                id: '',
            },
            validateNameStatus: '',
            validateNameHelp: '',
            search: '',
        }
    }

    // 初始化account信息
    componentDidMount() {
        let { clientKey, clientName } = this.props.location.state;
        if (typeof(clientKey) == 'undefined' || typeof(clientName) == 'undefined') {
            alert('client error');
            return;
        } else {
            let { defaultCurrent, defaultPageSize } = this.state.pagination;
            this.getAccountsInfo(clientKey, clientName, defaultCurrent, defaultPageSize);
        }
    }
    getAccountsInfo(clientId, clientName, current = 1, pageSize = 20, sortby = '_id', order = -1, search = 'undefined') {
        data = [];
        this.setState({ isLoading: true, });
        let url = `https://test.weiquaninfo.cn/mongo/accounts?clientId=${clientId}&current=${current}&pageSize=${pageSize}&sortby=${sortby}&order=${order}&search=${search}`;
        fetch(url, { method: "GET", })
            .then(res => {
                let contentType = res.headers.get("Content-Type");
                if (res.status == 200 && contentType && contentType.includes("application/json")) {
                    return res.json();
                } else {
                    throw new Error(`status:${res.status} contentType:${contentType}`);
                }
            })
            .then(resJson => {
                // 数据
                resJson.data.map((item) => {
                    data.push({
                        key: item._id,
                        accountName: item.accountName,
                        userName: item.userName,
                        createTime: item.createTime,
                        lastLogin: typeof(item.lastLogin) == "undefined" ? "" : item.lastLogin,
                        clientId: item.clientId
                    })
                });
                // 分页
                let pagination = this.state.pagination;
                pagination.total = resJson.total;
                let clientInfo = {
                    clientName: clientName,
                    clientId: clientId
                }
                this.setState({
                    isLoading: false,
                    data: data,
                    clientInfo: clientInfo,
                    pagination: pagination
                });
            })
            .catch(error => {
                alert(`查询账号信息失败：${error.message}`);
                this.setState({ isLoading: false });
            })
        this.setState({ isLoading: false, data: data });

    }

    // account保存（新增/修改）
    dlgOk() {
        let { accountName, userName } = this.state.curAccountInfo;
        let regex = /^1\d{10}$/;
        if (!regex.test(accountName)) {
            this.setState({
                validateNameStatus: 'error',
                validateNameHelp: '请输入正确的11位手机号码'
            });
            return;
        }
        this.setState({ dlgLoading: true });
        if (this.state.dlgTitle == "新增账号") {
            // 新增账号
            let { clientId, clientName } = this.state.clientInfo;
            let url = `https://test.weiquaninfo.cn/mongo/accounts`;
            fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        accountName: accountName,
                        userName: userName,
                        clientId: clientId
                    }),
                })
                .then(res => {
                    let contentType = res.headers.get("Content-Type");
                    if (res.status == 201 && contentType && contentType.includes("application/json")) {
                        return res.json();
                    } else {
                        throw new Error(`status:${res.status} contentType:${contentType}`);
                    }
                })
                .then(resJson => {
                    let { current, pageSize } = this.state.pagination;
                    let { sortby, order } = this.state.sorter;
                    this.getAccountsInfo(clientId, clientName, current, pageSize, sortby, order, this.state.search);
                    this.setState({
                        dlgLoading: false,
                        dlgVisible: false,
                        validateNameStatus: '',
                        validateNameHelp: ''
                    });
                    message.success("已成功新增账号");
                })
                .catch(error => {
                    alert(`新增客户失败：${error.message}`);
                })
        } else if (this.state.dlgTitle == "修改账号") {
            // 修改账号
            let { clientId, clientName } = this.state.clientInfo;
            let { id, accountName, userName } = this.state.curAccountInfo;
            let url = `https://test.weiquaninfo.cn/mongo/accounts?id=${id}`;
            fetch(url, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        accountName: accountName,
                        userName: userName
                    }),
                })
                .then(res => {
                    let contentType = res.headers.get("Content-Type");
                    if (res.status == 201 && contentType && contentType.includes("application/json")) {
                        return res.json();
                    } else {
                        throw new Error(`status:${res.status} contentType:${contentType}`);
                    }
                })
                .then(resJson => {
                    let { current, pageSize } = this.state.pagination;
                    let { sortby, order } = this.state.sorter;
                    this.getAccountsInfo(clientId, clientName, current, pageSize, sortby, order, this.state.search);
                    this.setState({
                        dlgLoading: false,
                        dlgVisible: false,
                        validateNameStatus: '',
                        validateNameHelp: ''
                    });
                    message.success("已成功更新账号信息");
                })
                .catch(error => {
                    alert(`更新账号信息失败：${error.message}`);
                    this.setState({ isLoading: false });
                })
        }
    }

    // 修改账号和使用者名称
    onChangeAccountName(e) {
        let curAccountInfo = this.state.curAccountInfo;
        curAccountInfo.accountName = e.target.value;
        this.setState({ curAccountInfo: curAccountInfo });
    }
    onChangeUserName(e) {
        let curAccountInfo = this.state.curAccountInfo;
        curAccountInfo.userName = e.target.value;
        this.setState({ curAccountInfo: curAccountInfo });
    }

    // 新增账号
    onAddAccount() {
        let curAccountInfo = {
            accountName: '',
            userName: ''
        }
        this.setState({
            dlgTitle: '新增账号',
            dlgVisible: true,
            curAccountInfo: curAccountInfo
        })
    }

    // 编辑账号
    onEditAccount(record) {
        let curAccountInfo = {
            accountName: record.accountName,
            userName: record.userName,
            id: record.key
        }
        this.setState({
            dlgTitle: '修改账号',
            dlgVisible: true,
            curAccountInfo: curAccountInfo,
            validateNameStatus: '',
            validateNameHelp: '',
        })
    }

    // 删除账号
    onDelAccount(id) {
        let url = `https://test.weiquaninfo.cn/mongo/accounts?id=${id}`;
        fetch(url, { method: "DELETE", })
            .then(res => {
                let contentType = res.headers.get("Content-Type");
                if (res.status == 204) {
                    // 删除成功
                    let { clientId, clientName } = this.state.clientInfo;
                    let { current, pageSize } = this.state.pagination;
                    let { sortby, order } = this.state.sorter;
                    this.getAccountsInfo(clientId, clientName, current, pageSize, sortby, order, this.state.search);
                    message.success("已成功删除账号");
                } else {
                    throw new Error(`status:${res.status} contentType:${contentType}`);
                }
            })
            .catch(error => {
                alert(`删除客户失败：${error.message}`);
                this.setState({ isLoading: false });
            })
    }

    //
    dlgCancel() {
        this.setState({ dlgVisible: false });
    }

    // 表格排序、筛选和分页变化时触发
    onTableChange(pagination, filters, sorter) {
        // 分页和排序处理
        let { current, pageSize } = pagination;
        let { clientId, clientName } = this.state.clientInfo;
        let sortby = typeof(sorter.field) != "undefined" ? sorter.field : "lastModified";
        let order = typeof(sorter.order) != "undefined" ? sorter.order : -1;
        order = (order == "ascend") ? 1 : -1;
        let sorterTmp = { sortby: sortby, order: order };
        this.setState({ pagination: pagination, sorter: sorterTmp });
        // // 获取数据
        this.getAccountsInfo(clientId, clientName, current, pageSize, sortby, order);
    }

    // 点击搜索
    onSearch(value) {
        let { clientId, clientName } = this.state.clientInfo;
        this.setState({ search: value });
        this.getAccountsInfo(
            clientId,
            clientName,
            this.state.pagination.current,
            this.state.pagination.pageSize,
            this.state.sorter.sortby,
            this.state.sorter.order,
            value);
    }

    //
    onSaveTree() {
        this.setState({ isBtnLoading: true, });
        setTimeout(() => {
            message.success('已成功修改用户权限');
            this.setState({ isBtnLoading: false });
        }, 500)
    }

    //
    render() {
        const authTree = (
            <div>
				<Row gutter={16}>
					<Col span={3} style={{textAlign: 'right'}}>
						<span>账号权限：</span>
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
        // 获取客户信息
        let { accountName, userName } = this.state.curAccountInfo;
        let { clientName, clientId } = this.state.clientInfo;
        return (
            <div>
				<div style={{marginTop: 16, marginBottom: 16, display: 'flex', flex: 1}}>
					<div style={{flex: 1, display: 'flex', alignItems: 'center'}}>
						<Button type="primary" onClick={this.onAddAccount.bind(this)}>新增账号</Button>
						<div style={{marginLeft: 16, fontSize: 12}}>
							<span>客户全称：</span><span style={{marginRight: 16}}>{clientName}</span>
						</div>
					</div>
					<div style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
						<Search
							placeholder="请输入账号/使用者名称"
							onSearch={this.onSearch.bind(this)}
							enterButton
							style={{marginLeft: 10}}
						/>
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
                            label="账号名称"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}
                            validateStatus={this.state.validateNameStatus}
                            help={this.state.validateNameHelp}
                        >
                            <Input size="default"
                                placeholder="必填，11位数字（手机号）"
                                onChange={this.onChangeAccountName.bind(this)}
                            	value={accountName}
                            />
                        </FormItem>
                        <FormItem
                            label="使用者名称"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 18}}
                        >
                            <Input size="default"
                                placeholder="选填，32个字符以内"
                                onChange={this.onChangeUserName.bind(this)}
                                value={userName}
                            />
                        </FormItem>
                    </Form>
					<Row style={{display: 'flex', marginTop: 24}}>
						<Col span={6} style={{textAlign: 'right'}}>
							<span>账号权限:</span>
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
					onChange={this.onTableChange.bind(this)}
				>
					<Column
						title="账号名称"
						dataIndex="accountName"
					/>
					<Column
						title="使用者名称"
						dataIndex="userName"
						render={(text)=>{
                            return (text=="")?"-":text;
                        }}
					/>
					<Column
						title="最近登录时间"
						dataIndex="lastLogin"
						sorter={(a, b)=>{
							return (a.lastLogin.length - b.lastLogin.length);
						}}
						render={(text)=>{
                            return (text=="")?"-":moment(text).format("YYYY-MM-DD HH:mm:ss");
                        }}
					/>
					<Column
						title="创建时间"
						dataIndex="createTime"
						sorter={true}
						render={(text)=>{
                            return moment(text).format("YYYY-MM-DD HH:mm:ss");
                        }}
					/>
					<Column
						title="操作"
						dataIndex="action"
						render={(text, record, index)=>{
							return <div>
								<a href="javascript:;" onClick={this.onEditAccount.bind(this, record)}>修改</a>
								<Divider type="vertical" />
								<a href="javascript:;">后台</a>
								<Divider type="vertical" />
								<Popconfirm title="确认删除此账号吗？" onConfirm={this.onDelAccount.bind(this, record.key)}
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

export default withRouter(SubAccountTable);