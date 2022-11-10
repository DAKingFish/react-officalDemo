/* eslint-disable no-console */
import zhCn from 'antd/lib/locale/zh_CN';
import { ConfigProvider ,Button} from 'antd';
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
  const [data, setData] = useState([]);
  // TODO 在这里发请求获取用户信息，先判断用户是否已经登录了
  // 创建方法 userInfo()
  const userInfo = async () => {
    const {
      data: { code, data },
    } = await request.post('/proxy/user/userinfo');
    if (code === 40005) {
      window.location.href = `http://121.4.49.147:8360/unification/login?redirect=${location.href}&appId=7`;
    } else {
      setData(data.menus)
    }
  };
  const logOut = async () => {
    return await request('/proxy/unification/logout');
    
  };
  useEffect(() => {
    userInfo();
  }, []);
  console.log('本页面', window.location);
  return (
    <ConfigProvider locale={zhCn}>
      <div className="app">
        <div className="app-header">
          App-Office-Demo
          <Button
          danger
            onClick={() => {
              logOut(),
              window.location.reload();
            }}
          >
            退出
          </Button>
        </div>
        <div className="app-main">
          <div className="app-main-sider">
            {data.map((item: any) => {
              return (<div
                className={selectKey === item.path ? 'app-main-sider-item-selected' : 'app-main-sider-item'}
                onClick={() => {
                  history.push(item.path);
                  setSelectKey(item.path);
                }}
              >
                {item.name}
              </div>)
            })}
          </div>
          <div className="app-main-content">{props.children}</div>
        </div>
      </div>
    </ConfigProvider>
  );
};
