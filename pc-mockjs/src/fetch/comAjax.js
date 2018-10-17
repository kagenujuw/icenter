import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.timeout = 60000
axios.defaults.baseURL = process.env.NODE_ENV === 'development'?'http://localhost:3000':'http://api.yibowanbo.com'

//axios拦截器
axios.interceptors.request.use(config => {
	return config
},error =>{
	console.log('请求超时，请重新请求')
	return Promise.reject(error)
})

axios.interceptors.response.use(data => {
	return data
},error => {
	console.log('请求超时，请重新请求')
	return Promise.reject(error)
})

export default {
	get(url,params = {}) {
		return new Promise((resolve, reject) => {
			axios.get(url, params, {headers:{token:'http-test'}}).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		})
	},
	post(url,params = {}) {
		return new Promise((resolve, reject) => {
			axios.post(url, params, {headers:{token:'tom'}}).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		})
	},
	delete(url,params = {}) {
		return new Promise((reslove, reject) => {
			axios({
				url:url,
				method: 'delete',
				params,
				headers:{token:'http-test'}
			}).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		})
	},
	put(url,params = {}) {
		return new Promise((reslove, reject) => {
			axios({
				url:url,
				method: 'put',
				data:params,
				timeout:30000,
				headers:{
					token:'http-test',
					'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(res => {
				resolve(res.data)
			}).catch(err => {
				reject(err)
			})
		})
	},
}
