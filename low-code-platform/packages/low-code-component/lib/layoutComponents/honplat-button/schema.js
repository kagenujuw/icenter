const defaultConfig = () => {
  return {
    id: '',
    text: '按钮',
    componentType: 'button',
    tag: 'button',
    componentAlias: 'honplatButton',
    attrs: {
      placeholder: '请输入',
      style: { width: '100%' },
      
      clearable: true,
      maxlength: null,
      readonly: false,
      disabled: false,
      'show-word-limit': false,
      'suffix-icon': '',
      'prefix-icon': '',
    },
    props: {
      text: '测试按钮',
      label: '默认按钮',
      labelWidth: null,
      showLabel: true,
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    children: []
  }
}

export default defaultConfig