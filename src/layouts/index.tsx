/* eslint-disable no-console */
import zhCn from 'antd/lib/locale/zh_CN';
import { ConfigProvider, Space, Dropdown, Menu } from 'antd';
import { useState, useEffect } from 'react';
import { PageContainer, ProLayout } from '@ant-design/pro-layout';
import request from '../request';
import { createBrowserHistory, useHistory } from 'ice';
import './index.less';

const { listen } = createBrowserHistory(); // 创建实例，用于监听浏览器会退前进

export default (props) => {
  const history = useHistory();
  const [menus, setMenus] = useState([]);
  const userInfo = async () => {
    const {
      data: { code, data },
    } = await request.post('/proxy/user/userinfo');
    if (code === 40005) {
      window.location.href = `http://121.4.49.147:8360/unification/login?redirect=${location.href}&appId=7`;
    } else {
      setMenus(data.menus)
    }
  };
  const logOut = async () => {
    const { data: { code } } = await request('/proxy/unification/logout');
    if(code === 200){
      window.location.href = `http://121.4.49.147:8360/unification/login?redirect=${location.href}&appId=7`;
    }
  };
  const [path, setPath] = useState('/')
  const setPathName = () => {
    const path = location.hash.substr(1);
    const index = location.hash.substr(1).indexOf('?'); // 去除参数
    setPath(index === -1 ? path : path.substring(0, index));
  };
  useEffect(() => {
    setPathName(); // 同步左侧菜单
    // 监听路径改变，菜单联动
    const removeListener = listen(setPathName);
    return () => {
      // 注销remove
      removeListener();
    };
  }, []);
  useEffect(() => {
    userInfo();
  }, []);
  return (
    <ConfigProvider locale={zhCn}>
      <div
        style={{
          height: '100vh',
        }}
      >
        <ProLayout
          siderWidth={260}
          title="React-Office-Demo"
          iconfontUrl={'//at.alicdn.com/t/c/font_3520199_tnbardcesp.js'}
          location={{
            pathname: path,
          }}
          menuDataRender={() => menus}
          menuItemRender={(item: any, dom) => (
            <div
              onClick={() => {
                history.push(item.path);
                // 这个地方不能依赖于监听，因为监听是原生事件，原生事件中调用hooks会不同步
                setPathName();
              }}
            >
              {dom}
            </div>
          )}
          rightContentRender={() => (
            <div className="app-right-header">
              <Space>
                <Dropdown
                  placement="bottom"
                  overlay={
                    <Menu>
                      <Menu.Item
                        onClick={logOut}
                      >
                        退出登录
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <a
                    style={{
                      marginRight: 12,
                      whiteSpace: 'nowrap',
                      fontWeight: 'bold',
                    }}
                  >
                    测试用户
                  </a>
                </Dropdown>
              </Space>
            </div>
          )}
        >
          <PageContainer>
            {props.children}
          </PageContainer>
        </ProLayout>
      </div>
    </ConfigProvider>
  );
};
