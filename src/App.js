import React from 'react';
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom';
import Home from './pages/Home';
import ApManager from './pages/ApManage';
import GroupManager from './pages/GroupManage';
import ApUser from './pages/ApUser';
import Login from './pages/Login';
import PwdReset from './pages/PwdReset';
import Profile from './pages/Profile';
import EditPwd from './pages/EditPwd';
import ApSetting from './pages/ApSetting';

//
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	//
	render() {
		return (
			<Router>
				<div style={styles.root}>
					<Route exact path="/" component={Login} />
					<Route path="/pwdReset" component={PwdReset} />
					<Route path="/index" component={Home} />
					<Route path="/apManage" component={ApManager} />
					<Route path="/peizhi" component={ApSetting} />
					<Route path="/groupManage" component={GroupManager} />
					<Route path="/apUser" component={ApUser} />
					<Route path="/profile" component={Profile} />
					<Route path="/editPwd" component={EditPwd} />
				</div>
			</Router>
		);
	}
}

const styles = {
	root: {
		fontFamily: '"Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, "Microsoft YaHei"'
	},
}