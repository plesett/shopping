import React from 'react';
import { Row, Col, Avatar, Button, message, Dropdown, Menu, Input } from 'antd';
import style from './style.scss';
import PageAnimation from '@/comm/PageAnimation';
import { Login_out, User_Info_Update } from '@/service/api';
import router from 'umi/router';
import { host } from '@/config/api';
import { connect } from 'dva';
import Link from 'umi/link';

interface IUserSetProps {
  dispatch: any
  user: {
    user_info: {
      username: string;
      mobile: number;
      upfile: string;
      balance: number;
      login_time: string;
      state: number;
      nickname: string;
      uid: number;
      sex: number;
    }
  }
}

class UserSet extends React.Component<IUserSetProps> {

  state = {
    visible: false,
    nickname: '',
    sex: 0
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // 检测本地是否存在token
    const token = localStorage.getItem("token");
    if (token !== null) {
      // 请求该用户数据
      dispatch({
        type: 'user/fetch_user_info',
        token: token
      });
      return
    }
    router.push('/login/')
  }

  LoginOut = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      message.info('请登录后操作', 2)
      router.push('/')
      return
    }
    Login_out(token)
      .then((v) => {
        if (v.data.code === 200) {
          message.success('注销成功', 2)
          // 清除本地缓存
          localStorage.clear();
          // 跳转
          router.push('/login/')
          return
        }
      })
  }

  handlenickName = () => {
    this.setState({
      visible: false,
      alertVisible: true
    });
  }

  onChangNickName = (e: any) => {
    this.setState({ nickname: e.target.value });
  }

  handleMenuClick = (e: { key: string; }) => {
    this.setState({ sex: e.key }, () => {
      this.setState({ visible: false })
    })
  };

  handleVisibleChange = (flag: any) => {
    this.setState({ visible: flag });
  };

  handleSubFrom = () => {
    const Sexdict: any = {
      "女": 0,
      "男": 1,
      0: 2
    }
    // 获取所有数据
    const { user } = this.props;
    const { uid } = user.user_info;
    const { nickname, sex } = this.state;
    // 发送请求
    User_Info_Update(
      nickname ? nickname : user.user_info.nickname,
      Sexdict[sex],
      uid
    ).then((v) => {
      if (v.data.code === 0) {
        message.success(v.data.msg, 2)
        router.push('/user/')
        return
      }
    })
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick} style={{ width: '95vw', textAlign: 'center' }}>
        <Menu.Item key="男">男</Menu.Item>
        <Menu.Item key="女">女</Menu.Item>
      </Menu>
    );
    const { user } = this.props;
    const { username, nickname, sex, upfile } = user.user_info;
    return (
      <PageAnimation>
        <div className={style.setBox}>
          <Row>
            <Col span={24} className={style.set_box}>
              <Row type='flex' justify='space-between'>
                <div style={{ lineHeight: '40px' }}>头像</div>
                <div>
                  <Avatar src={`${host}${upfile}`} style={{ verticalAlign: 'middle' }} size="large" />
                </div>
              </Row>
            </Col>
            <Col span={24} className={style.set_box} onClick={this.handlenickName}>
              <Row type='flex' justify='space-between' style={{
                alignItems: 'center'
              }}
              >
                <Col span={3}>昵称</Col>
                <Col span={15}>
                  <Row type='flex' justify='end' style={{
                    alignItems: 'center'
                  }}>
                    <Col>
                      <Input
                        maxLength={6}
                        placeholder={nickname}
                        value={this.state.nickname}
                        onChange={this.onChangNickName}
                        className={style.nickName}
                      />
                    </Col>
                    <Col>
                      <img
                        src={require('@/assets/htb－Arrow right02.svg')}
                        alt=""
                        style={{
                          width: 10,
                          marginLeft: '2vmin'
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24} className={style.set_box} onClick={this.handleVisibleChange}>
              <Row type='flex' justify='space-between'>
                <div>性别</div>
                <div>
                  <Dropdown
                    overlay={menu}
                    visible={this.state.visible}
                  >
                    <span className="ant-dropdown-link">
                      {this.state.sex ? this.state.sex : sex === 0 ? '女' : sex === 1 ? '男' : '保密中'}
                    </span>
                  </Dropdown>
                  <img
                    src={require('@/assets/htb－Arrow right02.svg')}
                    alt=""
                    style={{
                      width: 10,
                      marginLeft: '2vmin'
                    }}
                  />
                </div>
              </Row>
            </Col>
            <Col span={24} className={style.set_box}>
              <Row type='flex' justify='space-between'>
                <div>我的等级</div>
                <div>
                  {username ? username : '加载中...'}
                  <img
                    src={require('@/assets/htb－Arrow right02.svg')}
                    alt=""
                    style={{
                      width: 10,
                      marginLeft: '2vmin'
                    }}
                  />
                </div>
              </Row>
            </Col>
          </Row>
          <Row style={{
            borderTop: '1vmin solid rgb(245,245,245)'
          }}>
            <Link to="/affirm/">
              <Col span={24} className={style.set_box}>
                <Row type='flex' justify='space-between'>
                  <div>安全设置</div>
                  <div>
                    <img
                      src={require('@/assets/htb－Arrow right02.svg')}
                      alt=""
                      style={{
                        width: 10,
                        marginLeft: '2vmin'
                      }}
                    />
                  </div>
                </Row>
              </Col>
            </Link>
          </Row>
          <Row style={{
            padding: '0 4vmin'
          }}>
            <Col span={24}>
              <Button
                block
                size='large'
                disabled={this.state.nickname === '' && this.state.sex === 0 ? true : false}
                style={{
                  borderRadius: '20px',
                  margin: '3vmin 0',
                }}
                className={this.state.nickname === '' && this.state.sex === 0 ? '' : style.ButtonSet}
                onClick={this.handleSubFrom}
              >确认</Button>
            </Col>
            <Col span={24}>
              <Button
                block
                size='large'
                className={style.ButtonSet}
                onClick={this.LoginOut}
              >退出</Button>
            </Col>
          </Row>
        </div>
      </PageAnimation>
    );
  }
}


export default connect(({ user }: any) => ({
  user
}))(UserSet);