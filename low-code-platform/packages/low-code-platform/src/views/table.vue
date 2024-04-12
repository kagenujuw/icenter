<template>
  <!-- 返回数据设置 -->
  <div class="panel-item">
    <div class="panel-item-tab">
     <div class="blue" v-show="activeTabName == 'first'" @click="addJsonClick('resp')" > 添加 </div>

     <div class="blue" v-show="activeTabName == 'first'" @click="formatJson('resp')" > 格式化 </div>

        <el-tabs v-model="activeTabName" type="card" class="card-tab">
            <el-tab-pane label="模板" name="first">
                <el-table
                    :data="threeStepData.responseParams"
                    class="json-table"
                    :show-header="true"
                    :highlight-current-row="false"
                    row-key="id" size="medium"
                    default-expand-all
                    :tree-props="{children: 'children',hasChildren: 'hasChildren'}">
                    <el-table-column label="参数名称">
                        <template  #default="scopes">
                            <el-input placeholder="name" v-model="scopes.row.jsonName">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="参数类型">
                        <template  #default="scopes">
                            <el-select v-model="scopes.row.jsonType" placeholder="type">
                                <el-option
                                    v-for="item in typeData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注">
                        <template  #default="scopes">
                            <el-input placeholder="备注" v-model="scopes.row.jsonRemark">
                            </el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template  #default="scopes">
                            <el-tooltip
                                class="item"
                                effect="dark"
                                content="删除节点"
                                placement="top" :open-delay="500">
                                <i class="blue el-icon-close" @click="removeJsonClick(scopes.row, 'resp')">删除</i>
                            </el-tooltip>
                            <el-tooltip
                                class="item"
                                effect="dark"
                                content="添加子节点"
                                placement="top" :open-delay="500">
                                <i class="blue el-icon-plus" @click="addJsonChildrenClick(scopes.row, 'resp')">添加</i>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>
<script>
import { EditPen } from '@element-plus/icons-vue'
export default {
    components: {
    },
     data() {
        return {
            threeStepData: {
                responseParams: [
                    // {
                    //     id: 1,
                    //     jsonName: 'root',
                    //     jsonType: 'object',
                    //     jsonRemark: '备注',
                    //     pid: 0,
                    //     children: []
                    // }
                    {
                      "name":"lemon",
                      "sex":"女",
                      "age":18,
                      "hobby":{
                        "hobby1":"敲代码",
                        "hobby2":"跳恰恰"
                        },
                      "likeArr":["水果","青菜"]
                    }
                ]
            },
            checkRespLabel: 'JSON',
            activeTabName: 'first',
            typeData: [
                { label: 'string', value: 'string' },
                { label: 'number', value: 'number' },
                { label: 'array', value: 'array' },
                { label: 'object', value: 'object' },
                { label: 'boolean', value: 'boolean' }
            ]
        }
    },
    methods: {
        // 生成唯一id
        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
                /[xy]/g,
                function (c) {
                    let r = (Math.random() * 16) | 0,
                        v = c == 'x' ? r : (r & 0x3) | 0x8
                    return v.toString(16)
                }
            )
        },

        formatJson(){
          const json = {"name":"lemon","sex":"女","age":18,"hobby":{"hobby1":"敲代码","hobby2":"跳恰恰"},"likeArr":["水果","青菜"]};
          this.getJson(JSON.stringify(json), 'resq')
        },
        // 获取json导入数据
        getJson(data, type) {
            let _data = JSON.parse(data)
            let _type = this.getJsonType(_data)
            let arr = []
            if (_type === 'object') {
                arr = this.handleJson(_data)
            }
            if (type == 'resq') {
                this.threeStepData.responseParams = arr
                // this.threeStepData.responseParams[0].children = arr
            }
        },
        // json导入数据转换
        handleJson(data) {
            let arr = []
            Object.keys(data).map((key) => {
                let _type = this.getJsonType(data[key])
                if (_type && _type == 'object') {
                    let children = this.handleJson(data[key])
                    arr.push({
                        id: this.guid(),
                        pid: data.id,
                        jsonName: key,
                        jsonType: _type,
                        jsonRemark: '',
                        children
                    })
                } else {
                    arr.push({
                        id: this.guid(),
                        jsonName: key,
                        jsonType: _type,
                        jsonRemark: ''
                    })
                }
            })
            return arr
        },
        // 判断数据类型
        getJsonType(data) {
            let type = Object.prototype.toString.call(data)
            if (type === '[object String]') {
                type = 'string'
            } else if (type === '[object Number]') {
                type = 'number'
            } else if (type === '[object Null]') {
                type = 'null'
            } else if (type === '[object Boolean]') {
                type = 'boolean'
            } else if (type === '[object Array]') {
                type = 'array'
            } else if (type === '[object Object]') {
                type = 'object'
            } else {
                type = '未进行判断的类型:' + type
            }
            return type
        },
 
        // 新增json数据
        addJsonClick(type) {
            if(type=='resp'){
                // if(this.threeStepData.responseParams?.length==1){
                //     this.$message.closeAll();
                //     this.$message.error('请勿重复添加根节点！');
                //     return;
                // }
                let obj = {
                    id: this.guid(),
                    jsonName: '',
                    jsonType: 'object',
                    jsonRemark: '',
                    // pid: 0,
                    children: []
                }
                this.threeStepData.responseParams.push(obj)
            }
        },
        //添加子节点
        addJsonChildrenClick(data, type) {
            let obj = {
                id: this.guid(),
                jsonName: '',
                jsonType: 'string',
                jsonRemark: '',
                pid: data.id
            }
           let node = this.addNode(this.threeStepData.responseParams, data.id, obj)
           if (type === 'resp') {
                this.threeStepData.responseParams = JSON.parse(JSON.stringify(node))
            }
        },
        addNode(list, pid, obj) {
            list.forEach((e) => {
                if (e.id == pid) {
                    e.children ? e.children.push(obj) : (e.children = [obj])
                } else {
                    if (e.children && e.children.length > 0) {
                        this.addNode(e.children, pid, obj)
                    }
                }
            })
            return list
        },
        // 移除json数据
        removeJsonClick(data, type) {
            let objMap = {
                resp: this.threeStepData.responseParams,
            }
            let node = this.removeItem(objMap[type], data.id)
            if (type === 'resp') {
                this.threeStepData.responseParams = JSON.parse(JSON.stringify(node))
            }
        },
        removeItem(root, id) {
            root.forEach((e, i) => {
                if (e.id === id) {
                    root.splice(i, 1)
                } else if (e.children && e.children.length > 0) {
                    this.removeItem(e.children, id)
                }
            })
            return root
        }
    }
}
</script>

<style scoped lang="less">
:deep(.el-col) {
  img {
    width: 20px;
    height: 16px;
    cursor: ns-resize;
  }
  .el-input,
  .el-select {
    width: 100%;
    .el-input__inner {
      height: 40px;
      line-height: 40px;
    }
  }
  i {
    font-size: 14px;
  }
}
 
.panel-item {
  .panel-item-cell {
    padding: 5px 10px;
    border: 1px solid #e6eaef;
  }
  .panel-item-container{
    border: 1px solid #e6eaef;
    border-top:none;
    min-height: 80px;
    padding:10px 10px 20px 10px;
    .empty-contents{
        height: 40px;
        line-height: 40px;
        color: #909399;
        font-size: 14px; 
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }
    .panel-item-row {
        padding-top: 20px;
        .el-col {
        i {
            font-size: 20px;
        }
        }
    }
  }
  .panel-item-tab {
    position: relative;
    .json-btn {
      position: absolute;
      top: 16px;
      right: 10px;
      cursor: pointer;
      z-index: 9;
    }
  }
}

.json-table {
  padding: 20px;
  &::before {
    height: 0;
  }
  :deep(.el-table__body-wrapper) {
    .el-table__cell {
      border: 0;
      .cell {
        display: flex;
        align-items: center;
        .el-table__expand-icon {
          //   width: 60px;
          font-size: 14px;
        }
        .el-table__indent {
          //   padding-left: 70px !important;
        }
        .el-input,
        .el-select {
          height: 40px;
          width: 100%;
          .el-input__inner {
            height: 100% !important;
          }
        }
        > i {
          width: 33%;
          cursor: pointer;
        }
      }
    }
  }
}
</style>