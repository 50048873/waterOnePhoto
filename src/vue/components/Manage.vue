<template>
  <section class="Manage">
	<div class="left" :style="getBgImage()">
		<div class="select-wrap">
	    	<div class="search-year">
	    		<select-year @selectChange="selectChange"></select-year>
	    	</div>
	    </div>
		<div class="cards">
    		<card class="card ON" :percent="card1.percent" :iconCls="iconCls[0]">
    			<template slot="titlePart">
    				<h3>
			          <span>总资产</span>
			          <span>（亿元）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title"><b class="fs-20">{{card1.currentValue}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card1.list" :hasMin="card1.hasMin" v-if="card1.list.length"></chart-money>
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
			          <span class="strongCount bgc-theme"><b class="fs-20">{{card2.currentValue}}</b></span>
			        </div>
			        <div class="liabilityPercent">
			          <span class="title">负债率</span>
			          <span class="strongCount bgc-green"><b class="fs-20">{{card2.fzl}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card2.list" :hasMin="card2.hasMin" v-if="card2.list.length"></chart-money>
		        </template>
    		</card>
    		<card class="card" :percent="card3.percent" :iconCls="iconCls[2]">
    			<template slot="titlePart">
    				<h3>
			          <span>净资产</span>
			          <span>（亿元）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title"><b class="fs-20">{{card3.currentValue}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card3.list" :hasMin="card3.hasMin" v-if="card3.list.length"></chart-money>
		        </template>
    		</card>
    		<card class="card" :percent="card4.percent" :iconCls="iconCls[3]">
    			<template slot="titlePart">
    				<h3>
			          <span>营业总收入</span>
			          <span>（万元）</span>
			        </h3>
	    			<div class="totalMoney">
			          <span class="title"><b class="fs-20">{{card4.currentValue}}</b></span>
			        </div>
			        <div class="liabilityPercent">
			          <span class="title">完成率</span>
			          <span class="strongCount bgc-theme"><b class="fs-20">{{card4.yyzsrtbzz}}</b></span>
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
			          <span class="strongCount bgc-theme"><b class="fs-20">{{card5.currentValue}}</b></span>
			        </div>
			        <div class="liabilityPercent">
			          <span class="title">净利润</span>
			          <span class="strongCount bgc-green"><b class="fs-20">{{card5.jlr}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card5.list" v-if="card5.list.length"></chart-money>
		        </template>
    		</card>
    		<card class="card" :percent="card6.percent" :iconCls="iconCls[5]">
    			<template slot="titlePart">
    				<h3>
			          <span>投资</span>
			          <span>（万元）</span>
			        </h3>
	    			<div class="totalMoney">
	    			  <span class="title">完成</span>
			          <span class="strongCount bgc-theme"><b class="fs-20">{{card6.currentValue}}</b></span>
			        </div>
			        <div class="liabilityPercent">
			          <span class="title">计划</span>
			          <span class="strongCount bgc-green"><b class="fs-20">{{card6.jhtz}}</b></span>
			        </div>
		        </template>
		        <template slot="chartPart">
		        	<chart-money :data="card6.list" v-if="card6.list.length"></chart-money>
		        </template>
    		</card>
		</div>
		<div class="map-wrap">
			<map-nx></map-nx>
		</div>
	</div>
	<div class="right m-content-right">
		<tab :data="tabData" @tabChange="tabChange"></tab>
		<div class="carts">
			<card-two class="card" title="各分公司供水量（万吨）">
				<chart-columnar-basic :data="card7.list" v-if="card7.list.length"></chart-columnar-basic>
			</card-two>
			<card-two class="card" title="利润总额分版块构成">
				<chart-annular :data="card8.list" v-if="card8.list.length"></chart-annular>
			</card-two>
			<card-two class="card" title="各公司营业收入、净利润，计划完成率" height="400">
				<chart-bar-basic :data="card9.list" v-if="card9.list.length"></chart-bar-basic>
			</card-two>
		</div>
	</div>
  </section>
</template>

<script>
	const tabData = [
	    {
	      title: '2017'
	    },
	    {
	      title: '2016'
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
	import {getCurrentValue} from '../assets/js/util'
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
	    		tabData: tabData,
	    		curDate: '2017',
	    		card1: {
	    			percent: '',
		    		list: [],
		    		currentValue: '',
		    		hasMin: true
	    		},
	    		card2: {
	    			percent: '',
		    		list: [],
		    		currentValue: '',
		    		fzl: '',
		    		hasMin: true
	    		},
	    		card3: {
	    			percent: '',
		    		list: [],
		    		currentValue: '',
		    		hasMin: true
	    		},
	    		card4: {
	    			percent: '',
		    		list: [],
		    		currentValue: '',
		    		yyzsrtbzz: ''
	    		},
	    		card5: {
		    		list: [],
		    		currentValue: '',
		    		jlr: ''
	    		},
	    		card6: {
	    			percent: '',
		    		list: [],
		    		currentValue: '',
		    		jhtz: ''
	    		},
	    		card7: {
		    		list: []
	    		},
	    		card8: {
		    		list: []
	    		},
	    		card9: {
		    		list: []
	    		}
	    	}
	    },
	    methods: {
	    	selectChange(newVal) {
	    		this.curDate = newVal
	    		this.tabData[0].title = newVal
	    		this.tabData[1].title = parseInt(newVal) - 1
	    		this.card1.list = []
	    		this.card2.list = []
	    		this.card3.list = []
	    		this.card4.list = []
	    		this.card5.list = []
	    		this.card6.list = []
	    		this.card7.list = []
	    		this.card8.list = []
	    		this.card9.list = []
	    		this.loadData()
	    	},
	    	tabChange(index, title) {
	    		let params = {
	    			curDate: title
	    		}
	    		this.get_7(params)
	    	},
		    getBgImage() {
		    	return {backgroundImage: `url(${this.getStaticPath('/static/img/bg.jpg')})`}
		    },
		    initParam() {
	    		this.iconCls = ['nxst-money', 'nxst-fzze', 'nxst-jzc', 'nxst-money', 'nxst-lrzr', 'nxst-tz']
		    },
		    get_1() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_1(params)
		    		.then((res) => {
		            	this.card1.list = res.list
		            	this.card1.percent = getCurrentValue(res.list, 'percent')
		            	this.card1.currentValue = getCurrentValue(res.list, 'y')
			        })
		    },
		    get_2() {
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
		    	api.get_2(params)
		    		.then((res) => {
		            	this.card2.list = res.list
		            	this.card2.percent = getCurrentValue(res.list, 'percent')
		            	this.card2.currentValue = getCurrentValue(res.list, 'y')
		            	this.card2.fzl = handleFzl(this.card2.currentValue, this.card1.currentValue)
			        })
		    },
		    get_3() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_3(params)
		    		.then((res) => {
		            	this.card3.list = res.list
		            	this.card3.percent = getCurrentValue(res.list, 'percent')
		            	this.card3.currentValue = getCurrentValue(res.list, 'y')
			        })
		    },
		    get_4() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_4(params)
		    		.then((res) => {
		            	this.card4.list = res.list
		            	this.card4.percent = getCurrentValue(res.list, 'percent')
		            	this.card4.currentValue = getCurrentValue(res.list, 'y')
		            	this.card4.yyzsrtbzz = getCurrentValue(res.list, 'yyzsrtbzz')
			        })
		    },
		    get_5() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_5(params)
		    		.then((res) => {
		            	this.card5.list = res.list
		            	this.card5.currentValue = getCurrentValue(res.list, 'y')
		            	this.card5.jlr = getCurrentValue(res.list, 'jlr')
			        })
		    },
		    get_6() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_6(params)
		    		.then((res) => {
		            	this.card6.list = res.list
		            	this.card6.percent = getCurrentValue(res.list, 'percent')
		            	this.card6.currentValue = getCurrentValue(res.list, 'y')
		            	this.card6.jhtz = getCurrentValue(res.list, 'jhtz')
			        })
		    },
		    get_7(params) {
		    	if (!params) {
		    		params = {
			    		curDate: this.curDate
			    	}
		    	}
		    	api.get_7(params)
		    		.then((res) => {
		            	this.card7.list = res.list
			        })
		    },
		    get_8() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_8(params)
		    		.then((res) => {
		            	this.card8.list = res.list
			        })
		    },
		    get_9() {
		    	let params = {
		    		curDate: this.curDate
		    	}
		    	api.get_9(params)
		    		.then((res) => {
		            	this.card9.list = res.list
			        })
		    },
		    loadData() {
		    	this.get_1()
	    		this.get_2()
	    		this.get_3()
	    		this.get_4()
	    		this.get_5()
	    		this.get_6()
	    		this.get_7()
	    		this.get_8()
	    		this.get_9()
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
		display: flex;
		.left {
			display: flex;
			flex: 1;
			margin-right: 10px;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			position: relative;
			.select-wrap {
				position: absolute;
				top: 10px;
				right: 10px;
				.search-year {
					width: 120px;
				}
			}
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
</style>