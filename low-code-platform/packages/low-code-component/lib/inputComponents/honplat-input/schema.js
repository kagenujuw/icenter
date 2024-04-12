const defaultConfig = () => {
  return {
    id: '',
    text: '单行文本',
    componentType: 'input',
    tag: 'input',
    componentAlias: 'honplatInput',
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
      text: '',
      label: '单行文本',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    children: []
  }
}

export default defaultConfig