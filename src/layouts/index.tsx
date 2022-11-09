import zhCn from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { useHistory } from 'ice';
import { useState, useEffect } from 'react';
import './index.less';
import request from '../request';
// /proxy/user/userinfo
// `http://121.4.49.147:8360/unification/login?redirect=${location.href}&appId=7`;

export default (props) => {
  // 路由实例
  const history = useHistory();
  const [selectKey, setSelectKey] = useState('');
  // TODO 在这里发请求获取用户信息，先判断用户是否已经登录了
  // 创建方法 userInfo()
  const userInfo = async () => {
    return await request('/proxy/ersu/userinfo');
  };
  // useEffect()
  useEffect(() => {
    const res = userInfo();
    console.log('看看', res);
  }, []);
  console.log('本页面', window.location);
  return (
    <ConfigProvider locale={zhCn}>
      <div className="app">
        <div className="app-header">App-Office-Demo</div>
        <div className="app-main">
          <div className="app-main-sider">
            <div
              className={selectKey === 'home' ? 'app-main-sider-item-selected' : 'app-main-sider-item'}
              onClick={() => {
                history.push('/home');
                setSelectKey('home');
              }}
            >
              Home
            </div>
            <div
              className={selectKey === 'user' ? 'app-main-sider-item-selected' : 'app-main-sider-item'}
              onClick={() => {
                history.push('/user');
                setSelectKey('user');
              }}
            >
              User
            </div>
          </div>
          <div className="app-main-content">{props.children}</div>
        </div>
      </div>
    </ConfigProvider>
  );
};
