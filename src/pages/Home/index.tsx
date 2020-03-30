import React from 'react';
import { BanenrText, Banner, HomeMenu } from './components';
import Commodity from './productInfo';
import { IHomeProps } from './type';
import { Button, notification } from 'antd';
import { connect } from 'dva';
import { Get_Notice_info } from '@/service/api';

class Home extends React.Component<IHomeProps> {

  state = {
    hint: true
  }

  componentDidMount() {
    // 请求判断是否有全局通知
    const { global, user, dispatch } = this.props;
    const { uid, inform } = user.user_info;
    let systemclText = global.notice.length > 0 && global.notice[5].notice;
    if (inform === 0 && global.ishint && uid) {
      // 打开通知
      this.openNotification(systemclText)
      // 关闭通知状态
      dispatch({
        type: "global/isHint",
      })
    }
  }

  openNotification = (systemclText: string) => {
    console.log(systemclText)
    const args = {
      message: '系统通知',
      description:
        systemclText,
      duration: 0,
      style: {
        marginTop: 100,
      },
    };
    notification.open(args);
  };
  render() {
    const { global } = this.props;
    if (Boolean(global.notice)) {
      return (
        <>
          <Banner />
          <HomeMenu />
          <BanenrText
            text={global.notice.length > 0 && global.notice[0].notice}
          />
          <Commodity
            text={global.notice.length > 0 && global.notice[1].notice}
          />
        </>
      )
    } else {
      return null;
    }
  }
}

export default connect(({ global, user }: any) => ({
  global, user
}))(Home);