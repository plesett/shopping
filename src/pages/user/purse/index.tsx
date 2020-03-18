import React from 'react';
import style from './style.scss';
import { Row, Col } from 'antd';

interface IPurseProps {
}

export default class Purse extends React.Component<IPurseProps> {
  render() {
    return (
      <div>
        <Row className={style.purse_warp}>
          <Col span={24}>钱包(元)</Col>
          <Col span={24} style={{ fontSize: 45 }}>0.00</Col>
        </Row>
      </div>
    );
  }
}
