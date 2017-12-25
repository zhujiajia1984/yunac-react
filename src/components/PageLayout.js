import React from 'react';
import { Layout, Menu, Icon, Dropdown, Avatar } from 'antd';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import css from '../css/mylayout.css';
import { withRouter } from 'react-router';

// const
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;
const siderWidth = 256;
const MENU_LOGOUT_KEY = 'logout';
const MENU_PROFILE_KEY = 'profile';

//
class PageLayout extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
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
		if (item.key == "peizhi") {
			this.props.history.push("/peizhi");
		} else if (item.key == "ap") {
			this.props.history.push("/apManage");
		} else if (item.key == "apType") {
			this.props.history.push("/apType");
		} else if (item.key == "tz") {
			this.props.history.push("/tzManage");
		} else if (item.key == "tzType") {
			this.props.history.push("/tzType");
		} else if (item.key == "devGroup") {
			this.props.history.push("/groupManage");
		} else if (item.key == "apUser") {
			this.props.history.push("/apUser");
		} else if (item.key == "version") {
			this.props.history.push("/version");
		} else if (item.key == "versionType") {
			this.props.history.push("/versionType");
		}
	}

	//
	render() {
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
							>
								{this.props.menuTops.map((item)=>{
									return <Item key={item.key}>{item.title}</Item>
								})}
							</Menu>
						</div>
						<div className={(this.state.collapsed)?"HeaderRightMini":"HeaderRight"}>
							<div style={{height: '100%', display:'flex'}}>
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
									<span className="dropdown-link" href="javascript:;">
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
};

PageLayout.defaultProps = {
	selMenu: ['系统首页'],
	subMenu: [],
	defaultMenuKey: '',
	menuTops: [],
};

//
export default withRouter(PageLayout);