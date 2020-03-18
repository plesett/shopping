import { Button, Col, Row, Modal, Alert, Radio, message } from 'antd';
import { connect } from 'dva';
import React from 'react';
import ShoppingItem from './item';
import style from './style.scss';
import Link from 'umi/link';
import Axios from 'axios';
import { host } from '@/config/api';
import { Push_Sn } from '@/service/api';
import router from 'umi/router';

interface IShoppingProps {
  dispatch?: any;
  shopping: {
    shopping: Array<any>
  }
  user: {
    user_info: {
      balance: number
      uid: number
    }
  }
}

class Shopping extends React.Component<IShoppingProps> {

  state = {
    visible: false,
    confirmLoading: false,
    checked: false
  }

  showModal = () => {
    const { user } = this.props;
    const { user_info } = user;
    this.setState({
      visible: true,
    });
    if (user_info.balance === undefined) {
      const { dispatch } = this.props;
      // 检测本地是否存在token
      const token = localStorage.getItem("token");
      if (token !== null) {
        // 请求该用户数据
        dispatch({
          type: 'user/fetch_user_info',
          token: token
        })
        return
      }
    }
  };

  handleOk = () => {
    const { user, shopping } = this.props;
    const { user_info } = user;
    let money = 0;
    shopping.shopping.forEach(element => {
      money += element.countValue
    });
    if (!this.state.checked) {
      message.info('请选择支付方式', 2)
      return
    }
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      // 判断余额是否充足
      if (user_info.balance >= money) {
        // 数据整合
        let params: {
          product_id: null;
          countValue: null;
        }[] = [];
        let d = {
          product_id: null,
          countValue: null
        }
        for (let i = 0; i < shopping.shopping.length; i++) {
          const element = shopping.shopping[i];
          let d = {
            product_id: null,
            countValue: null
          }
          d.product_id = element.product_id
          d.countValue = element.countValue
          params.push(d)
        }
        // 请求数据
        Push_Sn(user_info.uid, money, JSON.stringify(params))
          .then((v) => {
            switch (v.data.code) {
              case 200:
                message.success('支付成功', 2)
                // 清除购物车
                this.handleonClickRm(null, 'all')
                break;

              default:
                message.error('支付失败', 2)
                router.push('/shopping/')
                break;
            }
          })

        this.setState({
          visible: false,
          confirmLoading: false,
        });
      } else {
        message.info('余额不足', 2)
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };


  handleonClickRm = (product_id: number | null, all?: 'all') => {
    // 删除id为product_id的所有对象
    const { dispatch } = this.props;
    dispatch({
      type: 'shopping/rm_product',
      product_id: all ? all : product_id
    })
  }

  handleClickSubClose = () => {
    // 判断是否登录
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.showModal()
    } else {
      message.info('请登录', 2)
    }
  }

  render() {
    const { shopping } = this.props.shopping;
    const { user } = this.props;
    const { user_info } = user
    const count = shopping.length;
    const { visible, confirmLoading, checked } = this.state;
    let money = 0;
    shopping.forEach(element => {
      money += element.countValue
    });
    return (
      <div>
        {
          count === 0 &&
          <Row type='flex' justify='center' className={style.prompt}>
            <Col className={style.blankDiv}></Col>
            <Col span={24}>主人，您的购物车还是空的哦！</Col>
            <Col span={24} className={style.promptButton}>
              <Link to='/classify/'>去逛逛</Link>
            </Col>
          </Row>
        }
        {
          shopping.map((value) => {
            return (
              <ShoppingItem
                value={value}
                handleonClickRm={this.handleonClickRm}
              />
            )
          })
        }
        {
          count !== 0 &&
          <>
            <div style={{ height: '14vmin' }}></div>
            <div className={style.closeBar}>
              <Row type='flex' justify='space-between'>
                <Col span={12} className={style.closeBarTotal}>
                  合计: <span style={{ color: '#f70' }}>¥ {money}</span>
                </Col>
                <Col span={12} className={style.closeBarmoney}>
                  <Button onClick={this.handleClickSubClose}>结算({count})</Button>
                </Col>
              </Row>
            </div>
          </>
        }
        <div>
          <Modal
            title={`支付合计: ¥ ${money}.00`}
            okText="确认"
            cancelText="取消"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <Row type='flex' justify='space-between' className={style.payInfo}>
              <Col span={24} onClick={() => this.setState({ checked: !checked })}>
                <img
                  src={require('@/assets/jinbi.svg')}
                  alt=""
                  style={{
                    width: 27,
                    verticalAlign: 'middle',
                    marginRight: 6,
                    padding: '1vmin 0'
                  }}
                />
                余额: {user_info.balance}.00
              <Radio
                  checked={checked}
                  style={{
                    float: 'right',
                    lineHeight: '2.5'
                  }}
                />
              </Col>
              <Col span={24}>
                <img
                  src={require('@/assets/chongzhi.svg')}
                  alt=""
                  style={{
                    width: 27,
                    verticalAlign: 'middle',
                    marginRight: 6,
                    padding: '1vmin 0'
                  }}
                />
                充值: (充值至余额)
                <Link to="/user/pay/" className={style.payBottin}>去充值</Link>
              </Col>
            </Row>
          </Modal>
        </div>
      </div>
    );
  }
}

export default connect(({ shopping, user }: any) => ({
  shopping,
  user
}))(Shopping);