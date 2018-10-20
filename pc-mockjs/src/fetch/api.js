import comAjax from './comAjax.js'
export default {
	//获取全部任务的列表数据
	taskAdd(params){
		return comAjax.post('/api/taskAdd',params)
	},
	getAllTask(params){
		return comAjax.get('/api/taskAdd',params)
	},
	getMyOwnTask(params){
		return comAjax.get('/api/myowntask',params)
	},
	getAttendTask(params){
		return comAjax.get('/api/attendtask',params)
	},
	getCompletedTask(params){
		return comAjax.get('/api/completedtask',params)
	}
}