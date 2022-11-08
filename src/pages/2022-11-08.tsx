/** 
 * location 
 *  const params = new URLSearchParams(location.search); // 获取指定的参数
 * history
 *  
*/

import { useState, useMemo, useRef } from "react"

/**
 * 如果 state 掉用了 setState, 出发了页面重新渲染，那么代码就会从上往下重新执行。如果用了 useState 、useRef 、useMemo, 定义的的变量就已然保持上一次的值不受影响
 */
export default () => {
  const [dataSource, setDataSource]: any = useState([])
  const user = {
    name: 'hello'
  }
  // const user = useRef({
  //   name: 'hello'
  // })
  // const user = useMemo(() => {
  //   return { name: 'hello' }
  // }, []);
  // const [user]: any = useState({
  //   name: 'hello'
  // }); 
  return <div>
    {user.name} - {dataSource}
    <button onClick={() => {
      user.name = 'you'
      setDataSource([1, 2, 3])
    }}>
      点击
    </button>
  </div>
}