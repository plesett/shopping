import React from 'react';
import style from './style.scss';
import { Row, Col, message } from 'antd';
import { connect } from 'dva';

interface IShoppingProps {
	shopping: {
		shopping: {

		}
	}
	dispatch: any;
	handleonClickRm: Function;
	particulars?: boolean;
	value: {
		title: string;
		upfile: string;
		price: number;
		zongcanyu: number;
		yicanyu: number;
		product_id: number;
		countValue: number;
	}
}

class ShoppingItem extends React.Component<IShoppingProps> {

	state = {
		count: 1
	}

	handleCountValue = (id: number, count: number) => {
		const { dispatch } = this.props;
		dispatch({
			type: 'shopping/update_product',
			count: count,
			product_id: id
		})
	}

	render() {
		const { count } = this.state;
		const { particulars, value } = this.props;
		const { product_id, title, upfile, price, zongcanyu, yicanyu, countValue } = value;
		return (
			<div>
				<Row className={style.Shoping}>
					<Col span={6} className={style.Shoping_img}>
						<img src={upfile} alt="" />
					</Col>
					<Col span={18} className={style.Shoping_info}>
						<p className={style.Shoping_info_title}>{title}</p>
						<p className={style.Shoping_info_surplus}>剩余<span>{zongcanyu - yicanyu - countValue < 0 ? 0 : zongcanyu - yicanyu - countValue}</span> 人次</p>
						<div className={style.Shoping_info_count}>
							<span onClick={() => this.handleCountValue(product_id, countValue < 1 ? 0 : countValue - 1)}>-</span>
							<div>
								<input type="text" value={countValue} onChange={(e) => this.handleCountValue(product_id, Number(e.target.value) <= zongcanyu ? yicanyu === zongcanyu ? 0 : Number(e.target.value) : count)} />
							</div>
							<span onClick={() => this.handleCountValue(product_id, countValue === zongcanyu ? zongcanyu : zongcanyu === yicanyu ? 0 : countValue + 1)}>+</span>
						</div>
						<div
							style={{
								display: 'flex',
								alignItems: 'center'
							}}
						>
							<span className={style.manTime}>人次</span>
							<div className={style.all} onClick={() => this.handleCountValue(product_id, zongcanyu === yicanyu ? 0 : zongcanyu)}>全包</div>
							{
								!particulars &&
								<img src={require('@/assets/lajitong.svg')} alt="" style={{
									width: '6vmin',
									marginLeft: '4vmin'
								}}
									onClick={() => this.props.handleonClickRm(product_id)}
								/>
							}
						</div>
						{
							!particulars &&
							<Row type='flex' justify='space-around' className={style.Shoping_info_number}>
								<Col span={4} onClick={() => this.handleCountValue(product_id, zongcanyu === yicanyu ? 0 : 10)}>10</Col>
								<Col span={4} onClick={() => this.handleCountValue(product_id, zongcanyu === yicanyu ? 0 : 50)}>50</Col>
								<Col span={4} onClick={() => this.handleCountValue(product_id, zongcanyu === yicanyu ? 0 : 100)}>100</Col>
								<Col span={4} onClick={() => this.handleCountValue(product_id, zongcanyu === yicanyu ? 0 : zongcanyu / 2)}>1/2</Col>
								<Col span={4} onClick={() => this.handleCountValue(product_id, zongcanyu === yicanyu ? 0 : zongcanyu / 4)}>1/4</Col>
							</Row>
						}
						{
							particulars &&
							<div style={{ margin: '2vmin 0' }}>金额: ¥{countValue}</div>
						}
					</Col>
				</Row>
			</div>
		);
	}
}

export default connect(({ shopping }: any) => ({
	shopping
}))(ShoppingItem);