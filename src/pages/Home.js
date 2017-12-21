import React from 'react';
import { Row, Col } from 'antd';
import PageLayoutContainer from '../components/PageLayoutContainer';
import css from './Home.css';
import HomeCard from '../components/HomeCard';


//
export default class Home extends React.Component {

	//
	constructor(props) {
		super(props);
	}

	//
	componentDidMount() {

	}

	//
	render() {
		return (
			<PageLayoutContainer selMenu={["系统首页"]} subMenu={["设备管理", "用户管理"]}>
				<div className="content">
					<Row gutter={{xs: 8, sm: 16, md: 24}}>
						<Col xs={24} sm={12} md={12} lg={12} xl={6}>
							<HomeCard></HomeCard>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={6}>
							<HomeCard></HomeCard>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={6}>
							<HomeCard></HomeCard>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={6}>
							<HomeCard></HomeCard>
						</Col>
					</Row>
				</div>
			</PageLayoutContainer>
		);
	}
}