import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Home from './pages/Home';
import ApManager from './pages/ApManage';
import GroupManager from './pages/GroupManage';
import ApUser from './pages/ApUser';
import Login from './pages/Login';
import PwdReset from './pages/PwdReset';
import Profile from './pages/Profile';
import EditPwd from './pages/EditPwd';
import EditWxLogin from './pages/EditWxLogin';
import ApSetting from './pages/ApSetting';
import TzManage from './pages/TzManage';
import ApType from './pages/ApType';
import TzType from './pages/TzType';
import Version from './pages/Version';
import VersionType from './pages/VersionType';
import LogSystem from './pages/LogSystem';
import LogOperation from './pages/LogOperation';
import SubClientManage from './pages/SubClientManage';
import SubRole from './pages/SubRole';
import SubAccount from './pages/SubAccount';
import Account from './pages/Account';
import HomeTongji from './pages/HomeTongji';
import MsgCenter from './pages/MsgCenter';
import ApMonitor from './pages/ApMonitor';
import ApConfig from './pages/ApConfig';
import SSIDEdit from './pages/SSIDEdit';
import DevMap from './pages/DevMap';

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
					<Switch>
						<Route exact path="/" component={Login} />
						<Route path="/pwdReset" component={PwdReset} />
						<Route path="/index" component={Home} />
						<Route path="/hometongji" component={HomeTongji} />
						<Route path="/apManage" component={ApManager} />
						<Route path="/devmap" component={DevMap} />
						<Route path="/apMonitor" component={ApMonitor} />
						<Route path="/apConfig" component={ApConfig} />
						<Route path="/ssidEdit" component={SSIDEdit} />
						<Route path="/peizhi" component={ApSetting} />
						<Route path="/apType" component={ApType} />
						<Route path="/tzManage" component={TzManage} />
						<Route path="/tzType" component={TzType} />
						<Route path="/groupManage" component={GroupManager} />
						<Route path="/apUser" component={ApUser} />
						<Route path="/version" component={Version} />
						<Route path="/versionType" component={VersionType} />
						<Route path="/logSystem" component={LogSystem} />
						<Route path="/logOperation" component={LogOperation} />
						<Route path="/subClient" component={SubClientManage} />
						<Route path="/subRole" component={SubRole} />
						<Route path="/subAccount" component={SubAccount} />
						<Route path="/account" component={Account} />
						<Route path="/msgCenter" component={MsgCenter} />
						<Route path="/profile" component={Profile} />
						<Route path="/editPwd" component={EditPwd} />
						<Route path="/editWxLogin" component={EditWxLogin} />
					</Switch>
				</div>
			</Router>
        );
    }
}

// 字体
const styles = {
    root: {
        fontFamily: '"Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, "Microsoft YaHei"'
    },
}

// token验证
const TokenRoute = ({ component: Component }) => (
<Route render={props=> isTokenAuthed()
	?(<Component {...props}/>): (<Redirect to="/index"/>)
}
/>
)

function isTokenAuthed() {
    let url = `https://test.weiquaninfo.cn/yunacApi/userAuth`;
    fetch(url, { method: "GET", })
        .then(res => (res.status == 200) ? true : false)
        .catch(error => {
            alert(`token验证失败：${error.message}`);
        })
}