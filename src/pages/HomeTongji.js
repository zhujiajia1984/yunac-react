import React from 'react';
import { Row, Col, Card, DatePicker } from 'antd';
import PageLayoutContainer from '../components/PageLayoutContainer';
import HomeCard from '../components/HomeCard';
import css from './Home.css';
import ApUserHis from '../components/Home/ApUserHis';
import moment from 'moment';
import ApTimeHis from '../components/Home/ApTimeHis';
import ApFlowHis from '../components/Home/ApFlowHis';
import ApUserHisTable from '../components/Home/ApUserHisTable';
import ApFlowHisTable from '../components/Home/ApFlowHisTable';

const { RangePicker } = DatePicker;

//
export default class HomeTongji extends React.Component {

	//
	constructor(props) {
		super(props);
		this.state = {
			devUserCurTime: 7,
			devFlowCurTime: 7,
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
						<Col xs={24} sm={24} md={12} lg={12} xl={8}>
							<HomeCard name="设备总数"
								detail="截止昨日24点的设备总数"
								content="123"
								imageUrl="https://weiquaninfo.cn/images/11.png"
								f1Title="AP数量："
								f1Content="100"
								f2Title="探针数量："
								f2Content="23"
							></HomeCard>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={8}>
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
						<Col xs={24} sm={24} md={12} lg={12} xl={8}>
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