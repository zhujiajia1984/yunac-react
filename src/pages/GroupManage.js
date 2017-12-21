import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';

//
export default class GroupManage extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<PageLayoutContainer selMenu={["分组管理"]} subMenu={["设备管理", "用户管理"]}>
				<div>Group</div>
			</PageLayoutContainer>
		);
	}
}