import React from 'react';
import { Row, Col, Card } from 'antd';
import style from './style.scss';
import Countdown from 'antd/lib/statistic/Countdown';
import { connect } from 'dva';
import router from 'umi/router';
import { Record_Product } from '@/service/api';
import dayjs from 'dayjs';
import Link from 'umi/link';

interface IRecordProps {
  dispatch: any
  user: {
    user_info: {
      uid: number;
    }
  }
}

class Record extends React.Component<IRecordProps> {

  state = {
    Menu: 0,
    pageData: [],
    all: []
  }
  componentDidMount() {
    const { user } = this.props;
    const { uid } = user.user_info;
    if (uid !== undefined) {
      Record_Product(uid)
        .then((v) => {
          console.log(v);
          switch (v.data.code) {
            case 200:
              this.setState({
                all: v.data.sn
              })
              break;

            default:
              router.push('/user/')
              break;
          }
        })
    } else {
      router.push('/user/')
    }
  }

  render() {
    const { all } = this.state;
    return (
      <div>
        <Row type='flex' justify='space-around' className={style.record}>
          <Col span={8} onClick={() => this.setState({ Menu: 0 })}>
            <span className={this.state.Menu === 0 ? style.action : ''}>全部</span>
          </Col>
          <Col span={8} onClick={() => this.setState({ Menu: 1 })}>
            <span className={this.state.Menu === 1 ? style.action : ''}>进行中</span>
          </Col>
          <Col span={8} onClick={() => this.setState({ Menu: 2 })}>
            <span className={this.state.Menu === 2 ? style.action : ''}>已揭晓</span>
          </Col>
        </Row>
        <Row>
          {
            all.length === 0 ?
              <Card style={{
                fontSize: 20,
                lineHeight: 5,
                textAlign: 'center'
              }}>暂无记录</Card>
              :
              <>
                {
                  this.state.Menu === 0 &&
                  <>
                    {
                      all.map((v: { upfile: string; product: string; nickname: string; mobile: string; create_time: string, state: number, product_id: number }, index) => {
                        return (
                          <Col style={{
                            borderBottom: '1px solid #eee'
                          }} key={index}>
                            <Link to={`/Particulars/${index}/${v.product_id}`}>
                              <Row>
                                <Col span={6}>
                                  <img className={style.item_img} src={v.upfile} alt="" />
                                </Col>
                                <Col span={18}>
                                  <div className={style.item_record_info}>
                                    <p>{v.product}</p>
                                    {
                                      v.state === 3 ? <>
                                        <p>获奖者: <span>{v.nickname}({v.mobile})</span></p>
                                        <p>开奖时间: <span>{dayjs(v.create_time).format("YYYY-MM-DD HH:mm")}</span></p>
                                        <img src={require('@/assets/winner0.png')} alt="" />
                                      </> :
                                        v.state === 0 ?
                                          <div>
                                            {/* <Countdown value={Date.now() + 1000 * 60} format="HH:mm:ss:SSS" valueStyle={{ color: '#fff', fontSize: 20 }} /> */}
                                            <div className={style.jiexiao}>点击查看揭晓进度</div>
                                          </div>
                                          :
                                          <>
                                            <p>获奖者: <span>{v.nickname}({v.mobile})</span></p>
                                            <p>开奖时间: <span>{dayjs(v.create_time).format("YYYY-MM-DD HH:mm")}</span></p>
                                            <img src={require('@/assets/winner2.png')} alt="" />
                                          </>
                                    }

                                  </div>
                                </Col>
                              </Row>
                            </Link>
                          </Col>
                        )
                      })
                    }

                  </>
                }
              </>
          }


          {
            this.state.Menu === 1 &&
            <>
              {
                all.map((v: { state: number; upfile: string; product: string; product_id: number }, index) => {
                  return (
                    <>
                      {
                        v.state === 0 &&
                        <Col style={{
                          borderBottom: '1px solid #eee'
                        }}>
                          <Link to={`/Particulars/${index}/${v.product_id}`}>
                            <Row>
                              <Col span={6}>
                                <img className={style.item_img} src={v.upfile} alt="" />
                              </Col>
                              <Col span={18}>
                                <div className={style.item_record_info}>
                                  <p>{v.product}</p>
                                  <div>
                                    <div className={style.jiexiao}>点击查看揭晓进度</div>
                                    {/* <Countdown value={Date.now() + 1000 * 60} format="HH:mm:ss:SSS" valueStyle={{ color: '#fff', fontSize: 20 }} /> */}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </Link>
                        </Col>
                      }
                    </>
                  )
                })
              }
            </>
          }

          {
            this.state.Menu === 2 &&
            <>
              {
                all.map((v: { upfile: string; product: string; nickname: string; mobile: string; create_time: string, state: number; product_id: number }, index) => {
                  return (
                    <>
                      {
                        v.state === 1 || v.state === 3 &&
                        <Col style={{
                          borderBottom: '1px solid #eee'
                        }}>
                          <Link to={`/Particulars/${index}/${v.product_id}`}>
                            <Row>
                              <Col span={6}>
                                <img className={style.item_img} src={v.upfile} alt="" />
                              </Col>
                              <Col span={18}>
                                <div className={style.item_record_info}>
                                  <p>{v.product}</p>
                                  <p>获奖者: <span>{v.nickname}({v.mobile})</span></p>
                                  <p>开奖时间: <span>{dayjs(v.create_time).format("YYYY-MM-DD HH:mm")}</span></p>
                                  <img src={require('@/assets/winner1.png')} alt="" />
                                </div>
                              </Col>
                            </Row>
                          </Link>
                        </Col>
                      }
                    </>
                  )
                })
              }
            </>
          }
        </Row>
      </div>
    );
  }
}

export default connect(({ user }: any) => ({
  user
}))(Record);