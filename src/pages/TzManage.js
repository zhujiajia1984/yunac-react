import React from 'react';
import PageLayoutContainer from '../components/PageLayoutContainer';
import TzSearchFormWrapper from '../components/TzSearchForm';
import TzManageTable from '../components/TzManageTable';
import { Radio } from 'antd';

//
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
//
export default class TzManage extends React.Component {
	//
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<PageLayoutContainer 
				selMenu={["探针管理"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'tzManage', title: '探针状态管理', link: '/tzManage'},
					// {key: 'tzType', title: '探针型号管理', link: '/tzType'}
				]}
				defaultMenuKey="tzManage"
			>
				<div className="pageWrapper">
					<div className="pageApContent">
						<div className="pageAptype">
							<RadioGroup defaultValue="a">
								<RadioButton value="a">本级探针</RadioButton>
								<RadioButton value="b">下级探针</RadioButton>
							</RadioGroup>
						</div>
						<div className="pageApBody">
							<TzSearchFormWrapper></TzSearchFormWrapper>
							<TzManageTable></TzManageTable>
						</div>
					</div>
				</div>
			</PageLayoutContainer>
		);
	}
}