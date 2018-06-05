<template>
  <div class="SelectYear">
    <el-select v-model="value" placeholder="请选择" size="medium">
	    <el-option
	      v-for="item in options"
	      :key="item.value"
	      :label="item.label"
	      :value="item.value">
	    </el-option>
	</el-select>
  </div>
</template>

<script>
	export default {
		name: 'SelectYear',
		data() {
	      return {
	        options: [{
	          value: '2018',
	          label: '2018'
	        }, {
	          value: '2017',
	          label: '2017'
	        }, {
	          value: '2016',
	          label: '2016'
	        }],
	        value: '2017'
	      }
	    },
	    watch: {
	    	value(newVal, oldVal) {
	    		if (newVal) {
	    			this.$emit('selectChange', newVal)
	    		}
	    	}
	    }
	}
</script>

<style scoped lang="less">
	.SelectYear {

	}
</style>
