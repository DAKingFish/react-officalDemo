/** 数据基本的一些 api */

export default () => {
  /**
   * 1、push、unshift => 一起过是在数据后面追加，一个是在数组前面追加，改变原数组，=> 返回最新数组的长度
   * 2、pop、shift => 一个弹出最后的元素，一个是弹出第一个元素 改变原数组 => 并且返回值是弹出的元素
   * 3、slice 数组的切割 slice(start, end) 不会改变原数组，返回新的分割数组
   * 4、splice 数组的分割，splice(start, length, insertArr) 改变原数组，通常用来删除数组的某一个或多个元素，返回 => 删除的元素，原数组会改变
   * 5、join 数组转字符串 [1,2,3,4].join('?') => "1?2?3?4".split('?') => ['1','2','3','4']
   * 6、concat 数组的合并 [1,2,3].concat([2,3,4]) => [1,2,3,2,3,4] => 不会改变原数组
   * 7、includes 判断数组是否包含指定的元素，只适用于基本类型的数组
  */
  const arr = []
  return <div>
    数组的基本api
  </div>
}