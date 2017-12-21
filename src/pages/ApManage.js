import React from 'react';
import { Tabs } from 'antd';
import PageLayoutContainer from '../components/PageLayoutContainer';
import PageHeader from '../components/PageHeader';
import cssApManage from './ApManage.css';
import ApSearchFormWrapper from '../components/ApSearchForm';

// const
const TabPane = Tabs.TabPane;

//
export default class ApManage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<PageLayoutContainer selMenu={["AP管理"]} subMenu={["设备管理", "用户管理"]}>
				<div className="pageWrapper">
					<PageHeader
						title="AP管理"
						naviDatas={[
							{name: "首页", link: "/index", type: "common"}, 
							{name: "设备管理", link: "", type: "common"}, 
							{name: "AP管理", link: "current", type: "current"}
						]}
					></PageHeader>
					<div className="pageApContent">
						<div className="pageApBody">
							<Tabs defaultActiveKey="1">
								<TabPane tab="AP列表" key="1">
									<ApSearchFormWrapper></ApSearchFormWrapper>
								</TabPane>
								<TabPane tab="AP配置" key="2"></TabPane>
							</Tabs>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}