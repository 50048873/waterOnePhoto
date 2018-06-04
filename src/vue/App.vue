<template>
	<section id="app">
		<nav-left :data=data class="nav-left m-nav-left"></nav-left>
		<div class="main-wrap">
			<router-view></router-view>
		</div>
	</section>
</template>

<script>
	const data = [
	    {
	      iconCls: '',
	      title: '经营',
	      path: '/manage'
	    },
	    {
	      iconCls: '',
	      title: '生产',
	      path: '/produce'
	    },
	    {
	      iconCls: '',
	      title: '客服',
	      path: '/customerService'
	    },
	    {
	      iconCls: '',
	      title: '安全',
	      path: '/security'
	    }
	]
	import NavLeft from './components/NavLeft.vue';
	export default {
		name: 'App',
		components: {
			NavLeft
		},
		data() {
			return {
				data: data
			}
		}
	};
</script>

<style scoped lang="less">
	#app {
		display: flex;
		min-height: 100%;
		background-color: #e0e1e3;
		.nav-left {
			
		}
		.main-wrap {
			flex: 1;
			margin: 10px;
		}
	}
</style>