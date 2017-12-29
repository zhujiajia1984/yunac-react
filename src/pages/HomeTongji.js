import React from 'react';
import { Row, Col, Card, DatePicker } from 'antd';
import PageLayoutContainer from '../components/PageLayoutContainer';
import HomeCard from '../components/HomeCard';
import css from './Home.css';
import ApUserHis from '../components/Home/ApUserHis';
import moment from 'moment';
import ApTimeHis from '../components/Home/ApTimeHis';
import ApFlowHis from '../components/Home/ApFlowHis';


const { RangePicker } = DatePicker;

//
export default class HomeTongji extends React.Component {

	//
	constructor(props) {
		super(props);
		this.state = {
			devUserCurTime: 7
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
			<RangePicker format={"YYYY-MM-DD"}
				style={{width: 220,}}
				ranges={{'最近7天': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
					'最近30天': [moment().subtract(30, 'days'), moment().subtract(1, 'days')]
				}}
				defaultValue={[moment().subtract(7, 'days'), moment().subtract(1, 'days')]}
				allowClear={false}
			></RangePicker>
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
						<Col xs={24} sm={24} md={12} lg={12} xl={6}>
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
						<Col xs={24} sm={24} md={12} lg={12} xl={6}>
							<HomeCard name="AP使用人数"
								detail="昨日使用AP的总用户人数"
								content="5843"
								imageUrl="https://weiquaninfo.cn/images/22.png"
								f1Title="AP使用人次："
								f1Content="1000"
							></HomeCard>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={6}>
							<HomeCard name="AP人均使用时长"
								detail="昨日AP的人均使用时长"
								content="237"
								unit="分钟"
								imageUrl="https://weiquaninfo.cn/images/33.png"
								f1Title="AP使用总时长："
								f1Content="5000分钟"
							></HomeCard>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={6}>
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
					<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 24}}>
						<Col span={24}>
							<Card bordered={false} className="DevUserCard">
								<Card title="AP使用人数统计" bordered={false} style={{ width: '100%' }}
									extra={devUserExtra}
								>
									<ApUserHis curTime={this.state.devUserCurTime}></ApUserHis>
								</Card>
							</Card>
						</Col>
					</Row>
					<Row gutter={{xs: 8, sm: 16, md: 24}} >
						<Col xs={24} sm={24} md={24} lg={12} xl={12} style={{marginBottom: 24}}>
							<Card bordered={false} className="DevUserCard">
								<Card title="AP人均使用时长统计" bordered={false} style={{ width: '100%' }}
									extra={devTimeExtra}
								>
									<ApTimeHis curTime={this.state.devUserCurTime}></ApTimeHis>
								</Card>
							</Card>
						</Col>
						<Col xs={24} sm={24} md={24} lg={12} xl={12} style={{marginBottom: 24}}>
							<Card bordered={false} className="DevUserCard">
								<Card title="AP使用流量统计" bordered={false} style={{ width: '100%' }}
									extra={devTimeExtra}
								>
									<ApFlowHis></ApFlowHis>
								</Card>
							</Card>
						</Col>
					</Row>
				</div>
			</PageLayoutContainer>
		);
	}
}