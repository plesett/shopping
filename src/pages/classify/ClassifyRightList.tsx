import React from 'react';
import styles from './styles.scss';
import { Flex } from 'antd-mobile';
import { Progress } from 'antd';
import { connect } from 'dva';
import { IClassifyRightListtProps, IClassifyRightListtState } from './type';
import QueueAnim from 'rc-queue-anim';
import Link from 'umi/link';
import PageAnimation from '@/comm/PageAnimation';

// 右边内容列表
class ClassifyRightList extends React.Component<IClassifyRightListtProps, IClassifyRightListtState> {

	state = {
		isText: false,
		pageCount: 5,
		pageClassifyCount: 10
	}

	componentDidMount() {
		const { dispatch, home } = this.props;
		// 判断是否第一次请求
		if (home.Home_list.length === 0) {
			dispatch({
				type: 'home/fetch_home',
				pageCount: 0
			})
		}
		return
	}

	addProduct = () => {
		const { pageCount } = this.state;
		const { dispatch } = this.props;
		this.setState({
			isText: true,
			pageCount: pageCount + 20
		}, () => {
			dispatch({
				type: 'home/fetch_home',
				pageCount: pageCount
			})
		})
		this.setState({ isText: false })
	}

	handleAddShopping = (value: { product_id: number }) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'shopping/take_product',
			value: value
		})
	}

	render() {
		const { isClassify, isUnfold } = this.props;
		const { Home_list } = this.props.home;
		const { classify_code_list } = this.props.classify;
		const { pageClassifyCount } = this.state;
		let data = [];
		// 数据初始化默认为全部数据
		data = Home_list
		// isClassify !== 20000 ? data = classify_code_list : data = Home_list;
		Boolean(classify_code_list[0]) ? data = classify_code_list.slice(0, pageClassifyCount) : data = Home_list;
		return (
			<PageAnimation>
				<div className={styles.ClassifyRightList}>
					{
						data.map((v: {
							product_id: number;
							status: number;
							upfile: string | undefined;
							title: React.ReactNode;
							price: React.ReactNode;
							yicanyu: number;
							zongcanyu: number;
						}, index: number) => {
							if (v.status === 0) {
								return (
									<div className={styles.ClassifyRightList_item} key={v.product_id}>
										<Link to={`/Particulars/${index}/${v.product_id}`} className={styles.ClassifyRightList_item_img}>
											<img src={v.upfile} alt="" />
										</Link>
										<Link to={`/Particulars/${index}/${v.product_id}`} className={styles.ClassifyRightList_item_info}>
											<p>{v.title}</p>
											<span>价值：¥{v.price}.00</span>
											<div className={styles.progress}>
												<Progress
													strokeColor="rgb(255,119,1)"
													percent={Math.round((v.yicanyu / v.zongcanyu) * 100)}
													status="active"
												/>
											</div>
											<Flex className={styles.HomeList_item_info}>
												<Flex.Item>
													<div style={{ color: "#f70" }}>{v.yicanyu}</div>
													<div>已参与</div>
												</Flex.Item>
												<Flex.Item>
													<div style={{ textAlign: 'center' }}>
														<div>{v.zongcanyu}</div>
														<div>总需参与</div>
													</div>
												</Flex.Item>
												<Flex.Item>
													<div style={{ textAlign: 'right' }}>
														<div style={{ color: "rgb(16,142,233)" }}>{(v.zongcanyu - v.yicanyu) < 0 ? 0 : v.zongcanyu - v.yicanyu}</div>
														<div>剩余</div>
													</div>
												</Flex.Item>
											</Flex>
										</Link>
										{
											isUnfold &&
											<QueueAnim delay={300} className="queue-simple">
												<Flex className={styles.classify_product_box} key="a">
													<Flex.Item>
														<div className={styles.classify_shop} onClick={() => this.handleAddShopping(v)}>
															<span>
																<svg viewBox="0 0 1024 1024" focusable="false" className="" data-icon="shopping-cart" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 00-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 100 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 00-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 00-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 00-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 01-31.6 31.6z"></path></svg>
															</span>
														</div>
													</Flex.Item>
												</Flex>
											</QueueAnim>
										}
									</div>
								)
							} else {
								return null;
							}
						})
					}
					{
						isClassify === 20000 ?
							<div
								style={{ backgroundColor: '#fff' }}
								className="addProduct"
								onClick={
									Boolean(classify_code_list[0])
										? () => this.setState({ pageClassifyCount: pageClassifyCount + 10 })
										: this.addProduct
								}
							>{this.state.isText ? '正在加载...' : '点击加载更多'}</div>
							:
							<div
								style={{ backgroundColor: '#fff' }}
								className="addProduct"
								onClick={() => this.setState({ pageClassifyCount: pageClassifyCount + 10 })}
							>暂无更多</div>
					}
				</div>
			</PageAnimation>
		)
	}
}

export default connect(({ home, classify }: any) => ({
	home,
	classify
}))(ClassifyRightList);