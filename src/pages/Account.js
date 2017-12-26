import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import AccountTable from '../components/AccountTable';

//
export default class SubAccount extends React.Component {
	//
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<PageLayoutContainer 
				selMenu={["账号管理"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'account', title: '本级账号管理', link: '/account'},
				]}
				defaultMenuKey="account"
			>
				<div className="pageWrapper">
					<div className="pageApContent">
						<div className="pageApBody">
							<AccountTable></AccountTable>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}