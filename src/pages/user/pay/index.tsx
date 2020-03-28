import React, { CSSProperties } from 'react';
import style from './style.scss';
import { Col, Row, Card, Radio, Button, Drawer } from 'antd';
import { money } from './mock';
import { CodePreview } from '@/utils/CodePreview';

interface IPayProps {
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

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = (e: any) => {
    this.setState({
      placement: e.target.value,
    });
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
    console.log(id);
  }

  render() {
    const { SelectMoney, checked } = this.state;
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

            <Col className={style.ItemPayType}
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
            </Col>


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

            <Col className={style.ItemPayType}
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

          <div style={{
            padding: '4vmin 0'
          }}>
            <Button type="primary" className={style.SubFormBtton}>
              充值
            </Button>
            <Button type="primary" onClick={this.showDrawer} className={style.SubFormBtton}>
              联系客服
            </Button>
            <Drawer
              title="客服联系方式"
              placement='left'
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <p>微信: <CodePreview>ASDASD</CodePreview></p>
              <img src={require('@/assets/qq.jpg')} alt="" style={{ width: '100%' }} />
              <p>QQ: <CodePreview>2413052113</CodePreview></p>
              <img src={require('@/assets/qq.jpg')} alt="" style={{ width: '100%' }} />
              <p>物流客服: <CodePreview>2413052113</CodePreview> </p>
              <img src={require('@/assets/qq.jpg')} alt="" style={{ width: '100%' }} />
            </Drawer>
          </div>

        </div>
      </div>
    );
  }
}

export default Pay;