import React, { CSSProperties } from 'react';
import style from './style.scss';
import { Col, Row, Card, Radio, Button, Drawer, message } from 'antd';
import { money } from './mock';
import { Get_Pay_Url, Record_Product } from '@/service/api';
import { connect } from 'dva';
import router from 'umi/router';
import ServiceInfo from '@/comm/service';

interface IPayProps {
  dispatch: any
  user: {
    user_info: {
      uid: number;
    }
  }
}

class Pay extends React.Component<IPayProps> {

  state = {
    SelectMoney: 0,
    checked: [
      { id: 0, state: false },
      { id: 1, state: false },
      { id: 2, state: false }
    ],
    visible: false,
    placement: 'left'
  }

  componentDidMount() {
    // 判断必须存在用户信息
    const { user } = this.props;
    const { uid } = user.user_info;
    if (uid !== undefined) {
      Record_Product(uid)
        .then((v) => {
          switch (v.data.code) {
            case 200:
              this.setState({
                all: v.data.sn
              })
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

  CloseAlert = () => {
    this.setState({
      visible: !this.state.visible
    }, () => {
      this.setState({
        visible: !this.state.visible
      })
    })
  }

  handleMoneyNumber = (value: number) => {
    this.setState({ SelectMoney: value })
  }

  handleSelect = (id: number) => {
    let arr = this.state.checked;
    arr[id].state = !arr[id].state
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (i == id) {
        continue;
      }
      element.state = false
    }
    this.setState({
      checked: arr
    })
  }

  handleSubPay = () => {
    const { user } = this.props;
    const { uid } = user.user_info;
    const { checked, SelectMoney } = this.state;
    let type = null;
    // 遍历获取支付方式
    for (let i = 0; i < checked.length; i++) {
      const element = checked[i];
      if (element.state) {
        type = element.id
        break;
      }
    }
    if (type === null) {
      message.info('请选择支付方式');
    } else {
      if (SelectMoney === 0) {
        message.info('请选择充值金额');
      } else {
        Get_Pay_Url(uid, SelectMoney, type)
          .then(res => {
            window.location.href = res.data
          })
          .catch(err => {
            message.error('错误')
            router.push('/user/')
          })
      }
    }
  }

  render() {
    const { SelectMoney, checked, visible } = this.state;
    const PayStyle: CSSProperties = {
      width: '30vmin',
      textAlign: 'left'
    }
    return (
      <div>
        <Card title={`选择充值金额: ${SelectMoney}`}>
          {
            money.map((v) => {
              return (
                <Card.Grid
                  className={style.wrapper}
                  key={v.id}
                ><div onClick={() => this.handleMoneyNumber(v.value)}>{v.value} 元</div></Card.Grid>
              )
            })
          }
        </Card>
        <div className={style.PayBox}>
          <Row>
            <Col style={{
              paddingBottom: '3vmin',
              borderBottom: '1px solid #eee'
            }}>支付方式:</Col>

            {/* <Col className={style.ItemPayType}
              onClick={() => this.handleSelect(0)}
            >
              <Row type='flex' justify='space-between'>
                <div className={style.PayWeixin}>
                  <div>
                    <img src={require('@/assets/weixin.svg')} alt=""
                      style={{ width: 27 }}
                    />
                  </div>
                  <div style={PayStyle}>微信支付</div>
                </div>
                <Radio
                  checked={checked[0].state}
                />
              </Row>
            </Col> */}


            <Col className={style.ItemPayType}
              onClick={() => this.handleSelect(1)}
            >
              <Row type='flex' justify='space-between'>
                <div className={style.PayWeixin}>
                  <div>
                    <img src={require('@/assets/zhifubao.svg')} alt=""
                      style={{ width: 27 }}
                    />
                  </div>
                  <div style={PayStyle}>支付宝支付</div>
                </div>
                <Radio
                  checked={checked[1].state}
                />
              </Row>
            </Col>
            <Col
              className={style.ItemPayType}
              onClick={() => this.handleSelect(2)}
            >
              <Row type='flex' justify='space-between'>
                <div className={style.PayWeixin}>
                  <div>
                    <img src={require('@/assets/erweima.svg')} alt=""
                      style={{ width: 27 }}
                    />
                  </div>
                  <div style={PayStyle}>扫码支付</div>
                </div>
                <Radio
                  checked={checked[2].state}
                />
              </Row>
            </Col>
          </Row>
          <Row style={{
            padding: '4vmin 0'
          }}>
            <Button
              type="primary"
              className={style.SubFormBtton}
              onClick={this.handleSubPay}
            >
              充值
            </Button>
            <Button type="primary" onClick={this.CloseAlert} className={style.SubFormBtton}>
              联系客服
            </Button>
            <ServiceInfo visible={visible} />
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(({ user }: any) => ({
  user
}))(Pay);