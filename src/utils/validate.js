import { extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zhCN from 'vee-validate/dist/locale/zh_CN.json'
// 注册语言
localize({ zhCN })
// 使用语言
localize('zhCN')
// 自定义规则
extend('phone', {
  validate: value => {
    const reg = /^1[35789]\d{9}$/
    return reg.test(value)
  },
  message: '{_field_}格式不正确'
})
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
// Object.keys(rules)获得对象中全部的属性名称
// 并以数组返回['alpha','xx','xx',...]
// extend(rule, rules[rule])完成每个内置校验规则的注册操作
