import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import TzSearchFormWrapper from '../components/TzSearchForm';
import TzManageTable from '../components/TzManageTable';

//
export default class TzManage extends React.Component {
	//
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<PageLayoutContainer 
				selMenu={["探针管理"]}
				subMenu={["设备管理", "用户管理"]}
				menuTops={[
					{key: 'tz', title: '探针状态管理', link: '/tzManage'},
					{key: 'tzType', title: '探针型号管理', link: '/tzType'}
				]}
				defaultMenuKey="tz"
			>
				<div className="pageWrapper">
					<div className="pageApContent">
						<div className="pageApBody">
							<TzSearchFormWrapper></TzSearchFormWrapper>
							<TzManageTable></TzManageTable>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}