import React from 'react';
import { Input, Row, Col, Button, message } from 'antd';
import Link from 'umi/link';
import { User_login } from '@/service/api';
import router from 'umi/router';

interface ILoginState {
  mobileValue: string;
  passValue: string;
}

export default class Login extends React.Component<null, ILoginState> {

  state = {
    mobileValue: '',
    passValue: ''
  }

  handleLoginSub = () => {
    // 获取登录的用户名密码
    const { mobileValue, passValue } = this.state;
    if (mobileValue || passValue !== '') {
      User_login(mobileValue, passValue)
        .then((v) => {
          const msg = v.data.msg;
          switch (v.data.code) {
            case 202:
              message.info(msg, 2);
              break;
            case -1:
              message.error(msg + '请检查账号密码', 2);
              break;
            case 0:
              message.success(msg, 2);
              // 清楚可能存在的 token
              localStorage.removeItem('token');
              // 保存token
              localStorage.setItem('token', v.data.token);
              // 跳转首页
              router.push('/')
              break;
            default:
              break;
          }
          return
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      message.error('请正确填写信息格式', 2);
    }
  }

  render() {
    const { mobileValue, passValue } = this.state;
    return (
      <>
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
              maxLength={11}
              placeholder="请输入手机号"
              onChange={(e) => this.setState({ mobileValue: e.target.value })}
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
            >密码</div>
          </Col>
          <Col span={20}>
            <Input
              style={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
              value={passValue}
              onChange={(e) => this.setState({ passValue: e.target.value })}
              type='password'
              placeholder="请输入密码"
            />
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
            style={{
              height: '10vmin',
              borderRadius: '20vmin',
              border: 'none',
              backgroundColor: '#f70'
            }}
            onClick={this.handleLoginSub}
          >
            下一步
        </Button>
        </Row>
        <Row
          type='flex'
          justify='space-between'
          style={{
            margin: '4vmin',
          }}
        >
          <Col>
            <Link
              to="/recoverPassword/"
              style={{
                color: '#f60'
              }}
            >忘记密码</Link>
          </Col>
          <Col>
            <Link
              to="/register/"
              style={{
                color: '#f60'
              }}
            >快速注册</Link>
          </Col>
        </Row>
      </>
    );
  }
}
