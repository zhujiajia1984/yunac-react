import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import { Tabs, Row, Col, Card, Switch } from 'antd';
import apMonitorCss from './ApMonitor.css';
import ApMonitorCpu from '../components/ApMonitor/ApMonitorCpu';
import ApMonitorFlow from '../components/ApMonitor/ApMonitorFlow';
import ApUserMonitorChart from '../components/ApMonitor/ApUserMonitorChart';
import ApUserMonitorTable from '../components/ApMonitor/ApUserMonitorTable';

// const
const TabPane = Tabs.TabPane;

//
export default class ApManage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let ApUserMonitorChart = <ApUserMonitorChart></ApUserMonitorChart>
		return (
			<PageLayoutContainer 
				selMenu={["AP管理"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'apMonitor', title: 'AP实时监控', link: '/apMonitor'},
				]}
				defaultMenuKey="apMonitor"
			>
				<div className="pageWrapper">
					<div className="pageApContent">
						<div className="pageApMonitorBody">
							<div className="apMonitorInfo">
								<Card title="基础信息" bordered={false} style={{ width: '100%', marginBottom: 24 }}>
									<Row gutter={{xs: 8, sm: 16, md: 24}} >
										<Col xs={24} sm={24} md={24} lg={8} xl={8}>
											<span>设备MAC：</span>
											<span style={{marginLeft: 10}}>ef:dd:32:e8:1t:65</span>
										</Col>
										<Col xs={24} sm={24} md={24} lg={8} xl={8}>
											<span>设备名称：</span>
											<span style={{marginLeft: 10}}>测试123</span>
										</Col>
										<Col xs={24} sm={24} md={24} lg={8} xl={8}>
											<span>运行模式：</span>
											<span style={{marginLeft: 10}}>AP</span>
										</Col>
									</Row>
									<Row gutter={{xs: 8, sm: 16, md: 24}} >
										<Col xs={24} sm={24} md={24} lg={8} xl={8}>
											<span>固件版本：</span>
											<span style={{marginLeft: 10}}>v20171220-DBUI1.0.12</span>
										</Col>
										<Col xs={24} sm={24} md={24} lg={8} xl={8}>
											<span>本地时间：</span>
											<span style={{marginLeft: 10}}>2018-01-02 10:43:24</span>
										</Col>
										<Col xs={24} sm={24} md={24} lg={8} xl={8}>
											<span>运行时长：</span>
											<span style={{marginLeft: 10}}>20小时19分钟45秒</span>
										</Col>
									</Row>
								</Card>
							</div>
							<div className="pageApMonitorRow">
								<Row gutter={{xs: 8, sm: 16, md: 24}} >
									<Col xs={24} sm={24} md={24} lg={12} xl={12}>
										<div>
											<Card title="CPU/内存" bordered={false} style={{ width: '100%', marginBottom: 24 }}
												extra={<span style={{color: '#3AA1FF'}}>近1小时</span>}
											>
												<ApMonitorCpu></ApMonitorCpu>
											</Card>
										</div>
									</Col>
									<Col xs={24} sm={24} md={24} lg={12} xl={12}>
										<div style={{height: 400}}>
											<Card title="实时流量" bordered={false} style={{ width: '100%', marginBottom: 24 }}
												extra={<span style={{color: '#3AA1FF'}}>近1小时</span>}
											>
												<ApMonitorFlow></ApMonitorFlow>
											</Card>
										</div>
									</Col>
								</Row>
							</div>
							<div className="pageApMonitorRow" style={{marginTop: 0}}>
								<Row gutter={{xs: 8, sm: 16, md: 24}} >
									<Col xs={24} sm={24} md={24} lg={24} xl={24}>
										<div>
											<Card title="连接终端数" bordered={false} style={{ width: '100%', marginBottom: 24 }}
												extra={<div><span style={{marginRight: 10}}>自动刷新</span><Switch defaultChecked /></div>}
											>
												<ApUserMonitorTable></ApUserMonitorTable>
											</Card>
										</div>
									</Col>
								</Row>
							</div>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}