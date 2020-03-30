import React from 'react';
import { connect } from 'dva';
import { Icon, Progress, Button, Row, Col, Pagination, Spin } from 'antd';
import styles from './comonentsStyle.scss';
import Link from 'umi/link';
import { ICommodityProps } from './type';

// 主页 商品信息
class Commodity extends React.Component<ICommodityProps> {
	state = {
		isText: false,
		pageCount: 20,
		product_id: null
	}

	componentDidMount() {
		const { dispatch, home } = this.props;
		// 判断是否第一次请求
		if (home.Home_list.length === 0) {
			dispatch({
				type: "global/isNotice",
			})
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
		this.setState({ product_id: value.product_id }, () => {
			setTimeout(() => {
				this.setState({ product_id: null })
			}, 600);
		})
		dispatch({
			type: 'shopping/take_product',
			value: value
		})
	}

	render() {
		const { Home_list } = this.props.home;
		const { product_id } = this.state;
		if (Home_list.length !== 0) {
			return (
				<div className={styles.Commodity}>
					<span className={styles.Commodity_icon}></span>
					<Link to="" className={styles.Commodity_box}>
						<div className={styles.Commodity_lottery}>
							<img src="data:image/png;base64,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" alt="" />
						</div>
						<div className={styles.Commodity_text}>{this.props.text}</div>
						<div></div>
						<div></div>
					</Link>
					<Row>
						{
							Home_list.map((value: {
								id: string | number | undefined;
								upfile: string | undefined;
								text: string | undefined;
								title: React.ReactNode;
								price: React.ReactNode;
								yicanyu: number;
								zongcanyu: number;
								product_id: number;
							}, index: any) => {
								return (
									<Col xs={12} sm={12} md={8} key={value.id}>
										<div className={styles.CommodityMap_item}>
											<Link to={`/Particulars/${index}/${value.product_id}`} className={styles.CommodityMap_item_img}>
												<img src={value.upfile} alt={value.text} />
											</Link>
											<p className={styles.CommodityMap_item_info}>{value.title}</p>
											<p className={styles.CommodityMap_item_price}>价值：¥{value.price}</p>
											<div className={styles.van_progress}>
												<Progress
													strokeColor="rgb(255,119,1)"
													percent={Math.round((value.yicanyu / value.zongcanyu) * 100)}
													status="active"
												/>
											</div>
											<div className={styles.ShowButtom}>
												<div className={styles.ShowButtom_box}>
													<Link to={`/Particulars/${index}/${value.product_id}`}>
														<Button className={styles.ShowButtom_action}>立即云购</Button>
													</Link>
													<div className={styles.ShowButtom_action_icon} id={product_id === value.product_id ? styles.actionAdd : ''}>
														<Icon type="shopping-cart" onClick={() => this.handleAddShopping(value)} />
													</div>
												</div>
											</div>
										</div>
									</Col>
								)
							})
						}
					</Row>
					<div
						className={styles.addProduct}
						onClick={this.addProduct}
					>{this.state.isText ? '正在加载...' : '点击加载更多'}</div>
				</div>
			)
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

export default connect(({ home }: any) => ({
	home
}))(Commodity);