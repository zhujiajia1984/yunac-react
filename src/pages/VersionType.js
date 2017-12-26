import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import VersionTypeTable from '../components/VersionTypeTable';

//
export default class VersionType extends React.Component {
	//
	constructor(props) {
		super(props);
	}

	//
	render() {
		return (
			<div>
				<PageLayoutContainer 
					selMenu={["固件管理"]}
					subMenu={["设备管理", "用户管理", "系统管理"]}
					menuTops={[
						{key: 'version', title: '固件版本管理', link: '/version'},
						{key: 'versionType', title: '固件型号管理', link: '/versionType'},
					]}
					defaultMenuKey="versionType"
				>
					<div className="pageWrapper">
						<div className="pageApContent">
							<div className="pageApBody">
								<VersionTypeTable></VersionTypeTable>
							</div>
						</div>
					</div>
				</PageLayoutContainer>
			</div>
		);
	}
}