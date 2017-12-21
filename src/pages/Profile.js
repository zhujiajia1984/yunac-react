import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import css from './Profile.css';
import PageHeader from '../components/PageHeader';
import ProfileInfo from '../components/ProfileInfo';
import ProfileBody from '../components/ProfileBody';

// const


//
export default class PwdReset extends React.Component {
	constructor(props) {
		super(props);
	}

	//
	render() {
		return (
			<PageLayoutContainer selMenu={[""]} subMenu={["设备管理", "用户管理"]}>
				<div className="pageWrapper">
					<PageHeader
						title="个人中心"
					></PageHeader>
					<div className="pageContent">
						<div className="profileInfo">
							<ProfileInfo></ProfileInfo>
						</div>
						<div className="profileBody">
							<ProfileBody></ProfileBody>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}