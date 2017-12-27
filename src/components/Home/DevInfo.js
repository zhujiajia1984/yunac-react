import React from 'react';
import { Row, Col, } from 'antd';
import devinfocss from './DevInfo.css';
import echarts from 'echarts';

//
export default class DevInfo extends React.Component {
	//
	constructor(props) {
		super(props);
		this.chart = null;
		this.chartOptions = {};
	}


	componentDidMount() {
		// 
		this.initChart();
		this.setChart();
		//
		window.addEventListener('resize', this.onWindowResize.bind(this));
	}

	//
	initChart() {
		this.chart = echarts.init(document.getElementById('echarts_devinfo'));
	}

	//
	setChart() {
		this.chartOptions = {
			legend: {
				left: 'left',
				orient: 'vertical',
				data: ['AP数量', '探针数量'],
				formatter: (name) => {
					return `${name}  {num|100} {percent|(76%)}`;
				},
				textStyle: {
					rich: {
						num: {
							color: 'black',
							fontSize: '12px',
						},
						percent: {
							color: '#8c8c8c',
							fontSize: '8px',
						}
					}
				}
			},
			tooltip: {
				show: true,
				trigger: 'item'
			},
			series: [{
				type: 'pie',
				// name: '设备概况',
				label: {
					normal: {
						show: true,
						position: 'center',
						formatter: (params) => {
							if (params.name == "AP数量") {
								return "{title|设备总数}\n\n{content|123}"
							} else {
								return "";
							}
						},
						rich: {
							title: {
								color: '#8c8c8c',
								fontSize: 14,
								fontFamily: '"Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, "Microsoft YaHei"',
							},
							content: {
								color: 'black',
								fontSize: 23,
								fontFamily: '"Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, "Microsoft YaHei"',
							}
						}
					}
				},
				radius: ['50%', '70%'],
				data: [{
					name: 'AP数量',
					value: 100,
					itemStyle: {
						normal: {
							color: '#3AA1FF',
							borderWidth: 5,
							borderColor: '#fff'
						}
					}
				}, {
					name: '探针数量',
					value: 23,
					itemStyle: {
						normal: {
							color: '#75E3D6',
							borderWidth: 5,
							borderColor: '#fff'
						}
					}
				}]
			}]
		}
		this.chart.setOption(this.chartOptions);
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
				<div className="devInfoPie" id="echarts_devinfo">
				</div>
			</div>
		);
	}
}