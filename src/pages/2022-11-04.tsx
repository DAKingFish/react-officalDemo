/**
 * js 基础知识巩固
 */

import { Space } from "antd";
import Item from "antd/lib/list/Item";
/** 
 * es6 
 *   对象的遍历
 *   使用 Object.keys();
 *  数组的高阶函数使用 （接受函数作为参数，或者返回一个函数）
 * 
 *  forEach
 *  map
 *  find
 *  findIndex
 *  some
 *  every
 *  filter
 *  reduce
 */
const For = () => {
  const object = { math: 2, age: 4, address: 6, ignore: 'jksdjks', klkl: 'klkl', weew: 'jksdjks', dffd: 'klkl', math1: 8, age1: 10, address1: 12 };
  const keys = Object.keys(object);
  let count = 0;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    // if(typeof object[key]  === 'number' ){
    //   continue; // 退出本次循环，执行下一次循环
    // }
    // count += object[key]
    if (typeof object[key] === 'number') {
      count += object[key]
    }
  }
  return <Space>
    {keys}
    总计 = {count}
  </Space>
}

// 没有返回值 => 返回就是 undefined
const ForEach = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 'ds343sd'];
  let count = 0;
  arr.forEach((item, index) => {
    count += typeof item === 'number' ? item : 0;
  })
  return <Space>
    总计 = {count}
  </Space>
}

// map、可以返回一个新的数组
const Map = () => {
  const arr: any = [
    { name: 'jinyuan', age: 30 },
    { name: 'kk', age: 20 },
    { name: 'skjkjds', age: 30 },
    { name: '598sjk', age: 20 }
  ];
  return <div>
    {
      arr.map((item) => {
        return <button key={item.name}>
          姓名 {item.name}
        </button>
      })
    }
  </div>
}

// find 查找某一个元素, 返回 boolean, 当返回是 true，直接结束循环，就有阻断的特性 没找到返回就是 undefined
const Find = () => {
  const arr = [{ name: 'qw', age: 5 }, { name: 'asds', age: 6 }, { name: 100, age: 10 }];
  const result: any = arr.find((item) => {
    return item.name === 100;
  })
  return <span>{result.age}</span>
}

// findIndex 查找某一个元素下标, 返回 boolean, 当返回是 true，直接结束循环，就有阻断的特性，没找到就返回 -1
const FindIndex = () => {
  const arr = [{ name: 'qw', age: 5 }, { name: 'asds', age: 6 }, { name: 100, age: 10 }];
  const index: any = arr.findIndex((item) => {
    return item.name === 'qw';
  })
  return <span>{arr[index].age}</span>
}

// some 便利数组的每一项，当有一项返回是true，直接结束循环，最终的返回结果就是 true
const Some = () => {
  const arr = [{ name: 'qw', age: 5 }, { name: 'asds', age: 6 }, { name: 100, age: 10 }];
  const xx = arr.some((item) => { return item.age > 8 });
  return xx ? <span>有age大于8</span> : <span>没有age大于8</span>
}

// every 便利数组的每一项，当所有返回的都是 true,最终结果才true,如果有一个返回是 false,直接结束循环，结果为false
const Every = () => {
  const arr = [{ name: 'qw', age: 51 }, { name: 'asds', age: 6 }, { name: 100, age: 10 }];
  const xx = arr.every((item) => { return item.age < 18 });
  return xx ? <span>都是未成年</span> : <span>有成年的</span>
}

// filter 数组过滤只接受返回值是true的那一项，false 直接过滤
const Filter = () => {
  const arr: any = [
    { name: 'jinyuan', age: 18 },
    { name: 'kk', age: 16 },
    { name: 'skjkjds', age: 13 },
    { name: '598sjk', age: 20 }
  ].filter((item) => item.age >= 18)
  // 和map一样的样式，但是只展示成人的数组
  return <div>
    {
      arr.map((item) => {
        return <button key={item.name}>
          姓名 {item.name}
        </button>
      })
    }
  </div>
}

// 通常用来求和或者是累积的作用
const Reduce = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 10];
  return <span>
    {
      arr.reduce((currentItem, nextItem, currentIndex, nextIndex) => {
        return currentItem + nextItem
      }, 10)
    }
  </span>
}


export default () => {
  return <Reduce />
}