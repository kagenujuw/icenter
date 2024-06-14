<template>
  <el-main>
    <div class="scale">
      <el-button icon="el-icon-plus" size="small" @click="scale += 10" :disabled="scale >= 150" circle></el-button>
      <span>{{ scale }}%</span>
      <el-button icon="el-icon-minus" size="small" @click="scale -= 10" :disabled="scale <= 40" circle></el-button>
      <!-- <el-button @click="validate">校验流程</el-button> -->
    </div>
    <!-- 流程区域 -->
    <div class="design" :style="'transform: scale('+ scale / 100 +');'">
      <processTree ref="process-tree" @selectedNode="nodeSelected"/>
    </div>

    <el-drawer :title="selectedNode.name" :visible.sync="showConfig"
               :modal-append-to-body="false"
               :size="selectedNode.type === 'CONDITION' ? '600px':'500px'"
               direction="rtl" :modal="false" destroy-on-close>
      <div slot="title">
        <el-input v-model="selectedNode.name" size="medium" v-show="showInput"
                  style="width: 300px" @blur="showInput = false"></el-input>
        <el-link v-show="!showInput" @click="showInput = true" style="font-size: medium">
          <i class="el-icon-edit" style="margin-right: 10px"></i>
          {{selectedNode.name}}
        </el-link>
      </div>
      <div class="node-config-content">
        <node-config/>
      </div>
    </el-drawer>
  </el-main>
</template>
<script>
import processTree from './src/processTree.vue'
import NodeConfig from './common/process/config/NodeConfig'

export default {
  name: 'flow',
  components: {
    processTree,
    NodeConfig
  },
  data() {
    return {
      scale: 100,
      selected: {},
      showInput: false,
      showConfig: false
    }
  },
  computed:{
    selectedNode(){
      return this.$store.state.selectedNode
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      const config = {
        formId: null,
        formName: "未命名表单",
        logo: {
          icon: "el-icon-eleme",
          background: "#1e90ff"
        },
        settings: {
          commiter: [],
          admin: [],
          sign: false,
          notify: {
            types: ["APP"],
            title: "消息通知标题"
          }
        },
        groupId: undefined,
        formItems: [],
        process: {
          id: "root",
          parentId: null,
          type: "ROOT",
          name: "发起人",
          desc: "任何人",
          props: {
            assignedUser: [],
            formPerms: []
          },
          children: {}
        },
        remark: "备注说明"
      }
      this.$store.commit('loadForm', config)
    },
    validate(){
      return this.$refs["process-tree"].validateProcess()
    },
    nodeSelected(node){
      console.log('配置节点', node)
      this.showConfig = true
    }
  }
}
</script>
<style lang="less" scoped>
.design {
  margin-top: 100px;
  display: flex;
  transform-origin: 50% 0px 0px;
}

.scale {
  z-index: 999;
  position: fixed;
  top: 80px;
  right: 40px;

  span {
    margin: 0 10px;
    font-size: 15px;
    color: #7a7a7a;
    width: 50px;
  }
}

.node-config-content{
  padding: 0 20px 20px;
}

/deep/ .el-drawer__body{
  overflow-y: auto;
}