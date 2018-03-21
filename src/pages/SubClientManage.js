import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import SubClientTable from '../components/Client/SubClientTable';

//
export default class SubClientManage extends React.Component {
    //
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <PageLayoutContainer 
				selMenu={["客户管理"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'subClient', title: '下级客户管理', link: '/subClient'},
					// {key: 'subRole', title: '客户角色管理', link: '/subRole'}
				]}
				defaultMenuKey="subClient"
			>
				<div className="pageWrapper">
					<div className="pageApContent">
						<div className="pageApBody">
							<SubClientTable></SubClientTable>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
        );
    }
}