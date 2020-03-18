import React from 'react';
import { Card, Col, Row } from 'antd';
import style from './style.scss';
import Link from 'umi/link';

interface IUserMenuProps {
}

export default class UserMenu extends React.Component<IUserMenuProps> {
  render() {
    return (
      <Row>
        <Col span={8}>
          <Link to="/user/record/">
            <Card
              style={{
                textAlign: 'center',
                paddingTop: 25,
              }}
              cover={<img className={style.MenuImg} src={require('@/assets/shopping.png')} alt="" />}
            >
              云购记录
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="/user/shops/">
            <Card
              style={{
                textAlign: 'center',
                paddingTop: 25,
              }}
              cover={<img className={style.MenuImg} src={require('@/assets/cloud.png')} alt="" />}
            >
              获得商品
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="scheduling">
            <Card
              style={{
                textAlign: 'center',
                paddingTop: 25,
              }}
              cover={<img className={style.MenuImg} src={require('@/assets/kuaidi.svg')} alt="" />}
            >
              发货管理
            </Card>
          </Link>
        </Col>
      </Row>
    );
  }
}
