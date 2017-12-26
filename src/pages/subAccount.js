import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import SubAccountTable from '../components/SubAccountTable';

//
export default class SubAccount extends React.Component {
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
					{key: 'subAccount', title: '下级账号管理', link: '/subAccount'},
				]}
				defaultMenuKey="subAccount"
			>
				<div className="pageWrapper">
					<div className="pageApContent">
						<div className="pageApBody">
							<SubAccountTable></SubAccountTable>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}