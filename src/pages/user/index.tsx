import React from 'react';
import { Card, Button, Col, Row } from 'antd';
import style from './style.scss';
import Link from 'umi/link';
import LoginMenuInfo from './loginMentInfo';
import PageAnimation from '@/comm/PageAnimation';
import UserMenu from './Menu';

export interface IUserModuleProps {
}

export default class UserModule extends React.Component<IUserModuleProps> {
  render() {
    const token = localStorage.getItem("token");
    return (
      <PageAnimation>
        {
          token !== null ? <LoginMenuInfo />
            :
            <Card className={style.UserWarp}>
              <Row
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: '5vmin',
                  marginBottom: '3vmin',
                }}
              >欢迎</Row>
              <Row>
                <Col span={12} className={style.UserWarp_Button}>
                  <Link to="/login/">
                    <Button>登录</Button>
                  </Link>
                </Col>
                <Col span={12} className={style.UserWarp_Button}>
                  <Link to="/register/">
                    <Button>注册</Button>
                  </Link>
                </Col>
              </Row>
            </Card>
        }
        <UserMenu />
      </PageAnimation>
    );
  }
}
