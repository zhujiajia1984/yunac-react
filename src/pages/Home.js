import React from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import PageLayoutContainer from '../components/PageLayoutContainer';
import css from './Home.css';
import DevInfo from '../components/Home/DevInfo';
import DevStatus from '../components/Home/DevStatus';
import DevUser from '../components/Home/DevUser';

// const
const TabPane = Tabs.TabPane;


//
export default class Home extends React.Component {

	//
	constructor(props) {
		super(props);
	}

	//
	componentDidMount() {
		// this.props.history.push("/index");
	}

	//
	render() {
		return (
			<PageLayoutContainer 
				selMenu={["系统首页"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'index', title: '实时监控', link: '/index'},
				]}
				defaultMenuKey="index"
			>
				<div className="content">
					<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 24}}>
						<Col xs={24} sm={24} md={24} lg={12} xl={8}>
							<Card title="设备概况" bordered={false} style={{ width: '100%' }}>
								<DevInfo></DevInfo>
							</Card>
						</Col>
						<Col xs={24} sm={24} md={24} lg={12} xl={16}>
							<Card title="设备状态" bordered={false} style={{ width: '100%' }}>
								<DevStatus></DevStatus>
							</Card>
						</Col>
					</Row>
					<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 24}}>
						<Col span={24}>
							<Card bordered={false} className="DevUserCard">
								<Card title="AP在线用户趋势" bordered={false} style={{ width: '100%' }}>
									<p>Card content</p>
									<p>Card content</p>
									<p>Card content</p>
								</Card>
							</Card>
						</Col>
					</Row>
					<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 24}}>
						<Col span={24}>
							<Card title="流量趋势" bordered={false} style={{ width: '100%' }}>
								<p>Card content</p>
								<p>Card content</p>
								<p>Card content</p>
							</Card>
						</Col>
					</Row>
				</div>
			</PageLayoutContainer>
		);
	}
}