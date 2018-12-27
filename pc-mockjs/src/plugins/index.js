import alert from './alert/index.js'
import confirm from './confirm/index.js'
import Dialog from './dialog/index.js'

const install = function(Vue) {
    //注册全局组件
    Vue.component(alert.name, alert)
    Vue.component(confirm.name, confirm)
    Vue.component(Dialog.name, Dialog)
    //添加全局API
    Vue.prototype.$_alert = alert
    Vue.prototype.$_confirm = confirm
}
export default install