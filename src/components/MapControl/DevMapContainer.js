import React from 'react';
import BMap from 'BMap'

//
export default class DevMapContainer extends React.Component {
	//
	constructor(props) {
		super(props);
	}

	//
	componentDidMount() {
		this.map = new BMap.Map("allmap");
		this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
		this.map.addOverlay(new BMap.Marker(new BMap.Point(116.404, 39.915)));
		this.map.enableScrollWheelZoom(true);
	}

	//
	render() {
		return (
			<div id="allmap" style={{marginTop: 24, flex:1}}></div>
		);
	}
}