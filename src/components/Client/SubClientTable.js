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
import './SubClientTable.less';
import moment from 'moment';

// const 
const { Column, } = Table;
let data = [];
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
            validateNameStatus: '',
            validateNameHelp: '',
            clientName: '',
            clientShortName: ''
        }
    }

    //
    componentDidMount() {
        data = [];
        this.setState({ isLoading: true, });
        setTimeout(() => {
            // let time = moment("2018-03-21T09:12:38.350Z");
            // console.log(time.format("YYYY-MM-DD HH:mm:ss"));
            let url = `https://test.weiquaninfo.cn/mongo/clients`;
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
                    // 返回
                    resJson.map((item) => {
                        data.push({
                            key: item._id,
                            name: item.name,
                            shortName: typeof(item.shortName) == 'undefined' ? '' : item.shortName,
                            createTime: item.createTime,
                            lastModified: item.lastModified
                        })
                    });
                    this.setState({ isLoading: false, data: data });
                })
                .catch(error => {
                    alert(`查询客户信息失败：${error.message}`);
                    this.setState({ isLoading: false });
                })
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
    getLength(str) {
        return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
    }

    //
    onCheckClientName(e) {
        let nameLen = this.getLength(e.target.value);
        if (nameLen < 1 || nameLen > 64) {
            this.setState({
                validateNameStatus: 'error',
                validateNameHelp: '请输入正确的客户全称（64个字符以内）'
            });
        } else {
            let url = `https://test.weiquaninfo.cn/mongo/clients?name=${e.target.value}`;
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
                    // 返回
                    if (resJson.length > 0) {
                        this.setState({
                            validateNameStatus: 'error',
                            validateNameHelp: '已存在相同名称客户，请确认！'
                        });
                    } else {
                        this.setState({
                            validateNameStatus: 'success',
                            validateNameHelp: ''
                        });
                    }
                })
                .catch(error => {
                    alert(`查询客户全称失败：${error.message}`);
                })
        }
    }
    onFocusClientName(e) {
        this.setState({ validateNameStatus: '', validateNameHelp: '' });
    }
    onChangeClientName(e) {
        this.setState({ clientName: e.target.value, });
    }
    onChangeClientShortName(e) {
        this.setState({ clientShortName: e.target.value, });
    }

    //
    dlgOk() {
        this.setState({ dlgLoading: true });
        setTimeout(() => {
            // 判断当前名称是否已存在
            if (this.state.validateNameStatus != "success") {
                this.setState({ dlgLoading: false })
            } else {
                // 新增客户
                let url = `https://test.weiquaninfo.cn/mongo/clients`;
                fetch(url, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: this.state.clientName,
                            shortName: this.state.clientShortName
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
                        // 返回成功数据
                        data.unshift({
                            key: resJson._id,
                            name: resJson.name,
                            shortName: typeof(resJson.shortName) == 'undefined' ? '' : resJson.shortName,
                            createTime: resJson.createTime,
                            lastModified: resJson.lastModified
                        })
                        this.setState({ dlgLoading: false, dlgVisible: false, data: data });
                        message.success("已成功新增客户");
                    })
                    .catch(error => {
                        alert(`新增客户失败：${error.message}`);
                    })
            }
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
							validateStatus={this.state.validateNameStatus}
							help={this.state.validateNameHelp}
							hasFeedback={true}
						>
							<Input size="default"
								placeholder="必填，64个字符以内"
								onBlur={this.onCheckClientName.bind(this)}
								onFocus={this.onFocusClientName.bind(this)}
								onChange={this.onChangeClientName.bind(this)}
							/>
						</FormItem>
						<FormItem
							label="客户简称"
						>
							<Input size="default"
								placeholder="选填，32个字符以内"
								onChange={this.onChangeClientShortName.bind(this)}
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
						title="客户全称"
						dataIndex="name"
						sorter={(a, b)=>{
							return (a.name.length - b.name.length);
						}}
					/>
					<Column
						title="客户简称"
						dataIndex="shortName"
						sorter={(a, b)=>{
							return (a.shortName.length - b.shortName.length);
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
						dataIndex="createTime"
						sorter={(a, b)=>{
							return (a.createTime.length - b.createTime.length);
						}}
						render={(text)=>{
							return moment(text).format("YYYY-MM-DD HH:mm:ss");
						}}
					/>
					<Column
						title="末次更新时间"
						dataIndex="lastModified"
						sorter={(a, b)=>{
							return (a.lastModified.length - b.lastModified.length);
						}}
						render={(text)=>{
							return moment(text).format("YYYY-MM-DD HH:mm:ss");
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