import React from 'react';
import PageLayout from './PageLayout';
import PropTypes from 'prop-types';

//
export default class PageLayoutContainer extends React.Component {
	//
	constructor(props) {
		super(props);
		this.state = {
			menuData: [],
		}
	}

	//
	componentDidMount() {
		// 获取菜单数据
		this.setState({
			menuData: [{
				name: '系统首页',
				type: 'main',
				icon: 'shouye',
				path: '/index'
			}, {
				name: '设备管理',
				type: 'sub',
				icon: 'computer_icon',
				items: [{
					name: 'AP管理',
					type: 'main',
					icon: 'router',
					path: '/apManage'
				}, {
					name: '探针管理',
					type: 'main',
					icon: 'tanzhen',
					path: '/tzManage'
				}, {
					name: '分组管理',
					type: 'main',
					icon: 'Grouping',
					path: '/groupManage'
				}]
			}, {
				name: '用户管理',
				type: 'sub',
				icon: 'geren',
				items: [{
					name: 'AP用户',
					type: 'main',
					icon: 'duoren',
					path: '/apUser'
				}]
			}, {
				name: '系统管理',
				type: 'sub',
				icon: 'xitong',
				items: [{
					name: '固件管理',
					type: 'main',
					icon: 'shengjizhongxin',
					path: '/version'
				}, {
					name: '日志管理',
					type: 'main',
					icon: 'rizhi',
					path: '/logSystem'
				}, {
					name: '客户管理',
					type: 'main',
					icon: 'kehudongcha',
					path: '/subClient'
				}, {
					name: '账号管理',
					type: 'main',
					icon: 'heimingdan',
					path: '/account'
				}]
			}]
		})
	}

	//
	render() {
		return (
			<PageLayout
				menuData={this.state.menuData}
				selMenu={this.props.selMenu}
				subMenu={this.props.subMenu}
				menuTops={this.props.menuTops}
				defaultMenuKey={this.props.defaultMenuKey}
				collapsed={this.props.collapsed}
			>
				{this.props.children}
			</PageLayout>
		);
	}
}

// 
PageLayoutContainer.propTypes = {
	children: PropTypes.element.isRequired,
	selMenu: PropTypes.array,
	subMenu: PropTypes.array,
	defaultMenuKey: PropTypes.string,
	menuTops: PropTypes.array,
	collapsed: PropTypes.bool,
};