import React from 'react';
import { Input, Card, Col, Row, Form, Button, message } from 'antd';
import { connect } from 'dva';
import { User_Update_Pass } from '@/service/api';
import router from 'umi/router';

interface IAffirmProps {
  dispatch: any
  user: {
    user_info: {
      uid: number;
    }
  }
}

class Affirm extends React.Component<IAffirmProps> {

  state = {
    InputPassOne: '',
    InputPassTow: '',
    InputPassThree: ''
  }

  handleSubFormPass = () => {
    // 获取参数
    const { user } = this.props;
    const { uid } = user.user_info;
    const {
      InputPassOne,
      InputPassTow,
      InputPassThree
    } = this.state;
    if (InputPassTow === InputPassThree && InputPassOne !== '' && InputPassTow !== '' ) {
      // 请求验证
      User_Update_Pass(
        uid,
        InputPassOne,
        InputPassThree
      ).then((v) => {
        switch (v.data.code) {
          case 200:
            message.success(v.data.msg, 2);
            // 清除本地所有缓存
            localStorage.clear();
            // 跳转登录
            router.push('/login/');
            break;
          case 405:
            message.error('原密码错误', 2);
            this.setState({ InputPassOne: '' });
            break;

          default:
            break;
        }
      })
      return
    }
    message.info("两次密码输入不一致请重新输入")
    this.setState({
      InputPassTow: '',
      InputPassThree: ''
    })
  }

  render() {
    const {
      InputPassOne,
      InputPassTow,
      InputPassThree
    } = this.state;
    return (
      <div>
        <Row
          style={{
            margin: '4vmin',
            paddingBottom: '2vmin',
            borderBottom: '1px solid #eee'
          }}
        >
          <Col span={6}>
            <div
              style={{
                textAlign: 'left',
                lineHeight: '31px',
                fontSize: 17
              }}
            >当前密码</div>
          </Col>
          <Col span={15}>
            <Input
              style={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
              type='password'
              value={InputPassOne}
              maxLength={11}
              placeholder="请输入原密码"
              onChange={(e) => this.setState({ InputPassOne: e.target.value })}
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
          <Col span={6}>
            <div
              style={{
                textAlign: 'left',
                lineHeight: '31px',
                fontSize: 17
              }}
            >新密码</div>
          </Col>
          <Col span={15}>
            <Input
              style={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
              type='password'
              value={InputPassTow}
              maxLength={11}
              placeholder="请输入新密码"
              onChange={(e) => this.setState({ InputPassTow: e.target.value })}
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
          <Col span={6}>
            <div
              style={{
                textAlign: 'left',
                lineHeight: '31px',
                fontSize: 17
              }}
            >确认新密码</div>
          </Col>
          <Col span={15}>
            <Input
              style={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
              type='password'
              value={InputPassThree}
              maxLength={11}
              placeholder="请输入确认新密码"
              onChange={(e) => this.setState({ InputPassThree: e.target.value })}
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
            onClick={this.handleSubFormPass}
          >
            保存
        </Button>
        </Row>
      </div>
    );
  }
}


export default connect(({ user }: any) => ({
  user
}))(Affirm);