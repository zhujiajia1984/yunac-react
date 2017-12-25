import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import DevGroupTable from '../components/DevGroupTable';


//
export default class GroupManage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<PageLayoutContainer 
				selMenu={["分组管理"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'devGroup', title: '设备分组管理', link: '/groupManage'},
				]}
				defaultMenuKey="devGroup"
			>
				<div className="pageWrapper">
						<div className="pageApContent">
							<div className="pageApBody">
								<DevGroupTable></DevGroupTable>
							</div>
						</div>
					</div>
			</PageLayoutContainer>
		);
	}
}