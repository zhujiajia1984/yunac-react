import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import LogSystemSearchFormWrapper from '../components/LogSystemSearchForm';
import LogSystemTable from '../components/LogSystemTable';

//
export default class LogSystem extends React.Component {
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
					defaultMenuKey="logSystem"
				>
					<div className="pageWrapper">
						<div className="pageApContent">
							<div className="pageApBody">
								<LogSystemSearchFormWrapper></LogSystemSearchFormWrapper>
								<LogSystemTable></LogSystemTable>
							</div>
						</div>
					</div>
				</PageLayoutContainer>
			</div>
		);
	}
}