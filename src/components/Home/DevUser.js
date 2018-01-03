import React from 'react';
import { Row, Col, } from 'antd';
import devinfocss from './DevInfo.css';
import echarts from 'echarts';
import PropTypes from 'prop-types';
import moment from 'moment';

//
export default class DevUser extends React.Component {
	//
	constructor(props) {
		super(props);
		this.chart = null;
		this.chartOptions = {};
	}

	//
	RandomNumBoth(Min, Max) {
		let Range = Max - Min;
		let Rand = Math.random();
		let num = Min + Math.round(Rand * Range);
		return num;
	}

	// 
	componentDidMount() {
		// 
		this.initChart();
		this.setChart(this.props.curTime);
		this.intervalid = setInterval(() => {
			this.xData.shift();
			if (moment().second() > 30) {
				this.xData.push(moment().second(30).format('HH:mm:ss'));
			} else {
				this.xData.push(moment().second(0).format('HH:mm:ss'));
			}
			this.chartOptions.xAxis.data = this.xData;
			this.chartOptions.series[0].data.push(this.RandomNumBoth(1000, 2000).toString());
			this.chart.setOption(this.chartOptions);
		}, 30000);
		//
		window.addEventListener('resize', this.onWindowResize.bind(this));
	}

	//
	initChart() {
		this.chart = echarts.init(document.getElementById('echarts_devUser'));
	}

	//
	componentWillReceiveProps(nextProps) {
		if (this.props.curTime != nextProps.curTime) {
			this.setChart(nextProps.curTime);
		}
	}

	//
	setChart(time) {
		this.xData = [];
		this.yData = [];
		this.yData24 = [];
		this.yData58 = [];
		if (time == 1) {
			this.count = 120;
		} else if (time == 6) {
			this.count = 720;
		} else {
			this.count = 1000;
		}

		let curMoment = null;
		if (moment().second() > 30) {
			curMoment = moment().second(30);
		} else {
			curMoment = moment().second(0);
		}
		this.xData.unshift(curMoment.format('HH:mm:ss'));
		for (let i = 0; i < (this.count - 1); i++) {
			this.xData.unshift(curMoment.subtract(30, 'seconds').format('HH:mm:ss'));
		}
		for (let i = 0; i < this.count; i++) {
			let data24 = this.RandomNumBoth(1000, 2000);
			let data58 = this.RandomNumBoth(1000, 2000);
			this.yData24.push(data24);
			this.yData58.push(data58);
			this.yData.push(data24 + data58);
		}
		this.chartOptions = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
				},
				legend: {
					show: true,
					data: ['总人数', '2.4G人数', '5.8G人数'],
					left: 'center',
					top: 'top'
				},
				dataZoom: [{
					type: 'slider',
					show: true,
					start: 90,
					end: 100,
				}, {
					type: 'inside',
					disabled: false,
					start: 0,
					end: 100,
					zoomOnMouseWheel: false
				}],
				xAxis: {
					type: 'category',
					data: this.xData,
					name: '时间',
					boundaryGap: false,
				},
				yAxis: {
					type: 'value',
					name: '人数',
					splitNumber: 2,
					boundaryGap: ['0', '10%'],
					splitLine: {
						show: false
					},
				},
				series: [{
					name: '总人数',
					type: 'line',
					showSymbol: false,
					hoverAnimation: false,
					smooth: true,
					data: this.yData,
					itemStyle: {
						normal: {
							color: '#3AA1FF',
						}
					},
					// areaStyle: {
					// 	normal: {
					// 		color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					// 			offset: 0,
					// 			color: 'rgb(58, 161, 255)'
					// 		}, {
					// 			offset: 1,
					// 			color: 'rgb(208, 233, 255)'
					// 		}])
					// 	}
					// },
				}, {
					name: '2.4G人数',
					type: 'line',
					showSymbol: false,
					hoverAnimation: false,
					smooth: true,
					data: this.yData24,
					itemStyle: {
						normal: {
							color: '#68d387',
						}
					},
				}, {
					name: '5.8G人数',
					type: 'line',
					showSymbol: false,
					hoverAnimation: false,
					smooth: true,
					data: this.yData58,
					itemStyle: {
						normal: {
							color: '#975fe4',
						}
					},
				}]
			},
			this.chart.clear();
		this.chart.showLoading();
		setTimeout(() => {
			this.chart.hideLoading();
			this.chart.setOption(this.chartOptions);
		}, 1000)
	}

	// 
	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize.bind(this));
		if (this.intervalid) {
			clearInterval(this.intervalid);
		}
	}

	// 
	onWindowResize() {
		if (this.chart) {
			this.chart.resize();
		}
	}

	//
	render() {
		return (
			<div>
				<div id="echarts_devUser" style={{height: 300}}>
				</div>
			</div>
		);
	}
}

//
DevUser.propTypes = {
	curTime: PropTypes.number.isRequired,
};