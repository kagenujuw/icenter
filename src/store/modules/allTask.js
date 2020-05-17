import * as types from '../types.js'
const state = {
	task:[]
}

const actions = {
	saveAllTask:({commit},palyload) => {
		commit(types.SAVE_ALLTASK,palyload);
	}
}

const mutations = {
	[types.SAVE_ALLTASK](state,	res){
		state.task=	res
	},
	['addTask'](state,	res){
		state.task.unshift(	res);
	}
}

const getters = {
	task:(state)=>{state.task}
}

export default {
	state,
	actions,
	mutations,
	getters
}