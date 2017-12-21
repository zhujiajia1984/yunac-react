import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import css from './EditPwd.css';
import PageHeader from '../components/PageHeader';

//
export default class EditPwd extends React.Component {
	//
	constructor(props) {
		super(props);
	}

	//
	render() {
		return (
			<PageLayoutContainer selMenu={[]} subMenu={["设备管理", "用户管理"]}>
				<div className="pageWrapper">
					<PageHeader
						title="修改密码"
					></PageHeader>
					<div className="pageContent">
						content
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}