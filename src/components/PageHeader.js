import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { withRouter } from 'react-router';

//
class PageHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	//
	onNaviTo(link, e) {
		e.preventDefault();
		if (link) {
			this.props.history.push(link);
		}
	}

	//
	render() {
		return (
			<div>
				{
					(this.props.naviDatas.length == 0)?
					"":
					<div style={styles.pageBreadcrumb}>
						<Breadcrumb>
							{this.props.naviDatas.map((item)=>{
								return <Breadcrumb.Item key={item.name}>
										{
											(item.type == "current")?item.name:
											<a href="javascript:;" onClick={this.onNaviTo.bind(this, item.link)}>{item.name}</a>
										}
									</Breadcrumb.Item>;
							})}
						</Breadcrumb>
					</div>
				}
				<div style={styles.pageHeader}>
					<div style={styles.pageTitle}>
						{this.props.title}
					</div>
				</div>
			</div>
		);
	}
}

//
PageHeader.propTypes = {
	title: PropTypes.string.isRequired,
	naviDatas: PropTypes.array,
};

PageHeader.defaultProps = {
	naviDatas: [],
};

// style
const styles = {
	pageHeader: {
		padding: '16px 32px 16px 32px',
	},
	pageTitle: {
		fontSize: 20,
		fontWeight: 500,
	},
	pageBreadcrumb: {
		padding: '5px 32px 0px 32px',
		// marginBottom: 16,
	}
}

export default withRouter(PageHeader);