import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';

//
export default class ApSetting extends React.Component {
	//
	constructor(props) {
		super(props);
	}

	//
	render() {
		return (
			<div>
				<PageLayoutContainer 
					selMenu={["AP管理"]}
					subMenu={["设备管理", "用户管理"]}
					menuTops={[
						{key: 'ap', title: 'AP列表', link: '/apManage'},
						{key: 'peizhi', title: '配置管理', link: '/peizhi'}
					]}
					defaultMenuKey="peizhi"
				>
					<div className="pageWrapper">
						<div className="pageApContent">
							<div className="pageApBody">
								body
							</div>
						</div>
					</div>
				</PageLayoutContainer>
			</div>
		);
	}
}