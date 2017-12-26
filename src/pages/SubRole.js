import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import SubRoleTable from '../components/SubRoleTable';

//
export default class SubRole extends React.Component {
	//
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<PageLayoutContainer 
				selMenu={["客户管理"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'subClient', title: '下级客户管理', link: '/subClient'},
					{key: 'subRole', title: '客户角色管理', link: '/subRole'}
				]}
				defaultMenuKey="subRole"
			>
				<div className="pageWrapper">
					<div className="pageApContent">
						<div className="pageApBody">
							<SubRoleTable></SubRoleTable>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}