<template>
 <div class="tab">
  <el-button type="primary" @click="handleAddJson('resp')" >添加</el-button>
  <el-button type="primary" @click="handleFormatJson('resp')" >格式化JSON</el-button>
  <el-table
    :data="resTreeData"
    class="json-table"
    :show-header="true"
    :highlight-current-row="false"
    row-key="id" 
    size="medium"
    default-expand-all
    :tree-props="{children: 'children',hasChildren: 'hasChildren'}">
      <el-table-column label="参数名称">
        <template  #default="scope">
          <el-input placeholder="参数名称" v-model="scope.row.jsonName"></el-input>
        </template>
      </el-table-column>
        <el-table-column label="参数类型">
          <template  #default="scope">
              <el-select v-model="scope.row.jsonType" placeholder="参数类型">
                <el-option v-for="item in fieldTypeOpts" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template #default="scope">
            <el-input placeholder="备注" v-model="scope.row.jsonRemark"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template  #default="scope">
            <el-tooltip class="item" effect="dark" content="添加子节点" placement="top" :open-delay="500">
              <el-icon v-if="isShow(scope.row)"  class="el-icon-plus" @click="addJsonChildrenClick(scope.row, 'resp')"><CirclePlus /></el-icon>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除节点" placement="top" :open-delay="500">
              <el-icon v-if="!scope.row.isDelete" class="el-icon-remove" @click="changeRowStatus(scope.row)"><Remove /></el-icon>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除节点" placement="top" :open-delay="500">
              <el-icon v-if="scope.row.isDelete" class="el-icon-close" @click="removeJsonClick(scope.row, 'resp')"><CircleClose /></el-icon>
            </el-tooltip>
          </template>
        </el-table-column>
    </el-table>
 </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { CirclePlus, Remove, CircleClose } from '@element-plus/icons-vue'
const resTreeData = ref([]);
const fieldTypeOpts = reactive([
  { label: 'string', value: 'string' },
  { label: 'number', value: 'number' },
  { label: 'array', value: 'array' },
  { label: 'object', value: 'object' },
  { label: 'boolean', value: 'boolean' }
])

const isShow = computed(() => {
  return (row) => {
    return row.jsonType === 'array' || row.jsonType === 'object';
  }
})

const getGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16)
  })
}

const handleAddJson = (type) => {
  // 添加json字段
  if(type === 'resp'){
    let obj = {
      id: getGuid(),
      jsonName: 'test',
      jsonType: 'object',
      jsonRemark: '测试字段',
      // pid: 0,
      children: []
    }
    resTreeData.value.push(obj)
  }
}

const judgeJsonDataType = (data) => {
  // 判断数据的类型
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
}

const jsonDataConvertor = (data) => {
  // json数据转换器
  let arr = []
  Object.keys(data).map((key) => {
    let _type = judgeJsonDataType(data[key])
    if (_type && _type == 'object') {
      let children = jsonDataConvertor(data[key])
      arr.push({
        id: getGuid(),
        pid: data.id,
        jsonName: key,
        jsonType: _type,
        jsonRemark: '',
        isDelete: false,
        children
      })
    } else {
      arr.push({
        id: getGuid(),
        jsonName: key,
        jsonType: _type,
        isDelete: false,
        jsonRemark: ''
      })
    }
  })
  return arr
}

const getJson = (data, type) => {
  let _data = JSON.parse(data);
  // 判断数据的类型
  let dataType = judgeJsonDataType(_data)
  let arr = []
  if (dataType === 'object') {
    // 对象类型
    arr = jsonDataConvertor(_data)
  }
  if (type === 'resq') {
    resTreeData.value = arr
  }
}

const handleFormatJson = (type) => {
  // 格式化json数据
  const json = {
    "name":"lemon",
    "sex":"女",
    "age":18,
    "hobby":{"hobby1":"敲代码","hobby2":"跳恰恰"},
    "likeArr":["水果","青菜"]
  };
  getJson(JSON.stringify(json), 'resq')
}

const changeRowStatus = (data) => {
  data.isDelete = true
}

const addNode = (list, pid, obj) => {
  // 递归查找节点,对应节点添加
  list.forEach((e) => {
    if (e.id == pid) {
      e.children ? e.children.push(obj) : (e.children = [obj])
    } else {
      if (e.children && e.children.length > 0) {
        addNode(e.children, pid, obj)
      }
    }
  })
  return list
};

const addJsonChildrenClick = (data, type) => {
  // 添加节点
  let obj = {
      id: getGuid(),
      jsonName: '',
      jsonType: 'string',
      jsonRemark: '',
      pid: data.id,
      isDelete: false
  }
  let node = addNode(resTreeData.value, data.id, obj)
  if (type === 'resp') {
    resTreeData.value = JSON.parse(JSON.stringify(node));
  }
}

const removeItem = (root, id) => {
  // 递归查找节点进行删除
  root.forEach((e, i) => {
    if (e.id === id) {
      root.splice(i, 1)
    } else if (e.children && e.children.length > 0) {
      removeItem(e.children, id)
    }
  })
  return root
}
const removeJsonClick = (data, type) => {
  // 删除节点
  let objMap = {
    resp: resTreeData.value,
  }
  let node = removeItem(objMap[type], data.id)
  if (type === 'resp') {
    resTreeData.value = JSON.parse(JSON.stringify(node))
  }
}
</script>
<style lang="less" scoped>
.tab {
  width: 100%;
  padding:20px;
  box-sizing:border-box;
}
.json-table {
  width: 100%;
}
.json-table {
  :deep(.el-table__body-wrapper) {
    .el-table__cell {
      border: 0;
      .cell {
        display: flex;
        align-items: center;
        .el-input,
        .el-select {
          width: 100%;
        }
        > i {
          width: 33%;
          cursor: pointer;
        }
      }
    }
  }
}
.el-icon-plus {
  color: #409eff;
}
.el-icon-close {
  color: #f00;
}
</style>