import React from 'react';
import { Row, Col, Card, DatePicker, Select, Modal, Button, Icon, Radio } from 'antd';
import PageLayoutContainer from '../components/PageLayoutContainer';
import HomeCard from '../components/HomeCard';
import css from './Home.css';
import ApUserHis from '../components/Home/ApUserHis';
import moment from 'moment';
import ApTimeHis from '../components/Home/ApTimeHis';
import ApFlowHis from '../components/Home/ApFlowHis';
import ApUserHisTable from '../components/Home/ApUserHisTable';
import ApFlowHisTable from '../components/Home/ApFlowHisTable';


// const
const { RangePicker } = DatePicker;
const { Meta } = Card;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

//
export default class HomeTongji extends React.Component {

	//
	constructor(props) {
		super(props);
		this.state = {
			devUserCurTime: 7,
			devFlowCurTime: 7,
			modalTitle: '',
			modalVisible: false,
			devUserExpand: false,
			devFlowExpand: false,
			curDevUserCondition: 'all',
			curDevFlowCondition: 'all',
		}
	}

	//
	componentDidMount() {
		// this.props.history.push("/index");
	}

	//
	changeDevUserTime(time, e) {
		e.preventDefault();
		this.setState({ devUserCurTime: time });
	}

	//
	changeDevFlowTime(time, e) {
		e.preventDefault();
		this.setState({ devFlowCurTime: time });
	}

	//
	devUserToggle() {
		this.setState({ devUserExpand: !this.state.devUserExpand });
	}

	//
	devUserConChange(e) {
		this.setState({ curDevUserCondition: e.target.value });
	}

	//
	devFlowToggle() {
		this.setState({ devFlowExpand: !this.state.devFlowExpand });
	}

	//
	devFlowConChange(e) {
		this.setState({ curDevFlowCondition: e.target.value });
	}

	//
	render() {
		const devUserExtra = (
			<div className="devUserExtraDiv">
				<a className={(this.state.devUserCurTime==7)?"curTime":""} onClick={this.changeDevUserTime.bind(this, 7)}>最近7天</a>
				<a className={(this.state.devUserCurTime==30)?"curTime":""} onClick={this.changeDevUserTime.bind(this, 30)}>最近30天</a>
				<div className="dateSel">
					<RangePicker format={"YYYY-MM-DD"}
						allowClear={false}
						defaultValue={[moment().subtract(7, 'days'), moment().subtract(1, 'days')]}
					></RangePicker>
				</div>
				<div>
					<a style={{ fontSize: 12 }} onClick={this.devUserToggle.bind(this)}>
						<span>{this.state.devUserExpand ? '收起' : '更多'}</span>
						<Icon type={this.state.devUserExpand ? 'up' : 'down'} />
					</a>
				</div>
			</div>
		)
		const devTimeExtra = (
			<div className="devUserExtraDiv">
				<a className={(this.state.devFlowCurTime==7)?"curTime":""} onClick={this.changeDevFlowTime.bind(this, 7)}>最近7天</a>
				<a className={(this.state.devFlowCurTime==30)?"curTime":""} onClick={this.changeDevFlowTime.bind(this, 30)}>最近30天</a>
				<div className="dateSel">
					<RangePicker format={"YYYY-MM-DD"}
						allowClear={false}
						defaultValue={[moment().subtract(7, 'days'), moment().subtract(1, 'days')]}
					></RangePicker>
				</div>
				<div>
					<a style={{ fontSize: 12 }} onClick={this.devFlowToggle.bind(this)}>
						<span>{this.state.devFlowExpand ? '收起' : '更多'}</span>
						<Icon type={this.state.devFlowExpand ? 'up' : 'down'} />
					</a>
				</div>
			</div>
		)
		let devUserContent = null;
		if (this.state.curDevUserCondition == "all") {
			devUserContent = '';
		} else if (this.state.curDevUserCondition == "group") {
			devUserContent = (
				<Select
					mode="tags"
					style={{ width: 500, marginLeft: 8 }}
				>
					<Option value="lucy">分组1</Option>
					<Option value="lucy1">分组2</Option>
					<Option value="lucy3">分组3</Option>
				</Select>
			)
		} else if (this.state.curDevUserCondition == "dev") {
			devUserContent = (
				<Select
					mode="tags"
					style={{ width: 500, marginLeft: 8 }}
				>
					<Option value="nacy">11:22:33:44:55:66</Option>
					<Option value="nacy1">aa:bb:cc:dd:ee:ff</Option>
					<Option value="nacy2">5f:1e:2m:4f:8e:1d</Option>
				</Select>
			)
		}
		const devUserExpandDiv = (
			<div>
				<RadioGroup defaultValue="all" onChange={this.devUserConChange.bind(this)}>
					<RadioButton value="all">所有设备</RadioButton>
					<RadioButton value="group">按分组</RadioButton>
					<RadioButton value="dev">按设备</RadioButton>
				</RadioGroup>
				{devUserContent}
				<Button type="primary" style={{marginLeft: 8}}>查询</Button>
			</div>
		)
		let devFlowContent = null;
		if (this.state.curDevFlowCondition == "all") {
			devFlowContent = '';
		} else if (this.state.curDevFlowCondition == "group") {
			devFlowContent = (
				<Select
					mode="tags"
					style={{ width: 500, marginLeft: 8 }}
				>
					<Option value="flow1">分组1</Option>
					<Option value="flow2">分组2</Option>
					<Option value="flow3">分组3</Option>
				</Select>
			)
		} else if (this.state.curDevFlowCondition == "dev") {
			devFlowContent = (
				<Select
					mode="tags"
					style={{ width: 500, marginLeft: 8 }}
				>
					<Option value="flon1">11:22:33:44:55:66</Option>
					<Option value="flon2">aa:bb:cc:dd:ee:ff</Option>
					<Option value="flon3">5f:1e:2m:4f:8e:1d</Option>
				</Select>
			)
		}
		const devFlowExpandDiv = (
			<div>
				<RadioGroup defaultValue="all" onChange={this.devFlowConChange.bind(this)}>
					<RadioButton value="all">所有设备</RadioButton>
					<RadioButton value="group">按分组</RadioButton>
					<RadioButton value="dev">按设备</RadioButton>
				</RadioGroup>
				{devFlowContent}
				<Button type="primary" style={{marginLeft: 8}}>查询</Button>
			</div>
		)
		return (
			<PageLayoutContainer 
				selMenu={["系统首页"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'index', title: '实时监控', link: '/index'},
					{key: 'hometongji', title: '数据统计', link: '/hometongji'},
				]}
				defaultMenuKey="hometongji"
			>
				<div className="content">
					<span style={{fontSize: 20, fontWeight: 500, marginBottom: 5}}
					>昨日数据</span>
					<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 0}}>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<HomeCard name="AP使用人数"
								detail="昨日使用AP的总用户人数"
								content="5843"
								imageUrl="https://weiquaninfo.cn/images/22.png"
								f1Title="2.4G人数："
								f1Content="1000"
								f2Title="5.8G人数："
								f2Content="1500"
							></HomeCard>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={12}>
							<HomeCard name="AP使用流量"
								detail="昨日AP的总使用流量（上行+下行）"
								content="15.4"
								unit="GB"
								imageUrl="https://weiquaninfo.cn/images/44.png"
								f1Title="上行："
								f1Content="2.3GB"
								f2Title="下行："
								f2Content="14.3GB"
							></HomeCard>
						</Col>
					</Row>
					<span style={{fontSize: 20, fontWeight: 500, marginBottom: 5}}
					>历史统计</span>
					<Card bordered={false} className="DevUserCard">
						<Card title="AP使用人数统计" bordered={false} style={{ width: '100%' }}
							extra={devUserExtra}
						>
							{
								(this.state.devUserExpand)?
								<Meta 
									className="searchExpand"
									title={devUserExpandDiv}>
								</Meta>:
								""
							}
							<Row gutter={{xs: 8, sm: 16, md: 24}} >
								<Col xs={24} sm={24} md={24} lg={16} xl={16}>
									<div className="DevUserTitle">使用人数趋势</div>
									<ApUserHis curTime={this.state.devUserCurTime}></ApUserHis>
								</Col>
								<Col xs={24} sm={24} md={24} lg={8} xl={8}>
									<div className="DevUserTitle">使用人数Top10</div>
									<ApUserHisTable></ApUserHisTable>
								</Col>
							</Row>
						</Card>
					</Card>
					<Card bordered={false} className="DevUserCard">
						<Card title="AP使用流量统计" bordered={false} style={{ width: '100%' }}
							extra={devTimeExtra}
						>
							{
								(this.state.devFlowExpand)?
								<Meta 
									className="searchExpand"
									title={devFlowExpandDiv}>
								</Meta>:
								""
							}
							<Row gutter={{xs: 8, sm: 16, md: 24}} >
								<Col xs={24} sm={24} md={24} lg={16} xl={16}>
									<div className="DevUserTitle">使用流量趋势</div>
									<ApFlowHis></ApFlowHis>
								</Col>
								<Col xs={24} sm={24} md={24} lg={8} xl={8}>
									<div className="DevUserTitle">使用流量Top10</div>
									<ApFlowHisTable></ApFlowHisTable>
								</Col>
							</Row>
							
						</Card>
					</Card>
				</div>
			</PageLayoutContainer>
		);
	}
}