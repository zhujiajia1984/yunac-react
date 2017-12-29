import React from 'react';
import { Row, Col, Card, } from 'antd';
import PageLayoutContainer from '../components/PageLayoutContainer';
import css from './Home.css';
import DevInfo from '../components/Home/DevInfo';
import DevStatus from '../components/Home/DevStatus';
import DevUser from '../components/Home/DevUser';
import DevFlow from '../components/Home/DevFlow';

//
export default class Home extends React.Component {

	//
	constructor(props) {
		super(props);
		this.state = {
			devUserCurTime: 1,
			devFlowCurTime: 1,
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
				<a className={(this.state.devUserCurTime==1)?"curTime":""} onClick={this.changeDevUserTime.bind(this, 1)}>近1小时</a>
				<a className={(this.state.devUserCurTime==6)?"curTime":""} onClick={this.changeDevUserTime.bind(this, 6)}>近6小时</a>
				<a className={(this.state.devUserCurTime==0)?"curTime":""} onClick={this.changeDevUserTime.bind(this, 0)}>今日</a>
			</div>
		)
		const devFlowExtra = (
			<div className="devUserExtraDiv">
				<a className={(this.state.devFlowCurTime==1)?"curTime":""} onClick={this.changeDevFlowTime.bind(this, 1)}>近1小时</a>
				<a className={(this.state.devFlowCurTime==6)?"curTime":""} onClick={this.changeDevFlowTime.bind(this, 6)}>近6小时</a>
				<a className={(this.state.devFlowCurTime==0)?"curTime":""} onClick={this.changeDevFlowTime.bind(this, 0)}>今日</a>
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
				defaultMenuKey="index"
			>
				<div className="content">
					<Row gutter={{xs: 8, sm: 16, md: 24}} >
						<Col xs={24} sm={24} md={24} lg={12} xl={8}>
							<Card title="设备概况" bordered={false} style={{ width: '100%', marginBottom: 24 }}>
								<DevInfo></DevInfo>
							</Card>
						</Col>
						<Col xs={24} sm={24} md={24} lg={12} xl={16}>
							<Card title="设备状态" bordered={false} style={{ width: '100%', marginBottom: 24 }}>
								<DevStatus></DevStatus>
							</Card>
						</Col>
					</Row>
					<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 24}}>
						<Col span={24}>
							<Card bordered={false} className="DevUserCard">
								<Card title="AP在线用户趋势" bordered={false} style={{ width: '100%' }}
									extra={devUserExtra}
								>
									<DevUser curTime={this.state.devUserCurTime}></DevUser>
								</Card>
							</Card>
						</Col>
					</Row>
					<Row gutter={{xs: 8, sm: 16, md: 24}}>
						<Col span={24}>
							<Card title="AP流量趋势" bordered={false} style={{ width: '100%' }}
								extra={devFlowExtra}
							>
								<DevFlow curTime={this.state.devFlowCurTime}></DevFlow>
							</Card>
						</Col>
					</Row>
				</div>
			</PageLayoutContainer>
		);
	}
}