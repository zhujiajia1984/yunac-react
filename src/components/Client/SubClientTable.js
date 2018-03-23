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
                total: 0,
                showSizeChanger: true,
                pageSizeOptions: ['6', '15', '30', '50'],
                defaultCurrent: 1,
                defaultPageSize: 6,
                current: 1,
                pageSize: 6,
            },
            sorter: {
                sortby: 'lastModified',
                order: -1
            },
            search: '',
            dlgTitle: '',
            dlgVisible: false,
            dlgLoading: false,
            validateNameStatus: '',
            validateNameHelp: '',
            clientName: '',
            clientShortName: '',
            editID: '',
            editIndex: null,
        }
    }

    // 读入客户数据
    componentDidMount() {
        // 数据初始化
        let { defaultCurrent, defaultPageSize } = this.state.pagination;
        this.getClientsInfo(defaultCurrent, defaultPageSize);
    }
    getClientsInfo(current, pageSize, sortby = 'lastModified', order = -1, search = 'undefined') {
        // 获取客户信息
        data = [];
        this.setState({ isLoading: true, });
        let url = `https://test.weiquaninfo.cn/mongo/clients?current=${current}&pageSize=${pageSize}&sortby=${sortby}&order=${order}&search=${search}`;
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
                        name: item.name,
                        shortName: this.checkValue(item.shortName),
                        createTime: item.createTime,
                        lastModified: item.lastModified,
                        accountNum: 0,
                        devNum: 0,
                    })
                });
                // 分页
                let pagination = this.state.pagination;
                pagination.total = resJson.total;
                this.setState({
                    isLoading: false,
                    data: data,
                    pagination: pagination
                });
            })
            .catch(error => {
                alert(`查询客户信息失败：${error.message}`);
                this.setState({ isLoading: false });
            })
    }

    // 检查客户名称是否可用（新增客户时）
    onCheckClientName(e) {
        // 是否新增客户
        if (this.state.dlgTitle != "新增客户") {
            return;
        }
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

    // 新增或修改客户
    dlgOk() {
        this.setState({ dlgLoading: true });
        if (this.state.dlgTitle == "新增客户") {
            if (this.state.validateNameStatus != "success") {
                this.setState({ dlgLoading: false, validateNameStatus: 'error' })
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
                        let { current, pageSize } = this.state.pagination;
                        let { sortby, order } = this.state.sorter;
                        this.getClientsInfo(current, pageSize, sortby, order, this.state.search);
                        this.setState({
                            dlgLoading: false,
                            dlgVisible: false,
                        });
                        message.success("已成功新增客户");
                    })
                    .catch(error => {
                        alert(`新增客户失败：${error.message}`);
                    })
            }
        } else if (this.state.dlgTitle == "修改客户") {
            // 修改客户
            let url = `https://test.weiquaninfo.cn/mongo/clients?id=${this.state.editID}`;
            fetch(url, {
                    method: "PUT",
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
                    let { current, pageSize } = this.state.pagination;
                    let { sortby, order } = this.state.sorter;
                    this.getClientsInfo(current, pageSize, sortby, order, this.state.search);
                    this.setState({
                        dlgLoading: false,
                        dlgVisible: false,
                    });
                    message.success("已成功更新客户信息");
                })
                .catch(error => {
                    alert(`更新客户信息失败：${error.message}`);
                    this.setState({ isLoading: false });
                })
        }
    }

    // 删除客户
    onDelClient(id, index) {
        let url = `https://test.weiquaninfo.cn/mongo/clients?id=${id}`;
        fetch(url, { method: "DELETE", })
            .then(res => {
                let contentType = res.headers.get("Content-Type");
                if (res.status == 204) {
                    // 删除成功
                    let { current, pageSize } = this.state.pagination;
                    let { sortby, order } = this.state.sorter;
                    this.getClientsInfo(current, pageSize, sortby, order, this.state.search);
                    message.success("已成功删除客户");
                } else {
                    throw new Error(`status:${res.status} contentType:${contentType}`);
                }
            })
            .catch(error => {
                alert(`删除客户失败：${error.message}`);
                this.setState({ isLoading: false });
            })
    }

    // 显示新增客户对话框
    onAddClient() {
        this.setState({
            dlgTitle: '新增客户',
            dlgVisible: true,
            clientName: '',
            clientShortName: '',
            editID: '',
            editIndex: null,
            validateNameStatus: '',
        })
    }

    // 显示编辑客户对话框
    onEditClient(record, index) {
        this.setState({
            dlgTitle: '修改客户',
            dlgVisible: true,
            clientName: record.name,
            clientShortName: (record.shortName == "-") ? '' : record.shortName,
            editID: record.key,
            editIndex: index,
            validateNameStatus: '',
        })
    }

    // 关闭对话框
    dlgCancel() {
        this.setState({ dlgVisible: false, });
    }

    // 表格排序、筛选和分页变化时触发
    onTableChange(pagination, filters, sorter) {
        // 分页和排序处理
        let { current, pageSize } = pagination;
        let sortby = typeof(sorter.field) != "undefined" ? sorter.field : "lastModified";
        let order = typeof(sorter.order) != "undefined" ? sorter.order : -1;
        order = (order == "ascend") ? 1 : -1;
        let sorterTmp = { sortby: sortby, order: order };
        this.setState({ pagination: pagination, sorter: sorterTmp });
        // 获取数据
        this.getClientsInfo(current, pageSize, sortby, order, this.state.search);
    }

    // 点击搜索
    onSearch(value) {
        this.setState({ search: value });
        this.getClientsInfo(this.state.pagination.current,
            this.state.pagination.pageSize,
            this.state.sorter.sortby,
            this.state.sorter.order,
            value);
    }

    // 搜索框实时输入
    onSearchChange(e) {
        this.setState({ search: e.target.value })
    }

    //
    getLength(str) {
        return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
    }

    // 判断是否不存在或者为空
    checkValue(str) {
        if (typeof(str) == "undefined" || str == '') {
            return '-';
        } else {
            return str;
        }
    }

    // 
    onSubAccount() {
        this.props.history.push('/subAccount');
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
                            placeholder="客户全称/简称搜索"
                            onSearch={this.onSearch.bind(this)}
                            enterButton
                            style={{marginLeft: 10}}
                            value={this.state.search}
                            onChange={this.onSearchChange.bind(this)}
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
                                value={this.state.clientName}
                            />
                        </FormItem>
                        <FormItem
                            label="客户简称"
                        >
                            <Input size="default"
                                placeholder="选填，32个字符以内"
                                onChange={this.onChangeClientShortName.bind(this)}
                                value={this.state.clientShortName}
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
                    onChange={this.onTableChange.bind(this)}
                >   
                    <Column
                        title="客户全称"
                        dataIndex="name"
                        // sorter={(a, b)=>{
                        //     return (a.name.length - b.name.length);
                        // }}
                    />
                    <Column
                        title="客户简称"
                        dataIndex="shortName"
                        // sorter={(a, b)=>{
                        //     return (a.shortName.length - b.shortName.length);
                        // }}
                    />
                    <Column
                        title="账号数量"
                        dataIndex="accountNum"
                        // sorter={(a, b)=>{
                        //     return (a.accountNum.length - b.accountNum.length);
                        // }}
                    />
                    <Column
                        title="设备数量"
                        dataIndex="devNum"
                        // sorter={(a, b)=>{
                        //     return (a.devNum.length - b.devNum.length);
                        // }}
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
                        title="末次更新时间"
                        dataIndex="lastModified"
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
                                <a href="javascript:;" onClick={this.onEditClient.bind(this, record, index)}>修改</a>
                                <Divider type="vertical" />
                                <a href="javascript:;" onClick={this.onSubAccount.bind(this)}>账号管理</a>
                                <Divider type="vertical" />
                                <Popconfirm title="确认删除此客户吗？" onConfirm={this.onDelClient.bind(this, record.key, index)}
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