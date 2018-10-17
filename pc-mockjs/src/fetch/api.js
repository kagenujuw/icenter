import comAjax from './comAjax.js'
export default {
	//获取全部任务的列表数据
	getAllTask(params){
		return comAjax.post('/posts',params)
	},
	getMyOwnTask(params){
		return comAjax.get('/myowntask',params)
	},
	getAttendTask(params){
		return comAjax.get('/attendtask',params)
	},
	getCompletedTask(params){
		return comAjax.get('/completedtask',params)
	}
}