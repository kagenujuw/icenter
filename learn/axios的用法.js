function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermission() {
  return axios.get('/user/123/permission');
}

axios.all([getUserAccount(), getUserPermission()]).then(axios.spread((acct, perms) => {
  console.log(acct, perms)
}))

/**
 * axios的get请求
 */
axios.get('../package.json',{
  params: {
    userid: '9999'
  },
  headers: {
    token: 'xxxxxxxxx'
  },
  before: function() {
    console.log('before init');
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

/** 
 * axios的post请求
*/
axios.post("../package.json", {
  userid: '8888'
}, {
  headers: {
    token: 'xxxxxxxxxxxxxx'
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

axios({
  url: '../package.json',
  method: 'get',
  data: {
    userid: '777777'
  },
  params: {
    userid: '777'
  },
  headers: {
    token: 'xxxxxxxxxxxxx'
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})