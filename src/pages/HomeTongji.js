import React from 'react';
import { Row, Col, Card, } from 'antd';
import PageLayoutContainer from '../components/PageLayoutContainer';
import HomeCard from '../components/HomeCard';


//
export default class HomeTongji extends React.Component {

	//
	constructor(props) {
		super(props);
	}

	//
	componentDidMount() {
		// this.props.history.push("/index");
	}

	//
	render() {
		return (
			<PageLayoutContainer 
				selMenu={["系统首页"]}
				subMenu={["设备管理", "用户管理", "系统管理"]}
				menuTops={[
					{key: 'index', title: '实时监控', link: '/index'},
					{key: 'hometongji', title: '数据统计', link: '/hometongji'},
				]}
				defaultMenuKey="hometongji"
			>
				<div className="content">
					<span style={{fontSize: 20, fontWeight: 500, marginBottom: 5}}
					>昨日数据</span>
					<Row gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom: 24}}>
						<Col xs={24} sm={24} md={12} lg={12} xl={6}>
							<HomeCard name="设备总数"
								detail="截止昨日24点的设备总数"
								content="123"
								imageUrl="https://weiquaninfo.cn/images/11.png"
							></HomeCard>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={6}>
							<HomeCard name="AP访问用户数"
								detail="昨日使用AP的总用户人数"
								content="5843"
								imageUrl="https://weiquaninfo.cn/images/22.png"
							></HomeCard>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={6}>
							<HomeCard name="AP人均访问时长"
								detail="昨日AP的人均使用时长"
								content="237"
								unit="分钟"
								imageUrl="https://weiquaninfo.cn/images/33.png"
							></HomeCard>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12} xl={6}>
							<HomeCard name="AP使用流量"
								detail="昨日AP的总使用流量（上行+下行）"
								content="15.4"
								unit="GB"
								imageUrl="https://weiquaninfo.cn/images/44.png"
							></HomeCard>
						</Col>
					</Row>
				</div>
			</PageLayoutContainer>
		);
	}
}