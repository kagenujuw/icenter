const defaultConfig = () => {
  return {
    id: '',
    text: '下拉框',
    componentType: 'select',
    tag: 'el-select',
    componentAlias: 'honplatSelect',
    attrs: {
      placeholder: '请选择',
      style: { width: '100%' },
      clearable: true,
      disabled: false,
      filterable: false,
      multiple: false
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    props: {
      label: '下拉选择',
      showLabel: true,
      labelWidth: null,
      tag: 'el-select',
      tagIcon: 'select',
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
      changeTag: true,
    },
    children: []
  }
}

export default defaultConfig