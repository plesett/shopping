import React from 'react';
import { BanenrText, Banner, HomeMenu } from './components';
import Commodity from './productInfo';
import { IHomeProps } from './type';
import { Button, notification } from 'antd';
import { connect } from 'dva';

class Home extends React.Component<IHomeProps> {

  state={
    hint: true
  }

  componentDidMount(){
    // 请求判断是否有全局通知
    const { global, dispatch } = this.props;
    if (global.ishint) {
      // 打开通知
      this.openNotification()
      // 关闭通知状态
      dispatch({
        type: "global/isHint"
      })
    }
  }

  openNotification = () => {
    const args = {
      message: '系统通知',
      description:
        '新平台上线注册即送 5000 大礼包，赶快注册吧！',
      duration: 0,
      style: {
        marginTop: 100,
      },
    };
    notification.open(args);
  };
  render() {
    return (
      <>
        <Banner />
        <HomeMenu />
        <BanenrText />
        <Commodity />
      </>
    )
  }
}

export default connect(({ global }:any) => ({
  global
}))(Home);