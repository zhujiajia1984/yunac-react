import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import apConfigCss from './ApConfig.css';
import { Tabs, Card, Popconfirm, message, } from 'antd';
import ApGeneralSetting from '../components/ApConfig/ApGeneralSetting';
import ApSsidSetting from '../components/ApConfig/ApSsidSetting';
import BlackWhiteList from '../components/ApConfig/BlackWhiteList';

// const
const TabPane = Tabs.TabPane;

//
export default class ApConfig extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			genSetloading: false,
		}
	}


	//
	render() {
		return (
			<PageLayoutContainer 
				selMenu={["AP管理"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'apConfig', title: 'AP远程配置', link: '/apConfig'},
				]}
				defaultMenuKey="apConfig"
			>
				<div className="pageWrapper">
					<div className="pageApContent">
						<div className="card-container">
							<Tabs type="card" defaultActiveKey="24">
								<TabPane tab="2.4G配置" key="24">
									<ApGeneralSetting></ApGeneralSetting>
									<ApSsidSetting></ApSsidSetting>
								</TabPane>
								<TabPane tab="5.8G配置" key="58">
									<ApGeneralSetting></ApGeneralSetting>
									<ApSsidSetting></ApSsidSetting>
								</TabPane>
								<TabPane tab="安全设置" key="safe">
									<BlackWhiteList></BlackWhiteList>
								</TabPane>
							</Tabs>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}