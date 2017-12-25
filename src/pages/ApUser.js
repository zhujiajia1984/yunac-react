import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import ApUserSearchFormWrapper from '../components/ApUserSearchForm';
import ApUserTable from '../components/ApUserTable';

//
export default class ApUser extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<PageLayoutContainer 
				selMenu={["AP用户"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'apUser', title: 'AP在线用户', link: '/apUser'},
				]}
				defaultMenuKey="apUser"
			>
				<div className="pageWrapper">
					<div className="pageApContent">
						<div className="pageApBody">
							<ApUserSearchFormWrapper></ApUserSearchFormWrapper>
							<ApUserTable></ApUserTable>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}