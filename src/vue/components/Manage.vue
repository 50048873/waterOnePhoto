<template>
  <section class="Manage">
    <div class="top">
    	<div class="search-year">
    		<select-year @selectChange="selectChange"></select-year>
    	</div>
    </div>
    <div class="content-warp">
    	<div class="left" :style="getBgImage()">
    		<div class="cards">
	    		<card class="card ON" :percent="card1.percent" :iconCls="iconCls[0]">
	    			<template slot="titlePart">
	    				<h3>
				          <span>总资产</span>
				          <span>（亿元）</span>
				        </h3>
		    			<div class="totalMoney">
				          <span class="title">{{card1.currentValue}}</span>
				        </div>
			        </template>
			        <template slot="chartPart">
			        	<chart-money :data="card1.list" v-if="card1.list.length"></chart-money>
			        </template>
	    		</card>
	    		<card class="card" :percent="card2.percent" :iconCls="iconCls[1]">
	    			<template slot="titlePart">
	    				<h3>
				          <span>负债总额</span>
				          <span>（亿元）</span>
				        </h3>
		    			<div class="totalMoney">
				          <span class="title">总　额</span>
				          <span class="strongCount bgc-theme">{{card2.currentValue}}</span>
				        </div>
				        <div class="liabilityPercent">
				          <span class="title">负债率</span>
				          <span class="strongCount bgc-green">{{card2.fzl}}</span>
				        </div>
			        </template>
			        <template slot="chartPart">
			        	<chart-money :data="card2.list" v-if="card2.list.length"></chart-money>
			        </template>
	    		</card>
	    		<card class="card" :percent="card3.percent" :iconCls="iconCls[2]">
	    			<template slot="titlePart">
	    				<h3>
				          <span>净资产</span>
				          <span>（亿元）</span>
				        </h3>
		    			<div class="totalMoney">
				          <span class="title">{{card3.currentValue}}</span>
				        </div>
			        </template>
			        <template slot="chartPart">
			        	<chart-money :data="card3.list" v-if="card3.list.length"></chart-money>
			        </template>
	    		</card>
	    		<card class="card" :percent="card4.percent" :iconCls="iconCls[3]">
	    			<template slot="titlePart">
	    				<h3>
				          <span>营业总收入</span>
				          <span>（万元）</span>
				        </h3>
		    			<div class="totalMoney">
				          <span class="title">{{card4.currentValue}}</span>
				        </div>
				        <div class="liabilityPercent">
				          <span class="title">完成率</span>
				          <span class="strongCount bgc-theme">{{card4.yyzsrtbzz}}</span>
				        </div>
			        </template>
			        <template slot="chartPart">
			        	<chart-money :data="card4.list" v-if="card4.list.length"></chart-money>
			        </template>
	    		</card>
	    		<card class="card" :iconCls="iconCls[4]">
	    			<template slot="titlePart">
	    				<h3>
				          <span>利润总额</span>
				          <span>（万元）</span>
				        </h3>
		    			<div class="totalMoney">
				          <span class="title">总　额</span>
				          <span class="strongCount bgc-theme">13487</span>
				        </div>
				        <div class="liabilityPercent">
				          <span class="title">净利润</span>
				          <span class="strongCount bgc-green">9733</span>
				        </div>
			        </template>
			        <template slot="chartPart">
			        	<chart-money></chart-money>
			        </template>
	    		</card>
	    		<card class="card" :iconCls="iconCls[5]">
	    			<template slot="titlePart">
	    				<h3>
				          <span>投资</span>
				          <span>（万元）</span>
				        </h3>
		    			<div class="totalMoney">
				          <span class="title">13461.72</span>
				        </div>
			        </template>
			        <template slot="chartPart">
			        	<chart-money></chart-money>
			        </template>
	    		</card>
    		</div>
    		<div class="map-wrap">
    			<map-nx></map-nx>
    		</div>
    	</div>
    	<div class="right m-content-right">
			<tab :data="data1"></tab>
			<div class="carts">
				<card-two class="card" title="各分公司供水量（万吨）">
					<Chart-columnar-basic></Chart-columnar-basic>
				</card-two>
				<card-two class="card" title="利润总额分版块构成">
					<chart-annular></chart-annular>
				</card-two>
				<card-two class="card" title="各公司营业收入、净利润，计划完成率">
					<chart-bar-basic></chart-bar-basic>
				</card-two>
			</div>
    	</div>
    </div>
  </section>
</template>

<script>
	const data1 = [
	    {
	      title: '2017'
	    },
	    {
	      title: '2016'
	    }
	]
	const data2 = [
	    {
	      title: '年'
	    },
	    {
	      title: '月'
	    }
	]
	import ChartMoney from './ChartMoney'
	import Card from './Card'
	import Tab from './Tab'
	import CardTwo from './CardTwo'
	import ChartColumnarBasic from './ChartColumnarBasic'
	import ChartAnnular from './ChartAnnular'
	import ChartBarBasic from './ChartBarBasic'
	import {getStaticPath} from '../assets/js/mixin'
	import MapNx from './MapNx'
	import SelectYear from './SelectYear'
	import * as api from '../assets/js/api'
	import {getCurrentValue, getPercent} from '../assets/js/util'
	export default {
	    name: 'Manage',
	    components: {
	    	ChartMoney,
	    	Card,
	    	Tab,
	    	CardTwo,
	    	ChartColumnarBasic,
	    	ChartAnnular,
	    	ChartBarBasic,
	    	MapNx,
	    	SelectYear
	    },
	    mixins: [getStaticPath],
	    data() {
	    	return {
	    		curDate: '2017',
	    		card1: {
	    			percent: '',
		    		list: [],
		    		currentValue: '--'
	    		},
	    		card2: {
	    			percent: '',
		    		list: [],
		    		currentValue: '--',
		    		fzl: ''
	    		},
	    		card3: {
	    			percent: '',
		    		list: [],
		    		currentValue: '--'
	    		},
	    		card4: {
	    			percent: '',
		    		list: [],
		    		currentValue: '--',
		    		yyzsrtbzz: ''
	    		}
	    	}
	    },
	    methods: {
	    	selectChange(newVal) {
	    		this.curDate = newVal
	    		this.card1.list = []
	    		this.card2.list = []
	    		this.card3.list = []
	    		this.card4.list = []
	    		this.loadData()
	    	},
		    getBgImage() {
		    	return {backgroundImage: `url(${this.getStaticPath('/static/img/bg.jpg')})`}
		    },
		    initParam() {
		    	this.data1 = data1
	    		this.data2 = data2
	    		this.iconCls = ['nxst-money', 'nxst-fzze', 'nxst-jzc', 'nxst-money', 'nxst-lrzr', 'nxst-tz']
		    },
		    getTotalAsset() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.getTotalAsset(params)
		    		.then((res) => {
		            	this.card1.list = res
		            	this.card1.percent = getPercent(res, 'percent')
		            	this.card1.currentValue = getCurrentValue(res)
			        })
		    },
		    getFzze() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	let handleFzl = (fz, zc) => {
		    		let percent = fz / zc * 100
		    		if (isNaN(percent)) {
		    			return '--'
		    		}
		    		return percent.toFixed(2) + '%'
		    	}
		    	api.getFzze(params)
		    		.then((res) => {
		            	this.card2.list = res
		            	this.card2.percent = getPercent(res, 'percent')
		            	this.card2.currentValue = getCurrentValue(res)
		            	this.card2.fzl = handleFzl(this.card2.currentValue, this.card1.currentValue)
			        })
		    },
		    getJzc() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.getJzc(params)
		    		.then((res) => {
		            	this.card3.list = res
		            	this.card3.percent = getPercent(res, 'percent')
		            	this.card3.currentValue = getCurrentValue(res)
			        })
		    },
		    getYysr() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.getYysr(params)
		    		.then((res) => {
		            	this.card4.list = res
		            	this.card4.percent = getPercent(res, 'percent')
		            	this.card4.currentValue = getCurrentValue(res)
		            	this.card4.yyzsrtbzz = getPercent(res, 'yyzsrtbzz')
			        })
		    },
		    loadData() {
		    	this.getTotalAsset()
	    		this.getFzze()
	    		this.getJzc()
	    		this.getYysr()
		    }
	    },
	    created() {
	    	this.initParam()
	    	this.loadData()
	    }
	}
</script>

<style scoped lang="less">
	@import "../assets/less/variable.less";
	.Manage {
		.top {
			display: flex;
			margin-bottom: 10px;
			.search-year {
				flex-basis: 120px;
			}
		}
		.content-warp {
			display: flex;
			// height: 1145px;
			.left {
				display: flex;
				flex: 1;
				margin-right: 10px;
				background-repeat: no-repeat;
    			background-position: center;
    			background-size: cover;
				.cards {
					.card {
						margin: 15px; 
						padding: 10px;
						&.ON {
					      border: 2px solid @color-theme;
					    }
					    h3 {
					    	margin-bottom: 6px;
					    }
					    .totalMoney, .liabilityPercent {
					    	margin-bottom: 6px;
					    	.title {
					    		margin-right: 6px;
					    	}
							.title, .strongCount {
								font-size: 16px;
					    		font-weight: bold;
					    	}
					    	.strongCount {
								display: inline-block;
							    padding: 5px 20px 5px 5px;
							    border-radius: 0 20px 20px 0;
							    min-width: 80px;
    							box-sizing: border-box;
					    	}
					    }
					    .totalMoney {
					    	
					    	
					    }
					}
				}
				.map-wrap {
					flex: 1;
					text-align: center;
					margin-top: 60px;
				}
			}
			.right {
				// display: flex;
				// flex-direction: column;
				// justify-content: space-between;
				.carts {
					// flex: 1;
					// display: flex;
				    // flex-direction: column;
				    // justify-content: space-between;
				    .card {
				    	margin-top: 10px;
				    	&:first-child {
				    		margin-top: 0;
				    	}
				    }
				}
			}
		}
	}
</style>