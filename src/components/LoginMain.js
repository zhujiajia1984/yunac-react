import React from 'react';
import { Icon, Tabs } from 'antd';
import cssMain from '../pages/Login.css';
import PropTypes from 'prop-types';

// const
const imgUrl = require("../../dist/assets/images/login.jpg");

const width = 423;
const height = 400;

//
export default class LoginMain extends React.Component {
	//
	constructor(props) {
		super(props);
	}

	//
	render() {
		return (
			<div style={styles.root}>
				<div style={styles.title}>
					<span style={{lineHeight: '38px'}}>Double</span>
					<span style={{color:'#E43F41', lineHeight: '38px'}}>Com</span>
					<span style={{margin: '0px 10px', lineHeight: '38px'}}>|</span>
					<span style={{fontSize: 26}}>云AC管理平台</span>
				</div>
				<div style={styles.contentWrapper}>
					<div style={styles.content}>
						<div style={styles.body}>
							{this.props.children}
						</div>
						
					</div>
				</div>
			</div>
		);
	}
}

// 
LoginMain.propTypes = {
	children: PropTypes.element,
};

// style
const styles = {
	root: {
		width: '100%',
		height: '100vh',
		backgroundImage: 'url(' + imgUrl + ')',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100% 100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: 'white',
		paddingBottom: 30,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		fontSize: 20,
		fontFamily: 'Microsoft YaHei'
	},
	contentWrapper: {
		display: 'flex',
		width: width,
		// height: height,
		backgroundColor: 'white',
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		padding: '30px 30px 30px 30px',
	},
	body: {
		// flex: 1
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		fontSize: '18px',
	},
	footer: {
		display: 'flex',
		flexDirection: 'column-reverse',
		alignItems: 'center',
		// flex: 1,
	},
}