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
				menuTops={[
					{key: 'msgCenter', title: '实时报警', link: '/msgCenter'},
					{key: 'msgCenter?his=1', title: '历史报警', link: '/msgCenter?his=1'}
				]}
				defaultMenuKey="msgCenter"
			>
				<div className="pageWrapper">
					<div className="pageContent">
						<MsgTableWarn></MsgTableWarn>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}