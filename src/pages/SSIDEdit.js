import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import SsidEditForm from '../components/ApConfig/SsidEditForm';

//
export default class SSIDEdit extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<PageLayoutContainer 
				selMenu={["AP管理"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'ssidEdit', title: 'SSID编辑', link: '/ssidEdit'},
				]}
				defaultMenuKey="ssidEdit"
			>
				<div className="pageWrapper">
					<div className="pageApContent">
						<SsidEditForm></SsidEditForm>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}