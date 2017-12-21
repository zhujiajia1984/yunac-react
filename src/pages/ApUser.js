import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';

//
export default class ApUser extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<PageLayoutContainer selMenu={["AP用户"]} subMenu={["设备管理", "用户管理"]}>
				<div>ApUser</div>
			</PageLayoutContainer>
		);
	}
}