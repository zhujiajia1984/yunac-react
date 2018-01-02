import React from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import moment from 'moment';
import { Row, Col, } from 'antd';

//
export default class ApUserMonitorChart extends React.Component {
	//
	constructor(props) {
		super(props);
	}

	//
	componentDidMount() {
		this.initChart();
		this.setChart();
		// window.addEventListener('resize', this.onWindowResize.bind(this));
		// this.intervalid = setInterval(() => {
		// 	if (this.xData.length > 120) {
		// 		this.xData.shift();
		// 	}
		// 	if (moment().second() > 30) {
		// 		this.xData.push(moment().second(30).format('HH:mm:ss'));
		// 	} else {
		// 		this.xData.push(moment().second(0).format('HH:mm:ss'));
		// 	}
		// 	this.chartOptions.xAxis.data = this.xData;
		// 	this.chartOptions.series[0].data.push(this.RandomNumBoth(0, 1));
		// 	this.chartOptions.series[1].data.push(this.RandomNumBoth(0, 1));
		// 	this.chart.setOption(this.chartOptions);
		// }, 30000);
	}

	// 
	componentWillUnmount() {
		if (this.intervalid) {
			clearInterval(this.intervalid);
		}
		window.removeEventListener('resize', this.onWindowResize.bind(this));
	}

	// 
	onWindowResize() {
		this.chartTatol.resize();
	}

	//
	initChart() {
		this.chartTatol = echarts.init(document.getElementById('echarts_apUserTotal'));
		this.chart24 = echarts.init(document.getElementById('echarts_apUser24'));
		this.chart58 = echarts.init(document.getElementById('echarts_apUser58'));
	}

	//
	RandomNumBoth(Min, Max) {
		if (Min == 0 && Max == 1) {
			return (Math.floor(Math.round(Math.random() * 100)) / 100);
		}
		let Range = Max - Min;
		let Rand = Math.random();
		let num = Min + Math.round(Rand * Range);
		return num;
	}

	//
	setChart() {
		this.setChart24();
		this.setChart58();
		this.setChartTotal();
		this.intervalid = setInterval(() => {
			this.value24 = this.RandomNumBoth(1, 64);
			this.value58 = this.RandomNumBoth(1, 64);
			this.valueTotal = this.value24 + this.value58;
			this.chart24Options.series[0].data[0].value = this.value24;
			this.chart24.setOption(this.chart24Options);
			this.chart58Options.series[0].data[0].value = this.value58;
			this.chart58.setOption(this.chart58Options);
			this.chartTotalOptions.series[0].data[0].value = this.valueTotal;
			this.chartTatol.setOption(this.chartTotalOptions);
		}, 5000);
	}

	//
	setChart24() {
		this.value24 = this.RandomNumBoth(1, 64);
		this.chart24Options = {
			series: [{
				name: '2.4G连接数',
				type: 'gauge',
				radius: '75%',
				min: 0,
				max: 64,
				splitNumber: 8,
				axisLine: {
					lineStyle: {
						color: [
							[0.25, '#389e0d'],
							[0.75, '#096dd9'],
							[1, '#cf1322']
						]
					}
				},
				axisTick: {
					splitNumber: 2,
				},
				axisLabel: {
					fontSize: 8,
				},
				title: {
					fontSize: 12,
					offsetCenter: [0, '20%'],
				},
				pointer: {
					width: 4,
				},
				detail: {
					fontSize: 14,
				},
				data: [{ value: this.value24, name: '2.4G连接数' }],
				animationDelayUpdate: 12,
				animationDurationUpdate: 1000,
			}]
		}
		this.chart24.clear();
		this.chart24.showLoading();
		setTimeout(() => {
			this.chart24.hideLoading();
			this.chart24.setOption(this.chart24Options);
		}, 1000)
	}

	//
	setChart58() {
		this.value58 = this.RandomNumBoth(1, 64);
		this.chart58Options = {
			series: [{
				name: '5.8G连接数',
				type: 'gauge',
				radius: '75%',
				min: 0,
				max: 64,
				splitNumber: 8,
				axisLine: {
					lineStyle: {
						color: [
							[0.25, '#389e0d'],
							[0.75, '#096dd9'],
							[1, '#cf1322']
						]
					}
				},
				axisTick: {
					splitNumber: 2,
				},
				axisLabel: {
					fontSize: 8,
				},
				title: {
					fontSize: 12,
					offsetCenter: [0, '20%'],
				},
				pointer: {
					width: 4,
				},
				detail: {
					fontSize: 14,
				},
				data: [{ value: this.value58, name: '5.8G连接数' }],
				animationDelayUpdate: 12,
				animationDurationUpdate: 1000,
			}]
		}
		this.chart58.clear();
		this.chart58.showLoading();
		setTimeout(() => {
			this.chart58.hideLoading();
			this.chart58.setOption(this.chart58Options);
		}, 1000)
	}

	//
	setChartTotal() {
		this.valueTotal = this.value24 + this.value58;
		this.chartTotalOptions = {
			series: [{
				name: '总连接数',
				type: 'gauge',
				radius: '100%',
				min: 0,
				max: 128,
				splitNumber: 8,
				axisLine: {
					lineStyle: {
						color: [
							[0.25, '#389e0d'],
							[0.75, '#096dd9'],
							[1, '#cf1322']
						]
					}
				},
				axisTick: {
					splitNumber: 4,
				},
				title: {
					// fontWeight: 'bolder',
					fontSize: 16,
					// fontStyle: 'italic',
					offsetCenter: [0, '20%'],
				},
				pointer: {
					width: 6,
				},
				data: [{ value: this.valueTotal, name: '总连接数' }],
				animationDelayUpdate: 12,
				animationDurationUpdate: 1000,
			}]
		}
		this.chartTatol.clear();
		this.chartTatol.showLoading();
		setTimeout(() => {
			this.chartTatol.hideLoading();
			this.chartTatol.setOption(this.chartTotalOptions);
		}, 1000)
	}

	//
	render() {
		return (
			<div>
				<Row gutter={{xs: 8, sm: 16, md: 24}} >
					<Col xs={24} sm={24} md={24} lg={8} xl={8}>
						<div id="echarts_apUserTotal" style={{height: 300}}></div>
					</Col>
					<Col xs={24} sm={24} md={24} lg={8} xl={8}>
						<div id="echarts_apUser24" style={{height: 300}}></div>
					</Col>
					<Col xs={24} sm={24} md={24} lg={8} xl={8}>
						<div id="echarts_apUser58" style={{height: 300}}></div>
					</Col>
				</Row>
			</div>

		);
	}
}

//
ApUserMonitorChart.propTypes = {
	// name: PropTypes.string.isRequired,
};