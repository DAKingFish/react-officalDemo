/**
 * js 基本类型常用的 api
 * stirng、number、boolean、undefined、null、symbol
 */

const IsNumber = () => {
  /**
   * 1、如何将字符串转为数字
   * 2、生成随机数字
   * 3、如何四舍五入、如何向下、向上取整
   * 5、判断一个数字是不是 NaN、如何得到NaN
   * 6、处理浮点数进度问题 0.1 + 0.2 == 0.3 ？？
   * 7、指定小数点位数
   */
  const a = '10.23';
  const b = '10.1';
  return <span>
    IsNumber
    {
      // parseInt(a) + parseInt(b)
      // Number(a) + Number(b)
      // Math.floor(Number(a) + Number(b))
      // Math.round(Number(a) + Number(b))
      // Math.ceil(Number(a) + Number(b))
      // Math.round(Math.random() * 10) // 生成一个 0-10 的随机数
      // Math.round(Math.random() * 5) + 5 // 生成一个 5-10 的随机数
      // window.parseInt("weew"), Number("sdsd") NaN
      // parseInt 和 Number 的区别 1: Number 默认会保留小数部分、2: parseInt只有遇到第一个不能转换的字符才停止，Number是整体看待 3: 
      // const res = [1,2,3].map(parseInt) => parseInt(1,0) parseInt(2,1) parseInt(3,2)
      // 0.1 + 0.2 !== 0.3 采用乘 1000000000，计算结果在除 1000000000
      // 采用 Number(0.023233).toFixed(2) => "0.02" => Number 转换下 得到0.02
    }
  </span>
}

const IsString = () => {
  /**
   * 1、如果将字符串转为数组
   * 2、数字如何转字符串
   * 3、如何截取字符串
   * 4、如果判断，字符串有没有包含指定的内容
   * 5、查找指定元素的下标位置，第一个和最后一个
   * 6、字符串的替换
   * 8、英文字符大小写转换
   * 10、移除字符串前后端空格
   * 11、判断字符串以什么开头，以什么结尾
   * 12、获取指定下标的元素
   */
  return <span>
    isString
    {
      // "1,2,3,4,5" => 按照逗号分隔 split(',') =>  ['1', '2', '3', '4', '5']
      // String(8989) => "8989";
      // "abcdefg" => ? "cde";  substr(2,3) => (下标, 要多少个)  substring(4,5) => (下标, 第几个)
      // "abcdfhj" => "bcd"; includes("bcd") => 返回的是布尔值
      // "1223ajksdhiuweosadfhd" => "a" indexOf("a") 没有找到返回就是 -1, lastIndexOf
      // "a23a23a32" => replaceAll , replace
      // "a" <=> 'A' toLowerCase, toUpperCase
      // trim();// 移除前后端空格的
      // startsWith 判断开头  endsWith 判断结尾 返回是布尔值
      // at(index) [index]
    }
  </span>
}

const IsUndefined = () => {
  /**
   * 1、undefined ==  null // true
   * 2、0 == false // true
   * 3、1 == true // true
   */
  var name = 90;
  /**
   * var name = undefined;
   * name = 90;
   */

  return <span>IsUndefined</span>
}

export default () => {
  return <IsUndefined />
}