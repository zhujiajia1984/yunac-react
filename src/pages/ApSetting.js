import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import ApSettingTable from '../components/ApSettingTable';

//
export default class ApSetting extends React.Component {
	//
	constructor(props) {
		super(props);
	}

	//
	render() {
		return (
			<div>
				<PageLayoutContainer 
					selMenu={["AP管理"]}
					subMenu={["设备管理", "用户管理"]}
					menuTops={[
						{key: 'ap', title: 'AP状态管理', link: '/apManage'},
						{key: 'peizhi', title: '配置文件管理', link: '/peizhi'},
						{key: 'apType', title: 'AP型号管理', link: '/apType'}
					]}
					defaultMenuKey="peizhi"
				>
					<div className="pageWrapper">
						<div className="pageApContent">
							<div className="pageApBody">
								<ApSettingTable></ApSettingTable>
							</div>
						</div>
					</div>
				</PageLayoutContainer>
			</div>
		);
	}
}