import PageAnimation from '@/comm/PageAnimation';
import { host } from '@/config/api';
import { Spin } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import { connect } from 'dva';
import React from 'react';
import Link from 'umi/link';
import styles from './style.scss';

interface ILotteryMapProps {
  dispatch: any,
  lottery: {
    winner_forget_list: {
      map: any
    }
    winner_list: any
  }
  global: any
}

interface ILotteryMapState {
  isText: boolean,
  pageCount: number,
  isCountDown: boolean
}

class LotteryMap extends React.Component<ILotteryMapProps, ILotteryMapState> {


  constructor(props: any) {
    super(props)
    this.state = {
      isText: false,
      pageCount: 5,
      isCountDown: false
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'lottery/fetch_forget_lottery',
      pageCount: 0
    })
    if (!this.state.isCountDown) {
      dispatch({
        type: 'lottery/fetch_lottery',
      })
    } else {
      this.setState({ isCountDown: true })
    }
  }
  
  addProduct = () => {
    const { pageCount } = this.state;
    const { dispatch } = this.props;
    this.setState({
      isText: true,
      pageCount: pageCount + 5
    }, () => {
      dispatch({
        type: 'lottery/fetch_forget_lottery',
        pageCount: pageCount
      })
    })
    this.setState({ isText: false })
  }

  render() {
    const { winner_forget_list, winner_list } = this.props.lottery
    const { hour, minute, second } = this.props.global;
    const { isCountDown } = this.state;
    if (Boolean(winner_list[0])) {
      return (
        <PageAnimation>
          <div>
            {/* 即将开奖 */}
            {
              winner_list.map((v: {
                upfile: string | undefined;
                mobile: string | undefined;
                yun_code: React.ReactNode;
                username: React.ReactNode;
                title: React.ReactNode;
                gonumber: React.ReactNode;
                good_code: React.ReactNode;
                end_time: React.ReactNode;
                winner_end_time: number;
              }, index: string | number | undefined) => {
                return (
                  <div className={styles.Lottery} key={index}>
                    <Link to="###" className={styles.Lottery_box}>
                      <div className={styles.Lottery_box_item_left}>
                        <img src={v.upfile} alt="" />
                        <span>第{v.yun_code}云</span>
                      </div>
                      <div>
                        <div className={styles.Lottery_box_item_right}>
                          {
                            isCountDown ?
                              <>
                                <div className={styles.hd}>
                                  <img src={`${host}/public/default_yg.png`} alt="" />
                                </div>
                                <div className={styles.bd}>
                                  <p>
                                    <em style={{ color: 'rgb(35, 170, 255)' }}>{v.username ? v.username : v.mobile}</em>
                                  </p>
                                  <p>
                                    <em>{v.gonumber}</em>
                                    人次获得
                                </p>
                                </div>
                              </>
                              :
                              <p style={{ color: '#000', fontSize: '3.333vmin' }}>{v.title}</p>
                          }
                        </div>
                        {
                          isCountDown
                            ?
                            <div className={styles.Lottery_box_item_right}>
                              <div className={styles.bd}>
                                <p>幸运云购码:{v.good_code}</p>
                                <p>
                                  揭晓时间:
                              <em>{v.end_time}</em>
                                </p>
                              </div>
                            </div>
                            :
                            <div className={styles.Lottery_publish_time}>
                              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABUCAYAAAAlDKGaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYzODhGQzlFMTg4RjExRTk4RkNGOTEyNTJBNTkyQjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYzODhGQzlGMTg4RjExRTk4RkNGOTEyNTJBNTkyQjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjM4OEZDOUMxODhGMTFFOThGQ0Y5MTI1MkE1OTJCMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjM4OEZDOUQxODhGMTFFOThGQ0Y5MTI1MkE1OTJCMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4I82WQAAAIPElEQVR42uxc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" alt="" />
                              <span>揭晓时间</span>
                              <Countdown
                                value={v.winner_end_time}
                                format="HH:mm:ss:SSS"
                                onFinish={() => this.setState({ isCountDown: true })}
                                valueStyle={{
                                  display: 'inline-block',
                                  color: '#fff',
                                  fontSize: 18
                                }}
                              />
                            </div>
                        }
                      </div>
                    </Link>
                  </div>
                )
              })
            }
            {/* 历史记录 */}
            {
              winner_forget_list.map((v: {
                good_code: number;
                mobile: string | undefined;
                upfile: string | undefined;
                username: React.ReactNode;
                gonumber: React.ReactNode;
                yun_code: React.ReactNode;
                end_time: React.ReactNode;
              }, index: string | number | undefined) => {
                return (
                  <div className={styles.Lottery} key={index}>
                    <Link to="###" className={styles.Lottery_box}>
                      <div className={styles.Lottery_box_item_left}>
                        <img src={v.upfile} alt="" />
                        <span>第{v.yun_code}云</span>
                      </div>
                      <div>
                        <div className={styles.Lottery_box_item_right}>
                          <div className={styles.hd}>
                            <img src={`${host}/public/default_yg.png`} alt="" />
                          </div>
                          <div className={styles.bd}>
                            <p>
                              <em style={{ color: 'rgb(35, 170, 255)' }}>{v.username ? v.username : v.mobile}</em>
                            </p>
                            <p>
                              <em>{v.gonumber}</em>
                              人次获得
                        </p>
                          </div>
                        </div>
                        <div className={styles.Lottery_box_item_right}>
                          <div className={styles.bd}>
                            <p>幸运云购码:{v.good_code}</p>
                            <p>
                              揭晓时间:
                            <em>{v.end_time}</em>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
            <div
              className={styles.addProduct}
              onClick={this.addProduct}
            >{this.state.isText ? '正在加载...' : '点击加载更多'}</div>
          </div>
        </PageAnimation>
      );
    } else {
      return (
        <div className={styles.spinLoading}>
          <Spin
            size='large'
            tip='加载中....'
          />
        </div>
      )
    }
  }
}

export default connect(({ lottery, global }: any) => ({
  lottery,
  global
}))(LotteryMap);