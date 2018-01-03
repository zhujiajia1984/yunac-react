import React from 'react';
import { Row, Col, } from 'antd';
import devinfocss from './DevInfo.css';
import echarts from 'echarts';
import PropTypes from 'prop-types';
import moment from 'moment';

//
export default class ApUserHis extends React.Component {
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
		//
		window.addEventListener('resize', this.onWindowResize.bind(this));
	}

	//
	initChart() {
		this.chart = echarts.init(document.getElementById('echarts_ApUser'));
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
		if (time == 7) {
			this.count = 7;
		} else if (time == 30) {
			this.count = 30;
		}

		let curMoment = null;
		curMoment = moment().subtract(1, 'days');
		this.xData.unshift(curMoment.format('YYYY-MM-DD'));
		for (let i = 0; i < (this.count - 1); i++) {
			this.xData.unshift(curMoment.subtract(1, 'days').format('YYYY-MM-DD'));
		}
		for (let i = 0; i < this.count; i++) {
			let data24 = this.RandomNumBoth(1000, 2000);
			let data58 = this.RandomNumBoth(1000, 2000);
			this.yData24.push(data24);
			this.yData58.push(data58);
			this.yData.push(data24 + data58);
		}
		this.chartOptions = {
				// title: {
				// 	text: '使用人数趋势',
				// 	textStyle: {
				// 		fontStyle: 14,
				// 		color: "rgba(0, 0, 0, 0.85)",
				// 		fontWeight: '500',
				// 	}
				// },
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
					start: 0,
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
				<div id="echarts_ApUser" style={{height: 400}}>
				</div>
			</div>
		);
	}
}

//
ApUserHis.propTypes = {
	curTime: PropTypes.number.isRequired,
};