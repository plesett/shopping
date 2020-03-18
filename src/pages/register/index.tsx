import React from 'react';
import { Card, Input, Tooltip, Row, Col, Radio, Button, message } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import Countdown from 'antd/lib/statistic/Countdown';
import { send_Code, User_register } from '@/service/api';

interface IRegisterProps {
}

export default class Register extends React.Component<IRegisterProps> {

  state = {
    mobileValue: '',
    passValue: '',
    codeValue: '',
    isDownCount: false
  }

  onFinish = () => {
    this.setState({ isDownCount: false })
  }

  sendCode = () => {
    const { mobileValue } = this.state;
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (myreg.test(mobileValue)) {
      console.log(mobileValue);
      // 发送短信验证码
      send_Code(Number(mobileValue))
        .then((v) => {
          if (v.data.code === 203) {
            message.info('该手机已经注册', 2)
            return
          }
          if (v.data.code === 3) {
            message.success('发送成功，注意查收', 2)
            message.success(`测试阶段。您的验证码为: ${v.data.verify}`, 4)
            this.setState({ isDownCount: true })
          } else {
            message.error('未知错误', 2)
            router.push('/')
          }
        })
      return
    }
    message.error('手机号码不合法', 2)
    this.setState({ mobileValue: '' })
  }

  onClickCode = () => {
    const { mobileValue, passValue, codeValue } = this.state;
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (myreg.test(mobileValue) && passValue.length > 5 && codeValue.length === 4) {
      User_register(Number(mobileValue), passValue, Number(codeValue))
        .then((v) => {
          switch (v.data.code) {
            case 200:
              message.success(v.data.msg + '3秒后跳转登录页', 3)

              message.info('测试阶段注册送 5000元测试')

              setTimeout(() => {
                router.push('/login/')
              }, 3000);
              break;
            case 4:
              message.error(v.data.msg, 2)
              this.setState({ codeValue: '' })
              break;
            case -1:
              message.error(v.data.msg, 2)
              break;
            default:
              break;
          }
        })
      return
    }
    message.error('请正确填写信息', 2)
    this.setState({ mobileValue: '', passValue: '', codeValue: '' })
  }

  render() {
    const { isDownCount, mobileValue, passValue, codeValue } = this.state;
    return (
      <>
        <Card
          style={{
            border: 'none'
          }}
        >
          <Row>
            <Col span={3}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAnVJREFUWAntWL+LGkEU1iiGYHFnlfwFKY6kE9L5H9gcWIQjwUBOQbjCMpAuVgdicycqEeUCaSwDIV1SHFcdWGh3VboUF4yFhPXX3vfudmROZt4M6t1tsQPrvJ33zZtvvjcuuy8U8nkLm/hlMplYIpF457rum3A4/AL4LdMcg3+IWH3E+jIYDFqdTmfM4VmChULh2XQ6/YYASS7IGr7zaDSarlarf3QxHukcpNwdk6Olk7QGraXjEdU5kNZ9CuD5HaSkFIlEPnO71cWSxykrs9nsPdL8EeOPcSW9tY5lnLC1BAHIChD6D/V6vSLdr2x6Gyzl8/kQSH6iQOhfo1MS1KYYE17SZGrj8bh1Y23u13GcIxHN+/OJ21s9R5Dkv27tdvufsDfVL8XUPhm4FC+45HI5d3Fzzwan4D1TUS/ne4JWKW40GuwDXb1386jN0fG9ggFBc6J5RKAgr4/ZGyho1ohHBAry+pi9gYJmjXhEoCCvj9nrewWtXrdsXovMWqyG8L2CvidoleKHfKO2ImhzevAhvgPcLr5xT2u12i+bOTaYjaQ4m81uozpwRpWC+Xz+0yNrs74RwxF0xGwiIGxVj5oNfXgvPr5B9LkKJ48txRzKPtnmCPYEMBaL7Qlb1Tebzd8Yp1IGbeoH6n7fVTh5bCnmheyTbe4MfgVQVLfKeBZO4/H4SaVS+S8HEDb+SAew6WJbsVh8MhqN3gJUloC0lrJpv3e9yuo5Zi2KSMoI6w/2sPFXuo1rU0ylWdTx0li/vz4HbYQ+raEjR7Mi2qlwdLvdYSqVak8mk7+4fYorgYs7FnAbG51T2vQhlMujXnhpnBEA1lDgCvUrsnybu+jlAAAAAElFTkSuQmCC" alt=""
                style={{ width: 27 }}
              />
            </Col>
            <Col span={21}>
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
        </Card>
        <Card>
          <Row type='flex' justify='center'>
            <Col>
              <img src={require('@/assets/pass.svg')} alt=""
                style={{
                  width: 26
                }}
              />
            </Col>
            <Col span={22}>
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
                maxLength={8}
              />
            </Col>
          </Row>
        </Card>
        <Card>
          <Row type='flex' justify='space-around'>
            <Col>
              <img src={require('@/assets/code.svg')} alt=""
                style={{
                  width: 26
                }}
              />
            </Col>
            <Col span={15}>
              <Input
                style={{
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none'
                }}
                value={codeValue}
                onChange={(e) => this.setState({ codeValue: e.target.value })}
                placeholder="请输入验证码"
                maxLength={6}
              />
            </Col>
            <Col span={7}>
              <div
                style={{
                  textAlign: 'center',
                  border: 'none',
                  lineHeight: '32px'
                }}
                onClick={this.sendCode}
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
        </Card>
        <Row style={{
          textAlign: 'center',
          margin: '3vmin',
        }}>
          <Radio
            checked={true}
            style={{
              color: '#999'
            }}
          >我已阅读并同意<Link to="###">《购物协议》</Link></Radio>
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
            onClick={this.onClickCode}
            style={{
              borderRadius: 20,
              border: 'none',
              backgroundColor: 'rgb(245, 189, 128)'
            }}
          >
            下一步
        </Button>
        </Row>
      </>
    );
  }
}
