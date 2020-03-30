import React from 'react';
import styles from './style.scss';
import { Icon, Progress, Spin, message, Modal } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import { host } from '@/config/api';
import ShoppingItem from '../shopping/item';
import dayjs from 'dayjs';

interface IParticularsProps {
  match: any;
  particulars: {
    isLoading: boolean;
    particulars_info: {
      info: {
        product_id: number;
        title: string;
        upfile: string;
        price: number;
        zongcanyu: number;
        yicanyu: number;
      }
      winners: any
    }
  };
  dispatch: any;
  shopping: {
    shopping: Array<any>
  }
}
interface IParticularsState {
  isCommentMenu: Boolean;
  visible: Boolean;
}

class Particulars extends React.Component<IParticularsProps, IParticularsState> {

  state = {
    isCommentMenu: false,
    visible: false
  }

  componentDidMount() {
    // 定位最上方
    this.scrollToAnchor('top')
    // 获取路由参数
    const { id } = this.props.match.params;
    // dispatch
    const { dispatch } = this.props;
    dispatch({
      type: 'particulars/fetch_particulars_info',
      product_id: id
    })
  }

  scrollToAnchor = (anchorName: string) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) { anchorElement.scrollIntoView(); }
    }
  }

  AddShopping = () => {
    const { particulars, dispatch } = this.props;
    const { info } = particulars.particulars_info;
    dispatch({
      type: 'shopping/take_product',
      value: info
    })
    message.success('已成功加入购物车', 1)
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = (e: any) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e: any) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { particulars } = this.props;
    const { isCommentMenu } = this.state;
    const count = this.props.shopping.shopping.length;
    if (!particulars.isLoading) {
      const { title, upfile, price, zongcanyu, yicanyu } = particulars.particulars_info.info;
      const { winners } = particulars.particulars_info;
      return (
        <div id='top'>
          <div className={styles.ParticularsWarp_img}>
            <img src={upfile} alt={upfile} />
          </div>
          <div className={styles.ParticularsWarp_info}>
            <p className={styles.ParticularsWarp_Title}>{title}</p>
            <p className={styles.ParticularsWarp_pirce}>价值：¥{price}.00</p>
            <Progress strokeColor="rgb(255,119,1)" percent={Math.round((yicanyu / zongcanyu) * 100)} />
            <div className={styles.statistics}>
              <div>
                <p style={{ color: '#e93323' }}>{yicanyu ? yicanyu : 0}</p>
                <p className={styles.text_2}>已参与</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p className={styles.text_2}>{zongcanyu}</p>
                <p className={styles.text_2}>共需人次</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#2af' }}>{zongcanyu - yicanyu > 0 ? zongcanyu - yicanyu : 0}</p>
                <p className={styles.text_2}>剩余</p>
              </div>
            </div>
            <div className={styles.tips}>您还未登录哦，请登录后查看吧！</div>
          </div>
          <div className={styles.backdrop}></div>
          <Link to="" className={styles.aide}>
            <div>云购助手</div>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAYAAAC+aNwHAAAAAXNSR0IArs4c6QAAAPpJREFUOBGdlTEOwjAMRRvIgMTKwMLCATgDFT0AKydk5QBBZeEkLAyslRiqlv+jZihtGruWnDit/2stWU6WdVaW5YoeztJ9wUTn3KGu6w8dcSEVM88D2rY9IV7TEd80EA+w1l4hfsFpKogH5Hn+NsYcIVZDDD8ZDL++RwkPnHfdswrgc1EULuT87z0AX2ohA4AWMgrQQKIAKWQSIIEkASmICBCDoAE3vpGYMNdEgFhvoIO/yRJi4tCdk4CUmGVHARJxFCAVjwI04gFAK+4B5ogJWHLBNN42TfNEKB4k1NF8I2EaXxCrxQRYLhhbd4yyqosnRxhzRm3uxfIDs1zUVQ0ScPkAAAAASUVORK5CYII=" alt="" />
          </Link>
          <div className={styles.backdrop}></div>
          <Link to="" className={styles.aide}>
            <div>图文详情 <span>建议WIFI下浏览哦</span></div>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAYAAAC+aNwHAAAAAXNSR0IArs4c6QAAAPpJREFUOBGdlTEOwjAMRRvIgMTKwMLCATgDFT0AKydk5QBBZeEkLAyslRiqlv+jZihtGruWnDit/2stWU6WdVaW5YoeztJ9wUTn3KGu6w8dcSEVM88D2rY9IV7TEd80EA+w1l4hfsFpKogH5Hn+NsYcIVZDDD8ZDL++RwkPnHfdswrgc1EULuT87z0AX2ohA4AWMgrQQKIAKWQSIIEkASmICBCDoAE3vpGYMNdEgFhvoIO/yRJi4tCdk4CUmGVHARJxFCAVjwI04gFAK+4B5ogJWHLBNN42TfNEKB4k1NF8I2EaXxCrxQRYLhhbd4yyqosnRxhzRm3uxfIDs1zUVQ0ScPkAAAAASUVORK5CYII=" alt="" />
          </Link>
          <div className={styles.backdrop}></div>
          <div className={styles.joinNav}>
            <p>
              <span className={!isCommentMenu && styles.action} onClick={() => this.setState({ isCommentMenu: !isCommentMenu })}>参与记录</span>
            </p>
            <p>
              <span className={isCommentMenu && styles.action} onClick={() => this.setState({ isCommentMenu: !isCommentMenu })}>历史获得者</span>
            </p>
          </div>
          <div className={styles.Comment}>
            {
              !isCommentMenu ?
                <div className={styles.Comment_item}>
                  {
                    winners.map((v: {
                      mobile: string;
                      username: React.ReactNode;
                      winner_end_time: number;
                      gonumber: React.ReactNode;
                    }) => {
                      return (
                        <div className={styles.Comment_item_main} key={v.mobile}>
                          <div className={styles.Comment_img}>
                            <img src={`${host}/public/default_yg.png`} alt="" />
                          </div>
                          <div className={styles.Comment_info}>
                            <p style={{ color: '#333' }}>{v.username ? v.username : v.mobile}</p>
                            <p style={{ color: '#999' }}>{dayjs(Number(v.winner_end_time)).format('YYYY-MM-DD HH:mm')}</p>
                          </div>
                          <div className={styles.Comment_count}>
                            <span style={{ color: '#f70' }}>{v.gonumber}</span>
                            人次
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAYAAAC+aNwHAAAAAXNSR0IArs4c6QAAAPpJREFUOBGdlTEOwjAMRRvIgMTKwMLCATgDFT0AKydk5QBBZeEkLAyslRiqlv+jZihtGruWnDit/2stWU6WdVaW5YoeztJ9wUTn3KGu6w8dcSEVM88D2rY9IV7TEd80EA+w1l4hfsFpKogH5Hn+NsYcIVZDDD8ZDL++RwkPnHfdswrgc1EULuT87z0AX2ohA4AWMgrQQKIAKWQSIIEkASmICBCDoAE3vpGYMNdEgFhvoIO/yRJi4tCdk4CUmGVHARJxFCAVjwI04gFAK+4B5ogJWHLBNN42TfNEKB4k1NF8I2EaXxCrxQRYLhhbd4yyqosnRxhzRm3uxfIDs1zUVQ0ScPkAAAAASUVORK5CYII=" alt="" />
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                :
                <div className={styles.hint}>管理员已禁止</div>
            }
          </div>
          <div className={styles.Shopping}>
            <div className={styles.Shopping_Button}>
              <div onClick={this.showModal}>立即云购</div>
              <div style={{ backgroundColor: '#f70' }} onClick={this.AddShopping}>加入购物车</div>
            </div>
            <Link to="/shopping/" className={styles.Shopping_shopping}>
              <span>{count !== 0 && count}</span>
              <Icon type="shopping-cart" />
            </Link>
          </div>
          <div style={{ height: 44 }}></div>
          <Modal
            title="立即云购"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="确认支付"
            style={{
              padding: 0
            }}
          >
            <ShoppingItem
              value={particulars.particulars_info.info}
              particulars={true}
            />
          </Modal>
        </div>
      );
    } else {
      return (
        <div className="spinLoading">
          <Spin
            size='large'
            tip='加载中....'
          />
        </div>
      )
    }
  }
}


export default connect(({ particulars, shopping }: any) => ({
  particulars,
  shopping
}))(Particulars);