import React from 'react';
import { Layout, Menu, Icon, Dropdown, Avatar, Badge, Popover, Tabs, List } from 'antd';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import css from '../css/mylayout.css';
import { withRouter } from 'react-router';

// const
const { Header, Content, Footer, Sider } = Layout;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
const siderWidth = 256;
const MENU_LOGOUT_KEY = 'logout';
const MENU_PROFILE_KEY = 'profile';
const noticeData = [{
		title: 'AP离线报警',
		desp: 'mac ef:12:23:45:55:87  2017-12-29 14:23',
	},
	{
		title: '探针离线报警',
		desp: 'mac ef:12:23:45:55:87 2017-12-26 14:23',
	},
	{
		title: '显示日期最近的3条报警',
		desp: 'mac ef:12:23:45:55:87 2017-12-22 14:23',
	},
];

//
class PageLayout extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			collapsed: this.props.collapsed,
		}
	}

	//
	onRightSysMenu(values) {
		switch (values.key) {
			case MENU_LOGOUT_KEY:
				this.props.history.push("/");
				break;
			case MENU_PROFILE_KEY:
				this.props.history.push("/profile");
				break;
			default:
				alert("menu unknow");
		}
	}

	// 显示or隐藏侧边栏
	toggleSider() {
		this.setState({ collapsed: !this.state.collapsed });
	}

	//
	onTopMenuChange(item) {
		this.props.history.push(`/${item.key}`);
	}

	//
	msgCenter() {
		this.props.history.push('/msgCenter');
	}

	//
	render() {
		const noticeContent = (
			<div>
						<List
							itemLayout="horizontal"
							dataSource={noticeData}
							renderItem={(item)=>{
								return <List.Item style={{paddingLeft: 24, paddingRight: 24 }}>
										<List.Item.Meta
											avatar={<Icon type="minus-circle" style={{fontSize: 20, color: '#fe5d58'}}/>}
											title={item.title}
											description={item.desp}
											className="noticeItemImg"
										/>
									</List.Item>
								}}
						/>
						<div className="noticeFooter" onClick={this.msgCenter.bind(this)}>
							<span className="noticeFootBtn">查看更多</span>
						</div>
					</div>
		)
		return (
			<Layout style={{minHeight: '100vh'}}>
				<Sider
					width={siderWidth}
					trigger={null}
					collapsible={true}
					collapsed={this.state.collapsed}
					onCollapse={this.toggleSider.bind(this)}
					style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
				>
					{
						(this.state.collapsed)
						?<div className="LogoAreaMini">
							<Icon type="cloud-o" style={{color: 'white', fontSize: '32px'}}/>
						</div>
						:<div className="LogoArea">
							<img className="Logo" src={require("../../dist/assets/images/logo.png")} alt="logo"/>
						</div>
					}
					<Menu 
						theme="dark"
						defaultSelectedKeys={this.props.selMenu}
						defaultOpenKeys={this.props.subMenu}
						inlineIndent= {24}
						mode="inline"
					>
						{this.props.menuData.map((item) =>{
							return (item.type=='sub')
							?<SubMenu key={item.name} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
								{item.items.map((item) =>(
									<Item key={item.name}>
										<Link to={item.path}>
											<Icon type={item.icon} />
											<span>{item.name}</span>
										</Link>
									</Item>
								))}
							</SubMenu>
							:<Item key={item.name}>
								<Link to={item.path}>
									<Icon type={item.icon} />
									<span>{item.name}</span>
								</Link>
							</Item>
						})}
					</Menu>
				</Sider>
				<Layout>
					<Header className={(this.state.collapsed)?"HeaderMini":"Header"}>
						<Icon
							className="trigger"
							type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
							onClick={this.toggleSider.bind(this)}
						/>
						<div className="HeaderLeft">
							<Menu
								mode="horizontal"
								defaultSelectedKeys={[this.props.defaultMenuKey]}
								onClick={this.onTopMenuChange.bind(this)}
								className="topMenuStyle"
							>
								{this.props.menuTops.map((item)=>{
									return <Item key={item.key}>{item.title}</Item>
								})}
							</Menu>
						</div>
						<div className={(this.state.collapsed)?"HeaderRightMini":"HeaderRight"}>
							<div style={{height: '100%', display:'flex'}}>
								<Popover placement="bottomRight"
									title="报警消息"
									content={noticeContent}
									trigger="click"
								>
									<div className="noticeSpan">
										<Badge count={2}>
											<Icon type="bell" style={{fontSize: 16, paddingLeft: 1, paddingRight: 4}}/>										
										</Badge>
									</div>
								</Popover>
								<Dropdown overlay={
									<Menu onClick={this.onRightSysMenu.bind(this)}>
										<Item style={{width: 160}} key={MENU_PROFILE_KEY}>
											<Icon type="user" style={{marginRight: 8}}/>个人中心
										</Item>
										<Menu.Divider />
										<Item style={{width: 160}} key={MENU_LOGOUT_KEY}>
											<Icon type="logout" style={{marginRight: 8}}/>退出登录
										</Item>
									</Menu>
								}>
									<span className="dropdown-link" href="javascript:;"  style={{paddingLeft: 12, paddingRight: 12}}>
										<Avatar size="small" icon="user" />
										<span style={{marginLeft: 5}}>{
											// this.props.location.state.userName
											15202202987
										}</span>
									</span>
								</Dropdown>
							</div>
						</div>
					</Header>
					<Content className={(this.state.collapsed)?"ContentMini":"Content"}>
						{this.props.children}
					</Content>
					<Footer className={(this.state.collapsed)?"FooterMini":"Footer"}>
						CloudPlatform ©2017 Created by DoubleCom
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

// 
PageLayout.propTypes = {
	children: PropTypes.element.isRequired,
	menuData: PropTypes.array.isRequired,
	selMenu: PropTypes.array.isRequired,
	subMenu: PropTypes.array.isRequired,
	location: PropTypes.object,
	history: PropTypes.object,
	defaultMenuKey: PropTypes.string,
	menuTops: PropTypes.array,
	collapsed: PropTypes.bool,
};

PageLayout.defaultProps = {
	selMenu: ['系统首页'],
	subMenu: [],
	defaultMenuKey: '',
	menuTops: [],
	collapsed: false,
};

//
export default withRouter(PageLayout);