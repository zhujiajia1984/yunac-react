import React from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import moment from 'moment';

//
export default class ApMonitorCpu extends React.Component {
	//
	constructor(props) {
		super(props);
	}

	//
	componentDidMount() {
		this.initChart();
		this.setChart();
		window.addEventListener('resize', this.onWindowResize.bind(this));
		this.intervalid = setInterval(() => {
			if (this.xData.length > 120) {
				this.xData.shift();
			}
			if (moment().second() > 30) {
				this.xData.push(moment().second(30).format('HH:mm:ss'));
			} else {
				this.xData.push(moment().second(0).format('HH:mm:ss'));
			}
			this.chartOptions.xAxis.data = this.xData;
			this.chartOptions.series[0].data.push(this.RandomNumBoth(0, 1));
			this.chartOptions.series[1].data.push(this.RandomNumBoth(0, 1));
			this.chart.setOption(this.chartOptions);
		}, 30000);
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
		if (this.chart) {
			this.chart.resize();
		}
	}

	//
	initChart() {
		this.chart = echarts.init(document.getElementById('echarts_apMonitorCpu'));
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
		this.xData = [];
		this.yData = [this.RandomNumBoth(0, 1)];
		this.yData2 = [this.RandomNumBoth(0, 1)];
		let curMoment = null;
		if (moment().second() > 30) {
			curMoment = moment().second(30);
		} else {
			curMoment = moment().second(0);
		}
		this.xData.unshift(curMoment.format('HH:mm:ss'));
		for (let i = 0; i < 119; i++) {
			this.xData.unshift(curMoment.subtract(30, 'seconds').format('HH:mm:ss'));
		}
		for (let i = 0; i < 119; i++) {
			this.yData.push(this.RandomNumBoth(0, 1));
			this.yData2.push(this.RandomNumBoth(0, 1));
		}
		this.chartOptions = {
				legend: {
					show: true,
					data: ['CPU', '内存'],
					left: 'center',
					top: 'top',
					orient: 'vertical',
					formatter: (name) => {
						return (name + '：' + ((name == 'cpu') ? '{value|43%}' : '{value|29%}'));
					},
					textStyle: {
						rich: {
							value: {
								color: '#8c8c8c',
								fontSize: '8px',
							}
						}
					}
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
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'line',
					},
					formatter: (params) => {
						// console.log(params);
						if (params.length >= 2) {
							return `${params[0].axisValueLabel}<br/>${params[0].seriesName}：${parseInt(params[0].data*100)}%<br/>${params[1].seriesName}：${parseInt(params[1].data*100)}%`;
						} else if (params.length == 1) {
							return `${params[0].axisValueLabel}<br/>${params[0].seriesName}：${parseInt(params[0].data*100)}%`;
						}
					}
				},
				xAxis: {
					type: 'category',
					data: this.xData,
					name: '时间',
					boundaryGap: false,
				},
				yAxis: {
					type: 'value',
					name: '占用率(%)',
					min: 0,
					max: 1,
					splitNumber: 2,
					boundaryGap: ['0', '10%'],
					splitLine: {
						show: true,
						lineStyle: {
							color: "#e2e2e2",
							type: "dashed",
						}
					},
					axisLabel: {
						formatter: (value, index) => {
							return `${value*100}%`;
						}
					}
				},
				series: [{
					name: 'CPU',
					type: 'line',
					data: this.yData,
					itemStyle: {
						normal: {
							color: '#3AA1FF',
						}
					},
				}, {
					name: '内存',
					type: 'line',
					data: this.yData2,
					itemStyle: {
						normal: {
							color: '#68d387',
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
	render() {
		return (
			<div id="echarts_apMonitorCpu" style={{height: 300}}></div>
		);
	}
}

//
ApMonitorCpu.propTypes = {
	// name: PropTypes.string.isRequired,
};