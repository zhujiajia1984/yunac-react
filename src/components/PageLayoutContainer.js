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
				icon: 'home',
				path: '/index'
			}, {
				name: '设备管理',
				type: 'sub',
				icon: 'laptop',
				items: [{
					name: 'AP管理',
					type: 'main',
					icon: 'laptop',
					path: '/apManage'
				}, {
					name: '探针管理',
					type: 'main',
					icon: 'laptop',
					path: '/tzManage'
				}, {
					name: '分组管理',
					type: 'main',
					icon: 'laptop',
					path: '/groupManage'
				}]
			}, {
				name: '用户管理',
				type: 'sub',
				icon: 'laptop',
				items: [{
					name: 'AP用户',
					type: 'main',
					icon: 'laptop',
					path: '/apUser'
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
};