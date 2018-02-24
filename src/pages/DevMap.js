import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import DevMapContainer from '../components/MapControl/DevMapContainer';
import PageHeader from '../components/PageHeader';

//
export default class DevMap extends React.Component {
	//
	constructor(props) {
		super(props);
	}


	//
	render() {
		return (
			<PageLayoutContainer 
				selMenu={["AP管理"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'map', title: '设备地图显示', link: '/devmap'},
				]}
				defaultMenuKey="map"
			>
				<div className="pageWrapper">
					<div className="pageApContent">
						<PageHeader
							title=""
							naviDatas={[
								{name: "AP管理", link: "/apManage", type: "common"},
								{name: "地图", link: "", type: "current"}
							]}
						></PageHeader>
						<DevMapContainer></DevMapContainer>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}