import React from 'react';
import { Form, Col, Row, Input, Button, Icon, DatePicker, Select } from 'antd';
import PropTypes from 'prop-types';
import apSearchCss from './ApSearchFrom.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// const
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

//
class ApUserSearchForm extends React.Component {
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
				style={{marginTop: 16}}
			>
				<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom:15}}>
					<Col xs={24} sm={24} md={12} lg={12} xl={6}>
						<FormItem label={"终端MAC"} className="ApSearchItem" style={{display: 'flex'}}>
							{getFieldDecorator('name')(
								<Input placeholder="请输入终端MAC地址" />
							)}
						</FormItem>
					</Col>
					<Col xs={24} sm={24} md={12} lg={12} xl={6}>
						<FormItem label={"连接频率"} className="ApSearchItem" style={{display: 'flex'}}>
							{getFieldDecorator('type', {initialValue: "all"})(
								<Select style={{ width: '100%' }}>
									<Option value="all">全部</Option>
									<Option value="2.4G">2.4G</Option>
									<Option value="5.8G">5.8G</Option>
								</Select>
							)}
						</FormItem>
					</Col>
					{
						(this.state.expand)
						?<div>
							<Col xs={24} sm={24} md={12} lg={12} xl={6}>
								<FormItem label={"SSID名称"} className="ApSearchItem" style={{display: 'flex'}}>
									{getFieldDecorator('mac')(
										<Input placeholder="终端品牌" />
									)}
								</FormItem>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12} xl={6}>
								<FormItem label={"终端品牌"} className="ApSearchItem" style={{display: 'flex'}}>
									{getFieldDecorator('mac')(
										<Input placeholder="终端品牌" />
									)}
								</FormItem>
							</Col>
						</div>
						:<Col xs={24} sm={24} md={12} lg={12} xl={6}>
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
							<Col xs={24} sm={24} md={12} lg={12} xl={6}>
								<FormItem label={"AP名称"} className="ApSearchItem" style={{display: 'flex'}}>
									{getFieldDecorator('clientName')(
										<Input placeholder="请输入AP名称" />
									)}
								</FormItem>
							</Col>
							<Col xs={24} sm={24} md={12} lg={12} xl={6}>
								<FormItem label={"AP-MAC"} className="ApSearchItem" style={{display: 'flex'}}>
									{getFieldDecorator('group')(
										<Input placeholder="请输入AP设备MAC地址" />
									)}
								</FormItem>
							</Col>
							<div>
								<Col xs={24} sm={24} md={12} lg={12} xl={6}>
									<FormItem label={"终端IP地址"} className="ApSearchItem" style={{display: 'flex'}}>
										{getFieldDecorator('ip')(
											<Input placeholder="请输入终端IP地址" />
										)}
									</FormItem>
								</Col>
								<Col xs={24} sm={24} md={12} lg={12} xl={6}>
									<Button type="primary" htmlType="submit">查询</Button>
									<Button style={{ marginLeft: 15 }} onClick={this.onClear.bind(this)}>清空</Button>
									<a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle.bind(this)}>
										<span>{this.state.expand ? '收起' : '高级搜索'}</span>
										<Icon type={this.state.expand ? 'up' : 'down'} />
									</a>
								</Col>
							</div>	
						</Row>
					</div>
					:""
				}
			</Form>
		);
	}
}

//
ApUserSearchForm.propTypes = {
	form: PropTypes.object,
};

const ApUserSearchFormWrapper = Form.create()(ApUserSearchForm);

export default ApUserSearchFormWrapper;