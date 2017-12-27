import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import LogOperationSearchFormWrapper from '../components/LogOperationSearchForm';
import LogOperationTable from '../components/LogOperationTable';

//
export default class LogOperation extends React.Component {
	//
	constructor(props) {
		super(props);
	}

	//
	render() {
		return (
			<div>
				<PageLayoutContainer 
					selMenu={["日志管理"]}
					subMenu={["设备管理", "用户管理", "系统管理"]}
					menuTops={[
						{key: 'logSystem', title: '平台管理日志', link: '/logSystem'},
						{key: 'logOperation', title: '设备操作日志', link: '/logOperation'},
					]}
					defaultMenuKey="logOperation"
				>
					<div className="pageWrapper">
						<div className="pageApContent">
							<div className="pageApBody">
								<LogOperationSearchFormWrapper></LogOperationSearchFormWrapper>
								<LogOperationTable></LogOperationTable>
							</div>
						</div>
					</div>
				</PageLayoutContainer>
			</div>
		);
	}
}