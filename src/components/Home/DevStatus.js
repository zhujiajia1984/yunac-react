import React from 'react';
import { Row, Col, } from 'antd';
import devinfocss from './DevInfo.css';
import echarts from 'echarts';

//
export default class DevStatus extends React.Component {
	//
	constructor(props) {
		super(props);
	}

	//
	componentDidMount() {
		// 
		this.initChart1();
		this.setChart1();
		this.initChart2();
		this.setChart2();
		//
		window.addEventListener('resize', this.onWindowResize.bind(this));
	}

	//
	initChart1() {
		this.chart1 = echarts.init(document.getElementById('echarts_devstatus1'));
	}

	//
	initChart2() {
		this.chart2 = echarts.init(document.getElementById('echarts_devstatus2'));
	}

	setChart2() {
		this.chartOptions2 = {
			series: [{
				type: 'pie',
				radius: ['50%', '70%'],
				hoverAnimation: false,
				cursor: 'default',
				label: {
					normal: {
						show: true,
						position: 'center',
						formatter: (params) => {
							if (params.name == "离线率") {
								return "{title|在线率}\n\n{content|95%}"
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
								fontSize: 18,
								fontFamily: '"Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, "Microsoft YaHei"',
							}
						}
					}
				},
				data: [{
					name: '在线率',
					value: 100,
					itemStyle: {
						normal: {
							color: '#3AA1FF',
						},
						emphasis: {
							color: '#3AA1FF',
						}
					}
				}, {
					name: '离线率',
					value: 23,
					itemStyle: {
						normal: {
							color: '#F2F4F6',
						},
						emphasis: {
							color: '#F2F4F6',
						}
					}
				}]
			}]
		}
		this.chart2.setOption(this.chartOptions2);
	}

	//
	setChart1() {
		this.chartOptions1 = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				data: ['AP', '探针'],
			},
			xAxis: {
				type: 'value',
				axisLine: { show: false },
				axisTick: { show: false },
				axisLabel: { show: false },
				splitLine: { show: false }
			},
			yAxis: {
				type: 'category',
				data: ['探针', 'AP'],
				splitLine: { show: false },
				axisTick: { show: false },
				boundaryGap: ['20%', '20%']
			},
			series: [{
				name: '在线',
				type: 'bar',
				stack: '总量',
				data: [14, 97],
				itemStyle: {
					normal: {
						color: '#3AA1FF',
					},
				},
				label: {
					normal: {
						show: true,
						position: 'insideRight'
					}
				}
			}, {
				name: '离线',
				type: 'bar',
				stack: '总量',
				data: [5, 10],
				itemStyle: {
					normal: {
						color: '#F47A8E',
					},
				},
				label: {
					normal: {
						show: true,
						position: 'insideRight'
					}
				}
			}]
		}
		this.chart1.setOption(this.chartOptions1);
	}

	// 
	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize.bind(this));
	}

	// 
	onWindowResize() {
		if (this.chart1) {
			this.chart1.resize();
		}
		if (this.chart2) {
			this.chart2.resize();
		}
	}

	//
	render() {
		return (
			<div>
				<Row gutter={{xs: 8, sm: 16, md: 24}}>
					<Col xs={24} sm={24} md={8}>
						<div className="devInfoItem">
							<div className="devInfoItemTitle">设备在线数</div>
							<div className="devInfoItemValue">
								<span>105</span>
							</div>
						</div>
					</Col>
					<Col xs={24} sm={24} md={8}>
						<div className="devInfoItem">
							<div className="devInfoItemTitle">AP在线数</div>
							<div className="devInfoItemValue">
								<span>97</span>
							</div>
						</div>
					</Col>
					<Col xs={24} sm={24} md={8}>
						<div className="devInfoItem">
							<div className="devInfoItemTitle">探针在线数</div>
							<div className="devInfoItemValue">
								<span>14</span>
							</div>
						</div>
					</Col>
				</Row>
				<Row gutter={{xs: 8, sm: 16, md: 24}}>
					<Col xs={24} sm={24} md={6}>
						<div id="echarts_devstatus2" style={{height: 238}}></div>
					</Col>
					<Col xs={24} sm={24} md={18}>
						<div id="echarts_devstatus1" style={{height: 238}}></div>
					</Col>
				</Row>
			</div>
		);
	}
}