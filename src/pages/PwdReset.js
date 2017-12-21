import React from 'react';
import LoginMain from '../components/LoginMain';
import PwdResetFormWrapper from '../components/PwdResetForm';

//
export default class PwdReset extends React.Component {
	constructor(props) {
		super(props);
	}

	//
	onSubmitPwd() {
		this.props.history.push('/index');
	}

	//
	render() {
		return (
			<div>
				<LoginMain>
					<div style={styles.header}>
						<span style={{fontSize: '18px', color:'black'}}>密码重置</span>
					</div>
					<PwdResetFormWrapper
						onSubmitPwd={this.onSubmitPwd.bind(this)}
					></PwdResetFormWrapper>
				</LoginMain>
			</div>
		);
	}
}

// style
const styles = {
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		fontSize: '18px',
		marginBottom: 20,
	},
}