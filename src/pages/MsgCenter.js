import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import css from './Profile.css';
import PageHeader from '../components/PageHeader';
import MsgTableWarn from '../components/MsgCenter/MsgTableWarn';

// const


//
export default class PwdReset extends React.Component {
	constructor(props) {
		super(props);
	}

	//
	render() {
		return (
			<PageLayoutContainer
				selMenu={[]}
				subMenu={[]}
				collapsed={true}
			>
				<div className="pageWrapper">
					<PageHeader
						title="报警消息"
					></PageHeader>
					<div className="pageContent">
						<MsgTableWarn></MsgTableWarn>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}