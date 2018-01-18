import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import VersionTable from '../components/VersionTable';

//
export default class Version extends React.Component {
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
						// {key: 'versionType', title: '固件型号管理', link: '/versionType'},
					]}
					defaultMenuKey="version"
				>
					<div className="pageWrapper">
						<div className="pageApContent">
							<div className="pageApBody">
								<VersionTable></VersionTable>
							</div>
						</div>
					</div>
				</PageLayoutContainer>
			</div>
		);
	}
}