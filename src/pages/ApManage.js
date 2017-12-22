import React from 'react';
import { Tabs } from 'antd';
import PageLayoutContainer from '../components/PageLayoutContainer';
import PageHeader from '../components/PageHeader';
import cssApManage from './ApManage.css';
import ApSearchFormWrapper from '../components/ApSearchForm';
import ApManageTableWrapper from '../components/ApManageTable';

// const
const TabPane = Tabs.TabPane;

//
export default class ApManage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const pageHeader = (<PageHeader
						title="AP管理"
						naviDatas={[
							{name: "首页", link: "/index", type: "common"}, 
							{name: "设备管理", link: "", type: "common"}, 
							{name: "AP管理", link: "current", type: "current"}
						]}
					></PageHeader>);
		const detail = (
			<div style={{marginBottom: 15, fontSize: 12}}>
				<span>设备总数：</span><span style={{marginRight: 16}}>103</span>
				<span>在线数量：</span><span style={{marginRight: 16}}>100</span>
				<span>离线数量：</span><span style={{marginRight: 16}}>3</span>
			</div>
		)
		return (
			<PageLayoutContainer selMenu={["AP管理"]} subMenu={["设备管理", "用户管理"]}>
				<div className="pageWrapper">
					
					<div className="pageApContent">
						<div className="pageApBody">
							<ApSearchFormWrapper></ApSearchFormWrapper>
							<ApManageTableWrapper></ApManageTableWrapper>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}