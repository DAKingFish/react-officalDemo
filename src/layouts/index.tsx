import './index.less';
import { useHistory } from 'ice';
import { useState } from 'react';

export default (props) => {
  // 路由实例
  const history = useHistory();
  const [selectKey, setSelectKey] = useState('');
  return <div className='app'>
    <div className="app-header">
      App-Office-Demo
    </div>
    <div className="app-main">
      <div className='app-main-sider'>
        <div className={selectKey === 'home' ? 'app-main-sider-item-selected' : 'app-main-sider-item'} onClick={() => {
          history.push('/home');
          setSelectKey('home')
        }}>Home</div>
        <div className={selectKey === 'user' ? 'app-main-sider-item-selected' : 'app-main-sider-item'} onClick={() => {
          history.push('/user');
          setSelectKey('user')
        }}>User</div>
      </div>
      <div className='app-main-content'>
        {
          props.children
        }
      </div>
    </div>
  </div>
}