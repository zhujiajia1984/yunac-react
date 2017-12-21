import React from 'react';
import { Form, Col, Row, Input, Button, Icon, DatePicker } from 'antd';
import PropTypes from 'prop-types';
import apSearchCss from './ApSearchFrom.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// const
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

//
class ApSearchForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expand: false,
		}
	}

	//
	onSearch(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			console.log('Received values of form: ', values);
		});
	}

	//
	onClear() {
		this.props.form.setFieldsValue({
			name: "",
			type: "",
			mac: "",
			clientName: "",
			group: "",
			ip: "",
			ssid: "",
			version: "",
			time: ""
		})
	}

	//
	toggle() {
		this.setState({ expand: !this.state.expand });
	}

	//
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form layout={"inline"}
				onSubmit={this.onSearch.bind(this)}
				style={{paddingLeft: 24, paddingRight: 24}}
			>
				<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom:15}}>
					<Col xs={24} sm={24} md={12} lg={12} xl={8}>
						<FormItem label={"设备名称"} className="ApSearchItem" style={{display: 'flex'}}>
							{getFieldDecorator('name')(
								<Input placeholder="请输入设备名称" />
							)}
						</FormItem>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12} xl={8}>
						<FormItem label={"设备类型"} className="ApSearchItem" style={{display: 'flex'}}>
							{getFieldDecorator('type')(
								<Input placeholder="请输入设备类型" />
							)}
						</FormItem>
					</Col>
					{
						(this.state.expand)
						?<Col xs={24} sm={24} md={12} lg={12} xl={8}>
							<FormItem label={"设备MAC"} className="ApSearchItem" style={{display: 'flex'}}>
								{getFieldDecorator('mac')(
									<Input placeholder="请输入设备MAC地址" />
								)}
							</FormItem>
						</Col>
						:<Col xs={24} sm={24} md={12} lg={12} xl={8}>
							<FormItem>
								<Button type="primary" htmlType="submit">查询</Button>
								<Button type="default" style={{marginLeft: 15}} onClick={this.onClear.bind(this)}>清空</Button>
								<a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle.bind(this)}>
									<span>{this.state.expand ? '普通搜索' : '高级搜索'}</span>
									<Icon type={this.state.expand ? 'up' : 'down'} />
								</a>
							</FormItem>
						</Col>
					}
				</Row>
				{
					(this.state.expand)
					?<div>
						<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom:15}}>
							<Col xs={24} sm={24} md={12} lg={12} xl={8}>
								<FormItem label={"客户名称"} className="ApSearchItem" style={{display: 'flex'}}>
									{getFieldDecorator('clientName')(
										<Input placeholder="请输入客户名称" />
									)}
								</FormItem>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12} xl={8}>
								<FormItem label={"设备分组"} className="ApSearchItem" style={{display: 'flex'}}>
									{getFieldDecorator('group')(
										<Input placeholder="请输入分组名称" />
									)}
								</FormItem>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12} xl={8}>
								<FormItem label={"IP地址"} className="ApSearchItem" style={{display: 'flex'}}>
									{getFieldDecorator('ip')(
										<Input placeholder="请输入WAN口IP/LAN口IP" />
									)}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom:15}}>
							<Col xs={24} sm={24} md={12} lg={12} xl={8}>
								<FormItem label={"SSID名称"} className="ApSearchItem" style={{display: 'flex'}}>
									{getFieldDecorator('ssid')(
										<Input placeholder="请输入SSID名称" />
									)}
								</FormItem>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12} xl={8}>
								<FormItem label={"固件版本"} className="ApSearchItem" style={{display: 'flex'}}>
									{getFieldDecorator('version')(
										<Input placeholder="请输入固件版本" />
									)}
								</FormItem>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12} xl={8}>
								<FormItem label={"注册时间"} className="ApSearchItem" style={{display: 'flex'}}>
									{getFieldDecorator('time')(
										<RangePicker className="rangeDatePicker" 
											style={{display: 'flex', flex: 1}}
										/>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={24} style={{ textAlign: 'right' }}>
							<Button type="primary" htmlType="submit">查询</Button>
							<Button style={{ marginLeft: 15 }} onClick={this.onClear.bind(this)}>清空</Button>
							<a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle.bind(this)}>
								<span>{this.state.expand ? '收起' : '高级搜索'}</span>
								<Icon type={this.state.expand ? 'up' : 'down'} />
							</a>
							</Col>
						</Row>
					</div>
					:""
				}
			</Form>
		);
	}
}

//
ApSearchForm.propTypes = {
	form: PropTypes.object,
};

const ApSearchFormWrapper = Form.create()(ApSearchForm);

export default ApSearchFormWrapper;