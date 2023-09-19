<template>
  <div style="display: flex; width: 100%; height: 100%; align-item: center;">
    <a
      style="margin: auto; padding: 5px 11px; background-color: #5e7ce0; border-radius: 3px; color: #fff; cursor: pointer;"
      @click="handelExportExcelClick"
    >
      <small style="display: inline-flex; align-items: center; line-height: 1px;">导出数据</small>
    </a>
  </div>
</template>
 
<script>
import * as XLSX from 'xlsx'
// import * as XLSX_STYLE from 'xlsx-style' // Vue2 + Webpack
import * as XLSX_STYLE from 'xlsx-style-vite' // Vue3 + Vite
 
export default {
  data: () => ({
    targetList: []
  }),
  methods: {
    /**
     * 导出数据
     */
    handelExportExcelClick() {
      // 一、准备数据
      const list = this.getExportDataList()
      console.log('list =>', list)
 
      // 二、新建一个工作簿
      const workBook = XLSX.utils.book_new()
 
      // 三、使用二维数组生成一个工作表
      const workSheet = this.sheet_from_array_of_arrays(list)
 
      // 四、将 "A1" 到 "M1" 的单元格合并为 "A1"
      workSheet['!merges'] = [
        {
          s: { // s ("start"): c = 0 r = 0 -> "A1"
            r: 0,
            c: 0
          },
          e: { // e ("end"):   c = 0 r = 9 -> "J1"
            r: 0,
            c: 9
          }
        }
      ]
 
      // 五、设置每列的宽度（单位：px）
      const wsCols = [
        { wch: 10 },
        { wch: 30 },
        { wch: 40 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 20 },
        { wch: 20 },
      ]
      workSheet['!cols'] = wsCols
 
      // 六、设置每行的高度（单位：px）
      let wsRows = []
      for (let i in list) {
        if (i == 0) {
          wsRows.push({ hpx: 100 }) // 首行高度为 100px
        } else {
          // wsRows.push({ hpx: 30 }) // 其他行高度为 30px
        }
      }
      workSheet['!rows'] = wsRows
 
      // 七、设置单元格样式
      for (let key in workSheet) {
        if (key == '!ref' || key == '!merges' || key == '!cols' || key == '!rows') {
          continue
        } else {
          // 匹配表格第一行（注意 A1 单元已合并为一个单元），设置其样式
          if (key == 'A1') {
            workSheet[key] = {
              t: 's', // 设置单元格类型（type: b Boolean, e Error, n Number, d Date, s Text, z Stub）
              v: '爆款商品列表', // 设置单元格内容（raw value (number, string, Date object, boolean)）
              l: { Target: "https://sheetjs.com", Tooltip: "Find us @ SheetJS.com!" }, // 单元格超链接 cell hyperlink / tooltip (More Info)
              s: { // 设置单元格样式
                fill: { // 设置背景色
                  fgColor: { rgb: 'ffffff' },
                },
                font: { // 设置字体
                  name: '等线', // 字体名称
                  sz: 35, // 字体大小
                  bold: true, // 字体是否加粗
                  color: { rgb: '5e7ce0' }, // 文字颜色
                },
                alignment: { // 设置居中
                  horizontal: 'center', // 水平（向左、向右、居中）
                  vertical: 'center', // 上下（向上、向下、居中）
                  wrapText: false, // 设置单元格自动换行，目前仅对非合并单元格生效
                  indent: 0 // 设置单元格缩进
                },
              },
            }
          }
          // 匹配表格第二行（A2 B2 C2 D2...），设置其样式
          else if (key.match(/\d+/g).join('') == '2') {
            workSheet[key].s = {
              border: {
                top: {
                  style: 'thin',
                },
                bottom: {
                  style: 'thin',
                },
                left: {
                  style: 'thin',
                },
                right: {
                  style: 'thin',
                },
              },
              fill: { // 设置背景色
                fgColor: { rgb: 'eeeeee' },
              },
              font: { // 设置字体
                name: '微软雅黑', // 字体名称
                sz: 10, // 字体大小
              },
              alignment: {
                horizontal: 'center', // 水平（向左、向右、居中）
                vertical: 'center', // 上下（向上、向下、居中）
                wrapText: false, // 设置单元格自动换行，目前仅对非合并单元格生效
                indent: 0 // 设置单元格缩进
              }
            }
          }
          // 匹配表格中除了 B1 B2 的 B 列单元格，以及除了 C1 C2 的 C 列单元格，设置其样式
          else if ((key != 'B1' && key != 'B2' && key.indexOf('B') > -1) || (key != 'C1' && key != 'C2' && key.indexOf('C') > -1)) {
            workSheet[key].s = {
              border: {
                top: {
                  style: 'thin',
                },
                bottom: {
                  style: 'thin',
                },
                left: {
                  style: 'thin',
                },
                right: {
                  style: 'thin',
                },
              },
              fill: { // 设置背景色
                fgColor: { rgb: 'ffffff' },
              },
              font: { // 设置字体
                name: '微软雅黑', // 字体名称
                sz: 10, // 字体大小
              },
              alignment: {
                horizontal: 'left', // 水平（向左、向右、居中）
                vertical: 'center', // 上下（向上、向下、居中）
                wrapText: true, // 设置单元格自动换行，目前仅对非合并单元格生效
                indent: 1 // 设置单元格缩进
              }
            }
          }
          // 匹配表格中除了 G1 G2 的 G 列单元格，设置其样式
          else if (key != 'G1' && key != 'G2' && key.indexOf('G') > -1) {
            workSheet[key].s = {
              border: {
                top: {
                  style: 'thin',
                },
                bottom: {
                  style: 'thin',
                },
                left: {
                  style: 'thin',
                },
                right: {
                  style: 'thin',
                },
              },
              fill: { // 设置背景色
                fgColor: { rgb: 'ffffff' },
              },
              font: { // 设置字体
                name: '微软雅黑', // 字体名称
                sz: 10, // 字体大小
              },
              alignment: {
                horizontal: 'center', // 水平（向左、向右、居中）
                vertical: 'center', // 上下（向上、向下、居中）
                wrapText: false, // 设置单元格自动换行，目前仅对非合并单元格生效
                indent: 0 // 设置单元格缩进
              }
            }
 
            if (workSheet[key].v == '待审核') {
              workSheet[key].s.font.color = { rgb: '1a44d7' }
            } else if (workSheet[key].v == '审核已通过') {
              workSheet[key].s.font.color = { rgb: '4ab913' }
            } else if (workSheet[key].v == '审核未通过') {
              workSheet[key].s.font.color = { rgb: 'ed143d' }
            } else {
              workSheet[key].s.font.color = { rgb: '000000' }
            }
          }
          // 匹配表格中除了 H1 H2 的 H 列单元格，设置其样式
          else if (key != 'H1' && key != 'H2' && key.indexOf('H') > -1) {
            workSheet[key].s = {
              border: {
                top: {
                  style: 'thin',
                },
                bottom: {
                  style: 'thin',
                },
                left: {
                  style: 'thin',
                },
                right: {
                  style: 'thin',
                },
              },
              fill: { // 设置背景色
                fgColor: { rgb: 'ffffff' },
              },
              font: { // 设置字体
                name: '微软雅黑', // 字体名称
                sz: 10, // 字体大小
              },
              alignment: {
                horizontal: 'center', // 水平（向左、向右、居中）
                vertical: 'center', // 上下（向上、向下、居中）
                wrapText: false, // 设置单元格自动换行，目前仅对非合并单元格生效
                indent: 0 // 设置单元格缩进
              }
            }
 
            if (workSheet[key].v == '待上架') {
              workSheet[key].s.font.color = { rgb: '1a44d7' }
              workSheet[key].s.fill.fgColor = { rgb: 'eff2fc' }
            } else if (workSheet[key].v == '正常') {
              workSheet[key].s.font.color = { rgb: '4ab913' }
              workSheet[key].s.fill.fgColor = { rgb: 'f0f9eb' }
            } else if (workSheet[key].v == '已下架') {
              workSheet[key].s.font.color = { rgb: 'ed143d' }
              workSheet[key].s.fill.fgColor = { rgb: 'fef0f0' }
            } else {
              workSheet[key].s.font.color = { rgb: '000000' }
              workSheet[key].s.fill.fgColor = { rgb: 'ffffff' }
            }
          }
          // 其它单元格，设置其样式
          else {
            workSheet[key].s = {
              border: {
                top: {
                  style: 'thin',
                },
                bottom: {
                  style: 'thin',
                },
                left: {
                  style: 'thin',
                },
                right: {
                  style: 'thin',
                },
              },
              fill: { // 设置背景色
                fgColor: { rgb: 'ffffff' },
              },
              font: { // 设置字体
                name: '微软雅黑', // 字体名称
                sz: 10, // 字体大小
              },
              alignment: {
                horizontal: 'center', // 水平（向左、向右、居中）
                vertical: 'center', // 上下（向上、向下、居中）
                wrapText: false, // 设置单元格自动换行，目前仅对非合并单元格生效
                indent: 0 // 设置单元格缩进
              }
            }
          }
        }
      }
      console.log('workSheet =>', workSheet)
 
      // 八、在工作簿中添加工作表
      XLSX.utils.book_append_sheet(workBook, workSheet, '第一页')
 
      // 九、使用 xlsx-style 写入文件方式，使得自定义样式生效
      const tmpDown = new Blob([
        this.s2ab(
          XLSX_STYLE.write(workBook, {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary',
            cellStyles: true,
          })
        ),
      ])
 
      // 十、导出 Excel 文件
      const date = new Date()
      const formattedDate =
        `` +
        `${date.getFullYear()}` + // 年
        `${(date.getMonth() + 1).toString().padStart(2, '0')}` + // 月
        `${date.getDate().toString().padStart(2, '0')}` + // 日
        `${date.getHours().toString().padStart(2, '0')}` + // 时
        `${date.getMinutes().toString().padStart(2, '0')}` + // 分
        `${date.getSeconds().toString().padStart(2, '0')}` + // 秒
        ``.trim()
      this.downloadExcelFile(tmpDown, '年度最新爆款商品列表 - ' + formattedDate + '.xlsx')
    },
 
    /**
     * 准备数据
     */
    getExportDataList() {
      const thList = [
        '商品ID',
        '商品名称',
        '商品描述',
        '规格',
        '库存',
        '责任人',
        '是否审核',
        '商品状态',
        '创建时间',
        '修改时间',
      ]
 
      const keyList = [
        'id',
        'name', 
        'desc',
        'spec', 
        'num', 
        'principal', 
        'isApproved', 
        'status', 
        'createTime',
        'updateTime',
      ]
 
      const targetList = [
        {
          id: 1,
          name: '乐事真脆薯条', 
          desc: '百事旗下产品，好吃又好玩！',
          spec: '单位/包', 
          num: 666, 
          principal: '全哥',
          isApproved: '审核已通过', 
          status: 0, 
          createTime: '2023-06-08 22:13:46',
          updateTime: '2023-06-08 22:15:18',
        },
        {
          id: 2,
          name: '干脆面', 
          desc: '味道好极了 ~',
          spec: '单位/箱', 
          num: 123, 
          principal: '全哥',
          isApproved: '审核已通过', 
          status: 1, 
          createTime: '2023-06-08 22:13:46',
          updateTime: '2023-06-08 22:15:18',
        },
        {
          id: 3,
          name: '双汇火腿肠', 
          desc: 'Good！！！',
          spec: '单位/包', 
          num: 666, 
          principal: '全哥',
          isApproved: '审核已通过', 
          status: 2, 
          createTime: '2023-06-08 22:13:46',
          updateTime: '2023-06-08 22:15:18',
        },
        {
          id: 4,
          name: '曲奇饼', 
          desc: '美味。',
          spec: '单位/盒', 
          num: 666, 
          principal: '全哥',
          isApproved: '待审核', 
          status: 1, 
          createTime: '2023-06-08 22:13:46',
          updateTime: '2023-06-08 22:15:18',
        },
        {
          id: 5,
          name: '香飘飘奶茶', 
          desc: 'Yeah',
          spec: '单位/包', 
          num: 666, 
          principal: '全哥',
          isApproved: '审核未通过', 
          status: 2, 
          createTime: '2023-06-08 22:13:46',
          updateTime: new Date(),
        }
      ]
 
      const tdList = this.formatJson(keyList, targetList) // 过滤字段以及转换数据格式，即：表格数据
      tdList.unshift(thList) // 将 thList 数组添加到 tdList 数组开头，即：表格头部
      tdList.unshift(['']) // 将空字符串数组添加到 tdList 数组开头，即：表格首行
      const list = tdList
      return list
    },
 
    /**
     * 过滤字段以及转换数据格式
     */
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(item => {
        if (item === 'name') {
          if (v['name'] != null && v['name'] != '') {
            return v[item].split(';').join('\n')
          } else {
            return '-'
          }
        }
        else if (item === 'status') {
          if (v['status'] != null && v['status'] == 0) {
            return '正常'
          } else if (v['status'] != null && v['status'] == 1) {
            return '待上架'
          } else if (v['status'] != null && v['status'] == 2) {
            return '已下架'
          } else {
            return '-'
          }
        }
        else {
          return v[item]
        }
      }))
    },
 
    /**
     * 使用二维数组生成一个工作表
     */
    sheet_from_array_of_arrays(data, opts) {
      var ws = {};
      var range = {
        s: {
          c: 10000000,
          r: 10000000
        },
        e: {
          c: 0,
          r: 0
        }
      }
 
      for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
          if (range.s.r > R) range.s.r = R;
          if (range.s.c > C) range.s.c = C;
          if (range.e.r < R) range.e.r = R;
          if (range.e.c < C) range.e.c = C;
          var cell = {
            v: data[R][C]
          };
          if (cell.v == null) continue;
          var cell_ref = XLSX.utils.encode_cell({
            c: C,
            r: R
          })
 
          if (typeof cell.v === 'number') cell.t = 'n';
          else if (typeof cell.v === 'boolean') cell.t = 'b';
          else if (cell.v instanceof Date) {
            cell.t = 'n';
            cell.z = XLSX.SSF._table[14];
            cell.v = this.date_num(cell.v);
            // cell.z = 'YYYY-MM-DD'
            cell.z = 'YYYY-MM-DD HH:mm:ss'
          } else cell.t = 's'
 
          ws[cell_ref] = cell
        }
      }
 
      if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range)
      return ws
    },
 
    /**
     * 日期转换
     */
    date_num(v, date1904) {
      if (date1904) {
        v += 1462;
      }
      var epoch = Date.parse(v);
      return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    },
 
    /**
     * 文件流转换
     */
    s2ab(s) {
      if (typeof ArrayBuffer !== 'undefined') {
        const buf = new ArrayBuffer(s.length)
        const view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) {
          view[i] = s.charCodeAt(i) & 0xff
        }
        return buf
      } else {
        const buf = new Array(s.length)
        for (let i = 0; i != s.length; ++i) {
          buf[i] = s.charCodeAt(i) & 0xff
        }
        return buf
      }
    },
 
    /**
     * 使用 a 标签下载文件
     */
    downloadExcelFile(obj, fileName) {
      const a_node = document.createElement('a')
      a_node.download = fileName
      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(obj, fileName)
      } else {
        a_node.href = URL.createObjectURL(obj)
      }
      a_node.click()
      setTimeout(() => {
        URL.revokeObjectURL(obj)
      }, 2000)
    },
  }
}
</script>