import React from 'react';
import style from './style.scss';
import { Row, Col, Card } from 'antd';
import { Acquisition_Product } from '@/service/api';
import { connect } from 'dva';
import router from 'umi/router';

interface IGetShopProps {
  dispatch: any
  user: {
    user_info: {
      uid: number;
    }
  }
}

class GetShop extends React.Component<IGetShopProps> {

  state = {
    pageData: []
  }

  componentDidMount() {
    const { user } = this.props;
    const { uid } = user.user_info;
    if (uid !== undefined) {
      Acquisition_Product(uid)
        .then((v) => {
          switch (v.data.code) {
            case 200:
              this.setState({ pageData: v.data.data })
              break;

            default:
              router.push('/user/')
              break;
          }
        })
    } else {
      router.push('/user/')
    }
  }

  render() {
    const { pageData } = this.state;
    if (Boolean(pageData[0])) {
      return (
        <div>
          <Row>
            {
              pageData.map((v: { upfile: string; title: string; nickname: string; mobile: string; end_time: string }, index) => {
                return (
                  <Col style={{
                    borderBottom: '1px solid #eee'
                  }} key={index}>
                    <Row>
                      <Col span={6}>
                        <img className={style.item_img} src={v.upfile} alt="" />
                      </Col>
                      <Col span={18}>
                        <div className={style.item_record_info}>
                          <p>{v.title}</p>
                          <p>获奖者: <span>{v.nickname}({v.mobile})</span></p>
                          <p>开奖时间: <span>{v.end_time}</span></p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                )
              })
            }

          </Row>
        </div>
      );
    } else {
      return (
        <Card style={{
          fontSize: 20,
          lineHeight: 5,
          textAlign: 'center'
        }}>暂无记录</Card>
      )
    }
  }
}

export default connect(({ user }: any) => ({
  user
}))(GetShop);