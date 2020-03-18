import React from 'react';
import { Input, Col, Row, Button, message } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import router from 'umi/router';
import { send_Code, USer_Forget } from '@/service/api';

interface IRecoverPasswordProps {
}

export default class RecoverPassword extends React.Component<IRecoverPasswordProps> {

  state = {
    isDownCount: false,
    mobileValue: '',
    newPassValue: '',
    codeValue: ''
  }

  onFinish = () => {
    this.setState({ isDownCount: false })
  }


  sendCode = () => {
    const { mobileValue } = this.state;
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (myreg.test(mobileValue)) {
      // 发送短信验证码
      send_Code(Number(mobileValue), 'forget')
        .then((v) => {
          if (v.data.code === 203) {
            message.info('该手机已经注册', 2)
            return
          }
          if (v.data.code === 3) {
            message.success('发送成功，注意查收', 2)
            this.setState({ isDownCount: true })
          } else {
            message.error('未知错误', 2)
            router.push('/')
          }
        })
      return
    }
    message.error('手机号码不合法', 2)
    this.setState({ isDownCount: false, mobileValue: '' })
  }


  handleSubFormForget = () => {
    // 获取参数
    const { mobileValue, newPassValue, codeValue } = this.state;
    // 校验参数
    if (mobileValue.length === 11 && newPassValue && codeValue) {
      //  发送请求
      USer_Forget(
        mobileValue,
        newPassValue,
        codeValue
      ).then((v) => {
        switch (v.data.code) {
          case 200:
            message.success(v.data.msg, 2)
            router.push('/login/')
            break;
          case 4:
            message.success(v.data.msg, 2)
            this.setState({ codeValue: '' })
            break;

          default:
            message.error('未知错误', 2)
            break;
        }
      })
      return
    }
    message.error('请正确填写信息格式', 2)
  }

  render() {
    const { isDownCount, mobileValue, newPassValue, codeValue } = this.state;
    return (
      <div>
        <Row
          style={{
            margin: '4vmin',
            paddingBottom: '2vmin',
            borderBottom: '1px solid #eee'
          }}
        >
          <Col span={4}>
            <div
              style={{
                textAlign: 'center',
                lineHeight: '31px',
                fontSize: 17
              }}
            >手机号</div>
          </Col>
          <Col span={20}>
            <Input
              style={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
              value={mobileValue}
              onChange={(e) => this.setState({ mobileValue: e.target.value })}
              maxLength={11}
              placeholder="请输入手机号"
            />
          </Col>
        </Row>
        <Row
          style={{
            margin: '4vmin',
            paddingBottom: '2vmin',
            borderBottom: '1px solid #eee'
          }}
        >
          <Col span={4}>
            <div
              style={{
                textAlign: 'center',
                lineHeight: '31px',
                fontSize: 17
              }}
            >新密码</div>
          </Col>
          <Col span={20}>
            <Input
              style={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
              type="password"
              value={newPassValue}
              onChange={(e) => this.setState({ newPassValue: e.target.value })}
              maxLength={11}
              placeholder="请输入新密码"
            />
          </Col>
        </Row>
        <Row type='flex' justify='space-around'
          style={{
            margin: '4vmin',
            paddingBottom: '2vmin',
            borderBottom: '1px solid #eee'
          }}
        >
          <Col span={4}>
            <div
              style={{
                textAlign: 'center',
                lineHeight: '31px',
                fontSize: 17
              }}
            >验证码</div>
          </Col>
          <Col span={12}>
            <Input
              style={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
              value={codeValue}
              onChange={(e) => this.setState({ codeValue: e.target.value })}
              placeholder="请输入验证码"
              maxLength={4}
            />
          </Col>
          <Col span={7} onClick={this.sendCode}>
            <div
              style={{
                textAlign: 'center',
                border: 'none',
                lineHeight: '32px'
              }}
              onClick={() => this.setState({ isDownCount: true })}
            >{isDownCount ?
              <Countdown
                value={Date.now() + 1000 * 5}
                onFinish={this.onFinish}
                format="s 秒"
                valueStyle={{
                  fontSize: 14,
                  textAlign: 'center',
                  lineHeight: '32px'
                }}
              /> : '获取验证码'}</div>
          </Col>
        </Row>
        <Row
          style={{
            padding: '0 2vmin',
            marginTop: '8vmin',
          }}
        >
          <Button
            type="primary"
            block
            onClick={this.handleSubFormForget}
            style={{
              height: '10vmin',
              borderRadius: '20vmin',
              border: 'none',
              backgroundColor: 'rgb(245, 189, 128)'
            }}
          >
            下一步
        </Button>
        </Row>
      </div>
    );
  }
}
