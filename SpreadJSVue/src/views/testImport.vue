<template>
  <div class="componentContainer">
    <p>此页面用于测试Excel的导入</p>
    <div>
      <input type="file" id="fileDemo" class="input" accept=".xlsx" @change="importExcel">
      </br>
      </br>
      <input type="text" :value="value" id="test" class="input" @blur="blur"><input type="button" @click="getRemove" value="获取远程数据">
      </br>
      </br>
      <input type="button" @click="exportXlsx('yes')" value="带模板导出">
      <input type="button" @click="exportXlsx('no')" value="无模板导出">
      <input type="button" @click="download" value="下载json数据">
    </div>
  </div>
</template>
<script>
import ExcelIO from '@grapecity/spread-excelio';
import FaverSaver from 'file-saver'
import axios from "axios"
export default {
  name: "TestImport",
  data() {
    return {
      value: "api/file",
      tempData: {},
      excelIo:null,
    }
  },
  mounted() {
    this.excelIo = new ExcelIO.IO();
  },
  methods:{
    blur() {
      console.log(222)
    },
    getRemove() {
      axios({
        method: "post",
        url: this.value, 
        data: {
          test: "test data",
        },
        responseType: 'blob'
      }).then(res => {
        const url = window.URL.createObjectURL(res.data);
        console.log(url)
        const a = document.createElement("a");
        a.href = url;
        a.download = "template.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
    },
    getRemove1() {
      axios.get(this.value,{
        params: {
          userid: '9999'
        },
        headers: {
          'Content-Type': 'application/octet-stream',
          token: 'xxxxxxxxx'
        },
        responseType: 'blob',
        before: function() {
          console.log('before init');
        }
      }).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    importExcel(e) {
      let excelFile = e.target.files[0];
      this.excelIo.open(excelFile, (json) => {
        this.tempData = json;
      }, function (e) {
      });
    },
    processData(type) {
      // 数据逻辑处理
      type === "no" && (this.tempData = require("./metaData.json"));
      console.log(this.tempData)
      let sheet = this.tempData.sheets["Sheet1"];
      let obj = sheet.data.dataTable;
      // let mockData = require("./mock.json");
      type === "no" && (sheet.columnCount = 3);
      let mockData = this.combineData(sheet);
      let dataTable = {}
      if (type === "yes") {
        let firstObj = {"0": obj["0"]};
        sheet.data.dataTable = {};
        dataTable = {...firstObj, ...mockData};
      } else {
        let firstObj = {"0": {
          "0":{ value: "name"},
          "1":{ value: "age"},
          "2":{ value: "sex"}
        }};
        sheet.data.dataTable = {};
        dataTable = {...firstObj, ...mockData};
      }
      sheet.data.dataTable = dataTable;
      // 获取需要导出的行数
      let rowNum = Object.keys(dataTable);
      let rows = sheet.rows;
      if (!rows) {
        rows = rowNum.map(item => {
          return {
            size:18
          }
        })
      }
      if (rowNum.length !== rows.length) {
        rowNum.forEach((item, index) => {
          if (index >= rows.length) {
            rows.push({size: 18});
          }
        });
      }
      sheet.activeRow = rows.length;
      sheet.rowCount = rows.length;
      sheet.activeCol = 3
    },
    combineData(sheet) {
      // 组装假数据；
      const rowNum = 100;
      let obj = {}
      for (let row = 1; row <= rowNum; row++ ) {
        let rowObj = {}
        for(let col = 0; col < sheet.columnCount; col++) {
          rowObj[+col] = {
            value: `这是第${row}行-${col}列`
          }
        }
        obj[row] = rowObj;
      }
      return obj;
    },
    exportXlsx(type) {
      this.processData(type);
      this.excelIo.save(this.tempData, (blob) => {
        FaverSaver.saveAs(blob, 'export.xlsx');
        setTimeout(()=> {
        })
      }, (e) => {
        console.log(e)
      })
    },
    download() {
      // 下载json数据
      let content = JSON.stringify(this.tempData);
      let blob = new Blob([content], {type: "text/plain;charset=utf-8"});
      FaverSaver.saveAs(blob, "save.json");
    }
  }
}
</script>
<style scoped>
  .componentContainer {
    position: absolute;
    padding: 10px;
    left: 242px;
    top: 0;
    bottom: 20px;
    right: 0;
  }
  .spreadContainer {
    padding: 10px;
    box-shadow: 0 0 20px grey;
  }
  .spreadContainer{
    position: absolute;
    left: 0px;
    right: 30px;
    top: 100px;
    bottom: 10px;
  }
  .spreadHost{
    width: 100%;
    height: 100%;
  }
</style>
